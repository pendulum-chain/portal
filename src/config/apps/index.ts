/* eslint-disable @typescript-eslint/no-explicit-any */
import { nablaConfig } from './nabla';
import { AppConfig } from './types';

export type Apps = 'nabla';

export const appsConfigs = {
  nabla: nablaConfig,
} satisfies Record<Apps, AppConfig>;

export type AppsConfig = typeof appsConfigs;
