import { BackstopPool } from '../../../../models/BackstopPool';

export const ModalTypes = {
  AddLiquidity: 2,
  WithdrawLiquidity: 3,
};

export type LiquidityModalProps = {
  data?: BackstopPool;
};
