export type ArtifactTrace = 'off' | 'on' | 'retain-on-failure';
export type ArtifactScreenshot = 'off' | 'on' | 'only-on-failure';
export type ArtifactVideo = 'off' | 'on' | 'retain-on-failure';

export interface TimeoutsConfig {
  test: number;
  expect: number;
  action: number;
  navigation: number;
}

export interface AritfactConfig {
  trace: ArtifactTrace;
  screenshot: ArtifactScreenshot;
  video: ArtifactVideo;
}

export interface EnvironmentConfig {
  name: string;
  baseUrl: string;
  timeouts: TimeoutsConfig;
  artifacts: AritfactConfig;
  use?: {
    headless: boolean;
  };
}

export interface RunProfileConfig {
  name: string;
  workers: number;
  retries: number;
  grep?: string;
  forbidOnly?: boolean;
}

export interface LoadedConfig {
  env: EnvironmentConfig;
  run: RunProfileConfig;
}
