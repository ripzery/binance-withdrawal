import { AxiosResponse } from 'axios'
import getFinalQueryString from './utils'
import initAxios from '../src/client/http'
import Binance from '../src/client/binance'
import Withdrawal from '../src/request/withdrawal'

jest.mock('../src/client/http')

describe('Binance', () => {
  let mockAxios: {create: jest.Mock, post: jest.Mock}
  let mockDate: Date

  beforeAll(() => {
    mockDate = new Date()
    spyOn(global, 'Date').and.callFake(() => mockDate)

    const response: AxiosResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    }

    mockAxios = {
      create: jest.fn().mockReturnThis(),
      post: jest.fn(() => Promise.resolve(response)),
    };

    (initAxios as jest.Mock).mockImplementationOnce(() => mockAxios)
  })

  it('should withdraw with correct querystring and header', async () => {
    const req: Withdrawal = {
      asset: '0x0',
      address: '0x1',
      amount: 1,
    }

    const binance = new Binance('http://localhost', 'apiKey', 'apiSecret')
    await binance.withdraw(req)

    const expectedQueryString = getFinalQueryString(req, mockDate, 'apiSecret')

    expect(initAxios as jest.Mock).toHaveBeenCalledWith('http://localhost', {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-MBX-APIKEY': 'apiKey',
    })
    expect(mockAxios.post).toHaveBeenCalledWith('/wapi/v3/withdraw.html', expectedQueryString)
  })
})
