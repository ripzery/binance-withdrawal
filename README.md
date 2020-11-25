# Binance Withdrawal

A simple library that let you manage funds in Binance easily.

Features:
- Retrieves tokens in your account.
- Withdraw tokens from your account to non-custodial wallet.

## Installation

```
npm install binance-withdrawal
```

## Prerequisite

1. Create `apiKey` and `apiSecret` [here](https://www.binance.com/en/usercenter/settings/api-management)

2. Copy `apiKey` and `apiSecret` to secure place.

3. Check on `Enable Withdrawal` box.

4. Change IP access restriction to `Restrict access to trusted IPs only (Recommended)`

5. Enter your client IP address. (Recommend the client to use personal hosted VPN to make sure the ip address will always be the same.)

> Note you cannot use this library on the device that doesn't have IP address on the list.

## Usage

Get all withdrawable tokens in your account

```js
const binance = new Binance('https://api.binance.com', 'YOUR_API_KEY', 'YOUR_API_SECRET')

const tokens = await binance.getWithdrawableTokens()
```

Example output:
<details>
  <summary>Tokens</summary>

```json
[
    {
        "coin": "BTC",
        "depositAllEnable": true,
        "free": "0.08074558",
        "freeze": "0.00000000",
        "ipoable": "0.00000000",
        "ipoing": "0.00000000",
        "isLegalMoney": false,
        "locked": "0.00000000",
        "name": "Bitcoin",
        "networkList": [
            {
                "addressRegex": "^(bnb1)[0-9a-z]{38}$",
                "coin": "BTC",
                "depositDesc": "Wallet Maintenance, Deposit Suspended", // shown only when "depositEnable" is false.
                "depositEnable": false,
                "isDefault": false,
                "memoRegex": "^[0-9A-Za-z\\-_]{1,120}$",
                "minConfirm": 1,  // min number for balance confirmation
                "name": "BEP2",
                "network": "BNB",
                "resetAddressStatus": false,
                "specialTips": "Both a MEMO and an Address are required to successfully deposit your BEP2-BTCB tokens to Binance.",
                "unLockConfirm": 0,  // confirmation number for balance unlcok
                "withdrawDesc": "Wallet Maintenance, Withdrawal Suspended", // shown only when "withdrawEnable" is false.
                "withdrawEnable": false,
                "withdrawFee": "0.00000220",
                "withdrawMin": "0.00000440"
            },
            {
                "addressRegex": "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^(bc1)[0-9A-Za-z]{39,59}$",
                "coin": "BTC",
                "depositEnable": true,
                "insertTime": 1563532929000,
                "isDefault": true,
                "memoRegex": "",
                "minConfirm": 1,
                "name": "BTC",
                "network": "BTC",
                "resetAddressStatus": false,
                "specialTips": "",
                "unLockConfirm": 2,
                "updateTime": 1571014804000,
                "withdrawEnable": true,
                "withdrawFee": "0.00050000",
                "withdrawIntegerMultiple": "0.00000001",
                "withdrawMin": "0.00100000"
            }
        ],
        "storage": "0.00000000",
        "trading": true,
        "withdrawAllEnable": true,
        "withdrawing": "0.00000000"
    }
]
```
</details>

Withdraw tokens from your Binance account to non-custodial wallet

```js
const binance = new Binance('https://api.binance.com', 'YOUR_API_KEY', 'YOUR_API_SECRET')

const response = await binance.withdraw({
  asset: 'ETH',
  address: 'YOUR_WALLET_ADDRESS',
  amount: 1 // this means 1 ETH not 1 wei
})
```

Example output:
```json
{
    "id":"7213fea8e94b4a5593d507237e5a555b"
}
```
