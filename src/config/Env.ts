export interface EnvVars {
  ENV: string;
  RUN: string;
}

export class Env {
  static read(): EnvVars {
    const ENV = (process.env.ENV ?? 'stage').trim();
    const RUN = (process.env.RUN ?? 'ui-smoke').trim();

    if (!ENV) throw new Error('ENV is empty');
    if (!RUN) throw new Error('RUN is empty');

    return { ENV, RUN };
  }
}
