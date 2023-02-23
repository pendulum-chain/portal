/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type { ApiPromise } from '@polkadot/api';
import { emptyFn } from '../../helpers/general';

export type ApiArgs<T extends Dict<any> = [never]> = { api: ApiPromise } & T;

export const isApiConnected = (api?: ApiPromise): api is ApiPromise =>
  !!api && api.isConnected;

export const fnOrEmpty =
  <T extends any[], R>(fn: (api: ApiPromise, ...args: T) => R) =>
  (api: ApiPromise | undefined, ...args: T): (() => R | null) =>
    isApiConnected(api) ? () => fn(api, ...args) : emptyFn;
