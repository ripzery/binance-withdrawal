export type TokenPriceResponse = {
  symbol: string,
  price: string
}

type NetworkList = {
  coin: string,
  name: string,
  withdrawFee: string,
  withdrawMin: string,
  network: string,
  withdrawEnable: boolean,
  isDefault: string
}

export type WithdrawableTokenResponse = {
  coin: string,
  free: string,
  freeze: string,
  locked: string,
  name: string,
  withdrawing: string,
  trading: string,
  networkList: [NetworkList]
}
