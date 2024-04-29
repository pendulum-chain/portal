import { config } from '../config';

const { slippage, deadline } = config.transaction.settings;

export const getValidSlippage = (val?: number): number | undefined =>
  val !== undefined ? Math.min(Math.max(val, slippage.min), slippage.max) : val;

export const getValidDeadline = (val: number): number => Math.min(Math.max(val, deadline.min), deadline.max);
