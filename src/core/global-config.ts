import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { getGlobalConfigDir } from './harness-init.js';

export interface PluginStatus {
  version: string;
  installedAt: string;
}

export interface GlobalConfig {
  version: string;
  plugins: Record<string, PluginStatus>;
  workflow: Record<string, unknown>;
}

const DEFAULT_CONFIG: GlobalConfig = {
  version: '1',
  plugins: {},
  workflow: {},
};

export function getGlobalConfigPath(): string {
  return join(getGlobalConfigDir(), 'config.json');
}

export function readGlobalConfig(): GlobalConfig {
  try {
    const raw = readFileSync(getGlobalConfigPath(), 'utf-8');
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export function writeGlobalConfig(config: GlobalConfig): void {
  const dir = getGlobalConfigDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(getGlobalConfigPath(), JSON.stringify(config, null, 2) + '\n', 'utf-8');
}

export function getPluginStatus(pluginId: string): PluginStatus | null {
  const config = readGlobalConfig();
  return config.plugins[pluginId] || null;
}

export function markPluginInstalled(pluginId: string, version: string): void {
  const config = readGlobalConfig();
  config.plugins[pluginId] = {
    version,
    installedAt: new Date().toISOString(),
  };
  writeGlobalConfig(config);
}
