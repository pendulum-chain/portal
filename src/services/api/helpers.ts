/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { WeightV2 } from '@pendulum-chain/types/interfaces';
import type { ApiPromise } from '@polkadot/api';
import { emptyFn } from '../../helpers/general';

export type ApiArgs<T extends Dict<any> = [never]> = { api: ApiPromise } & T;

export const isApiConnected = (api?: ApiPromise): api is ApiPromise => !!api && api.isConnected;

export const fnOrEmpty =
  <T extends any[], R>(fn: (api: ApiPromise, ...args: T) => R) =>
  (api: ApiPromise | undefined, ...args: T): (() => R | undefined) =>
    isApiConnected(api) ? () => fn(api, ...args) : emptyFn;

export const createOptions = (api: ApiPromise) => ({
  gasLimit: api.createType('WeightV2', {
    refTime: '100000000000',
    proofSize: '1000000',
  }) as WeightV2,
  storageDepositLimit: null,
});
