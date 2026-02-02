import type { LoadedConfig } from '../config/types';

export interface EffectiveTimeouts {
  test: number;
  expect: number;
  action: number;
  navigation: number;
  ui: number;
}

export class Timeouts {
  static from(config: LoadedConfig): EffectiveTimeouts {
    const t = config.env.timeouts;
    return {
      test: t.test,
      expect: t.expect,
      action: t.action,
      navigation: t.navigation,
      ui: t.expect,
    };
  }
}
