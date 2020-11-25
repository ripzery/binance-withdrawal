import { AxiosError } from 'axios'

export default class BinanceError extends Error {
  constructor(error: AxiosError) {
    if (error.response) {
      // Binance error message exist
      if (error.response.status === 400) {
        super(error.response.data.msg)
      } else {
        super(error.message)
      }
    } else {
      super(error.message)
    }
    this.name = 'BinanceError'
  }
}
