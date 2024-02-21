import { NablaInstanceBackstopPool } from '../../../../../hooks/nabla/useNablaInstance';

export const ModalTypes = {
  AddLiquidity: 2,
  WithdrawLiquidity: 3,
};

export type LiquidityModalProps = {
  data?: NablaInstanceBackstopPool;
};
