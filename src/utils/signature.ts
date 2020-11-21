import crypto from 'crypto'

export default function create(apiSecret: string, queryString: string): string {
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(queryString)
    .digest('hex')

  return signature
}
