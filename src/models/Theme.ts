import { TenantName } from './Tenant';

export const enum ThemeName {
  Amplitude = TenantName.Amplitude,
  Pendulum = TenantName.Pendulum,
}

export const tenantTheme: Partial<Record<ThemeName, 'light' | 'dark'>> = {
  [TenantName.Amplitude]: 'dark',
  [TenantName.Pendulum]: 'light',
};
