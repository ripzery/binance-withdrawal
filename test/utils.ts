import querystring, { ParsedUrlQueryInput } from 'querystring'
import createSig from '../src/utils/signature'

export default function getFinalQueryString(
  request: ParsedUrlQueryInput = {}, mockDate: Date, apiSecret: string,
): string {
  const qs = querystring.stringify({ ...request, timestamp: mockDate.getTime() })
  const signature = createSig(apiSecret, qs)
  return `${qs}&signature=${signature}`
}
