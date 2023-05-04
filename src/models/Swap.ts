export interface SwapSettings {
  slippage?: number;
  deadline: number;
  from: string;
  to: string;
}

export interface SwapTransaction {
  from: string;
  fromAmount: number;
  to: string;
  toAmount: number;
  toMinAmount: number;
  slippage: number;
  deadline: number;
}
