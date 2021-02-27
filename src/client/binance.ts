import { AxiosInstance, AxiosResponse } from "axios"
import querystring, { ParsedUrlQueryInput } from "querystring"
import createSig from "../utils/signature"
import Withdrawal from "../interfaces/withdrawal"
import {
  TokenPriceResponse,
  WithdrawableTokenResponse,
} from "../interfaces/response"
import initAxios from "./http"
import BinanceError from "../error"

function filteredNetwork(network: any): boolean {
  return ["ERC20", "BTC", "BEP20", "BEP2"].includes(network.name)
}

function filteredMinimumWithdrawable(token: any): boolean {
  const network = token.networkList.find(filteredNetwork)
  const free = Number(token.free)
  const withdrawMin = Number(network.withdrawMin)
  return free > withdrawMin && free > 0
}

export default class Binance {
  private apiSecret: string

  client: AxiosInstance

  constructor(baseURL: string, apiKey: string, apiSecret: string) {
    this.apiSecret = apiSecret
    this.client = initAxios(baseURL, {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-MBX-APIKEY": apiKey,
    })
  }

  async withdraw(request: Withdrawal): Promise<AxiosResponse> {
    return this.client
      .post("/wapi/v3/withdraw.html", this.createQueryString(request))
      .then((resp) => resp.data)
      .catch(BinanceError.reThrow)
  }

  /**
   * Get all withdrawable tokens
   */
  async getWithdrawableTokens(): Promise<WithdrawableTokenResponse> {
    return this.client
      .get(`sapi/v1/capital/config/getall?${this.createQueryString()}`)
      .then((resp) => resp.data)
      .then((tokens) =>
        tokens.filter((token: any) => token.networkList.find(filteredNetwork))
      )
      .then((tokens) => tokens.filter(filteredMinimumWithdrawable))
      .catch(BinanceError.reThrow)
  }

  /**
   * Get token price against USDT
   * @param symbol A token symbol e.g. BTC, ETH
   */
  async getPrice(symbol: string): Promise<TokenPriceResponse> {
    return this.client
      .get(`api/v3/ticker/price?symbol=${symbol}USDT`)
      .then((resp) => resp.data)
      .catch(BinanceError.reThrow)
  }

  private createQueryString(request: ParsedUrlQueryInput = {}): string {
    const timestamp = new Date().getTime()
    const qs = querystring.stringify({ ...request, timestamp })
    const signature = createSig(this.apiSecret, qs)
    return `${qs}&signature=${signature}`
  }
}
