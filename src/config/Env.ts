export interface EnvVars {
  ENV: string;
  RUN: string;
}

export class Env {
  static read(): EnvVars {
    const ENV = (process.env.ENV ?? 'local').trim();
    const RUN = (process.env.RUN ?? 'all').trim();

    if (!ENV) throw new Error('ENV is empty');
    if (!RUN) throw new Error('RUN is empty');

    return { ENV, RUN };
  }
}
