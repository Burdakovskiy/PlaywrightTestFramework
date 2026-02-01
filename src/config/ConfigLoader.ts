import fs from 'node:fs';
import path from 'node:path';
import { Env } from './Env';
import { EnvironmentConfig, RunProfileConfig, LoadedConfig } from './types';

function readJsonFile<T>(absolutePath: string): T {
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Config file not found: ${absolutePath}`);
  }
  const raw = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export class ConfigLoader {
  static load(cwd: string = process.cwd()): LoadedConfig {
    const { ENV, RUN } = Env.read();

    const envPath = path.resolve(cwd, 'config', 'environments', `${ENV}.json`);
    const runPath = path.resolve(cwd, 'config', 'runs', `${RUN}.json`);

    const env = readJsonFile<EnvironmentConfig>(envPath);
    const run = readJsonFile<RunProfileConfig>(runPath);

    if (!env.baseUrl) throw new Error(`baseUrl is missing in ${envPath}`);
    if (!env.timeouts) throw new Error(`timeouts is missing in ${envPath}`);
    if (!env.artifacts) throw new Error(`artifacts is missing in ${envPath}`);

    if (typeof run.workers !== 'number') throw new Error(`workers is invalid in ${runPath}`);
    if (typeof run.retries !== 'number') throw new Error(`retries is invalid in ${runPath}`);

    return { env, run };
  }
}
