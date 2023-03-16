import { SwapPoolColumn } from '../columns';

export const ModalTypes = {
  Overview: 1,
  AddLiquidity: 2,
  WithdrawLiquidity: 3,
};

export type LiquidityModalProps = {
  data?: SwapPoolColumn;
};
