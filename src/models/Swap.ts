export interface SwapSettings {
  slippage: number | 'auto';
  deadline: number;
  from: string;
  to: string;
}
