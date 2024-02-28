import { config } from '../config';
import { ToastMessage, showToast } from '../shared/showToast';

export const transactionErrorToast = (err: unknown) => {
  const cancelled = String(err).startsWith('Error: Cancelled');
  showToast(ToastMessage.ERROR, cancelled ? 'Transaction cancelled' : 'Transaction failed');
};

const { slippage, deadline } = config.transaction.settings;

export const getValidSlippage = (val?: number): number | undefined =>
  val !== undefined ? Math.min(Math.max(val, slippage.min), slippage.max) : val;
export const getValidDeadline = (val: number): number => Math.min(Math.max(val, deadline.min), deadline.max);
