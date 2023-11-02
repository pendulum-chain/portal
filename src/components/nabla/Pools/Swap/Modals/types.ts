import { SwapPoolColumn } from '../columns';

export const ModalTypes = {
  AddLiquidity: 2,
  WithdrawLiquidity: 3,
  Redeem: 4,
};

export type LiquidityModalProps = {
  data?: SwapPoolColumn;
};
