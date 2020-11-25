import MockAdapter from 'axios-mock-adapter'
import Binance from '../src/client/binance'

describe('Token Price', () => {
  it('returns token price if pair available', async () => {
    const binance = new Binance('baseUrl', 'apiKey', 'apisecret')
    const mock = new MockAdapter(binance.client)
    const symbol = 'ETH'
    const response = { symbol: `${symbol}USDT`, price: '500.02' }
    mock.onGet(`api/v3/ticker/price?symbol=${symbol}USDT`).replyOnce(200, response)

    const result = await binance.getPrice(symbol)

    expect(result.symbol).toBeDefined()
    expect(result.price).toBeDefined()
  })

  it('returns error if pair unavailable', async () => {
    const binance = new Binance('baseUrl', 'apiKey', 'apisecret')
    const mock = new MockAdapter(binance.client)
    const symbol = 'ABCD'
    const response = { msg: 'Invalid symbol' }
    mock.onGet(`api/v3/ticker/price?symbol=${symbol}USDT`).replyOnce(400, response)

    await expect(async () => {
      await binance.getPrice('ABCD')
    }).rejects.toThrow(new Error('Invalid symbol'))
  })
})
