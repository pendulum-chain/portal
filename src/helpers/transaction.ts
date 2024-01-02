import { MessageCallResult } from '@pendulum-chain/api-solang';
import { toast } from 'react-toastify';
import { config } from '../config';

export const transactionErrorToast = (err: unknown) => {
  const cancelled = String(err).startsWith('Error: Cancelled');
  toast(cancelled ? 'Transaction cancelled' : 'Transaction failed', { type: 'error' });
};

export const getErrorMessage = (data?: MessageCallResult['result']) => {
  if (!data) return undefined;
  switch (data.type) {
    case 'error':
      return data.error;
    case 'panic':
      return data.explanation;
    case 'reverted':
      return data.description;
    default:
      return undefined;
  }
};

const { slippage, deadline } = config.transaction.settings;

export const getValidSlippage = (val?: number): number | undefined =>
  val !== undefined ? Math.min(Math.max(val, slippage.min), slippage.max) : val;
export const getValidDeadline = (val: number): number => Math.min(Math.max(val, deadline.min), deadline.max);
