import { ParsedUrlQueryInput } from "querystring";

export default interface Withdrawal extends ParsedUrlQueryInput {
  readonly coin: string;
  readonly address: string;
  readonly amount: number;

  // If network not send, return with default network of the coin.
  readonly network?: string;
}
