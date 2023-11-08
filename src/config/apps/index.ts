/* eslint-disable @typescript-eslint/no-explicit-any */
import { nablaConfig } from './nabla';
import { AppConfig } from './types';

export const apps = ['nabla'] as const;
export type Apps = (typeof apps)[number];

export const appsConfigs = {
  nabla: nablaConfig,
} as const satisfies Record<Apps, AppConfig>;

export type AppsConfig = typeof appsConfigs;
