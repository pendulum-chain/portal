import { toast } from 'react-toastify';
import { config } from '../config';

export const transactionErrorToast = (err: unknown) => {
  const cancelled = String(err).startsWith('Error: Cancelled');
  toast(cancelled ? 'Transaction cancelled' : 'Transaction failed', { type: 'error' });
};

const { slippage, deadline } = config.transaction.settings;

export const getValidSlippage = (val?: number): number | undefined =>
  val !== undefined ? Math.min(Math.max(val, slippage.min), slippage.max) : val;
export const getValidDeadline = (val: number): number => Math.min(Math.max(val, deadline.min), deadline.max);
