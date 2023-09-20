/* eslint-disable @typescript-eslint/no-explicit-any */
import { nablaConfig } from './nabla';
import { spacewalkConfig } from './spacewalk';
import { AppConfig } from './types';

export type Apps = 'nabla' | 'spacewalk';

export const appsConfigs = {
  nabla: nablaConfig,
  spacewalk: spacewalkConfig,
} satisfies Record<Apps, AppConfig>;

export type AppsConfig = typeof appsConfigs;
