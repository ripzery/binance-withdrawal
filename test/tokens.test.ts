import MockAdapter from 'axios-mock-adapter'
import Binance from '../src/client/binance'

describe('Wallet Tokens', () => {
  it('returns tokens that have more than withdrawMin', async () => {
    const response = [
      { coin: 'UNI', free: '1', networkList: [{ withdrawMin: '2', name: 'ERC20' }] },
      { coin: 'OMG', free: '2', networkList: [{ withdrawMin: '2', name: 'ERC20' }] },
      { coin: 'ETH', free: '3', networkList: [{ withdrawMin: '2', name: 'ERC20' }] },
    ]
    const binance = new Binance('baseURL', 'apiKey', 'apiSecret')
    const mock = new MockAdapter(binance.client)
    mock.onAny().reply(200, response)
    const withdrawableTokens = await binance.getWithdrawableTokens()
    expect(withdrawableTokens).toStrictEqual(response.slice(1))
  })

  it('returns tokens that withdrawable on ERC20 or BTC', async () => {
    const response = [
      { coin: 'UNI', free: '3', networkList: [{ withdrawMin: '1', name: 'UNKNOWN' }] },
      { coin: 'OMG', free: '2', networkList: [{ withdrawMin: '1', name: 'ERC20' }] },
      { coin: 'ETH', free: '3', networkList: [{ withdrawMin: '1', name: 'BTC' }] },
    ]
    const binance = new Binance('baseURL', 'apiKey', 'apiSecret')
    const mock = new MockAdapter(binance.client)
    mock.onAny().reply(200, response)
    const withdrawableTokens = await binance.getWithdrawableTokens()
    expect(withdrawableTokens).toStrictEqual(response.slice(1))
  })

  it('returns error message from binance if error code is 400', async () => {
    const binance = new Binance('baseURL', 'apiKey', 'apiSecret')
    const mock = new MockAdapter(binance.client)
    mock.onAny().reply(400, { msg: 'Random Binance error' })
    return binance.getWithdrawableTokens().catch((error) => {
      expect(error.name).toBe('BinanceError')
      expect(error.message).toBe('Random Binance error')
    })
  })
})
