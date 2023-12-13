import { Environment } from '..';
import { TenantName } from '../../models/Tenant';

export type AppConfigBase = {
  tenants: TenantName[];
  environment?: Environment[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppConfig = AppConfigBase & Partial<Record<TenantName, any>>;
