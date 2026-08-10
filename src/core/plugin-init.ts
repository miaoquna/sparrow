import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { augmentPlugins } from '../plugins/index.js';
import { getGlobalConfigDir } from './harness-init.js';
import { getPluginStatus, markPluginInstalled } from './global-config.js';

const PLUGINS_SUBDIR = 'plugins';

interface SpWriterConfig {
  plugins?: Record<string, string>;
}

function getGlobalPluginsDir(): string {
  return join(getGlobalConfigDir(), PLUGINS_SUBDIR);
}

function readInstalledVersion(pluginDir: string): string | null {
  try {
    return readFileSync(join(pluginDir, '.version'), 'utf-8').trim();
  } catch {
    return null;
  }
}

function getArchifySkillRoot(): string {
  const candidates: string[] = [];
  if (process.platform === 'win32') {
    const appData = process.env.APPDATA || join(homedir(), 'AppData', 'Roaming');
    candidates.push(
      join(appData, 'Claude', 'skills', 'archify'),
      join(appData, 'opencode', 'skills', 'archify'),
      join(homedir(), '.agents', 'skills', 'archify'),
    );
  } else {
    candidates.push(
      join(homedir(), '.claude', 'skills', 'archify'),
      join(homedir(), '.config', 'opencode', 'skills', 'archify'),
      join(homedir(), '.agents', 'skills', 'archify'),
    );
  }
  for (const p of candidates) {
    if (existsSync(join(p, 'bin', 'archify.mjs'))) {
      return p;
    }
  }
  return '';
}

function readSparrowConfig(projectRoot: string): SpWriterConfig {
  try {
    return JSON.parse(readFileSync(join(projectRoot, '.sparrow', 'sparrow.json'), 'utf-8'));
  } catch {
    return {};
  }
}

function writeSparrowConfig(projectRoot: string, config: SpWriterConfig): void {
  const dir = join(projectRoot, '.sparrow');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'sparrow.json'), JSON.stringify(config, null, 2) + '\n', 'utf-8');
}

function markProjectPluginInstalled(projectRoot: string, id: string, version: string): void {
  const config = readSparrowConfig(projectRoot);
  config.plugins = config.plugins || {};
  config.plugins[id] = version;
  writeSparrowConfig(projectRoot, config);
}

function isPluginAvailable(pluginId: string, projectRoot: string, expectedVersion: string): boolean {
  const globalStatus = getPluginStatus(pluginId);
  if (globalStatus) {
    markProjectPluginInstalled(projectRoot, pluginId, expectedVersion);
    return true;
  }

  const pluginsDir = getGlobalPluginsDir();
  const pluginDir = join(pluginsDir, pluginId);
  const installedVersion = readInstalledVersion(pluginDir);
  if (installedVersion === expectedVersion) {
    markPluginInstalled(pluginId, expectedVersion);
    markProjectPluginInstalled(projectRoot, pluginId, expectedVersion);
    return true;
  }

  const existingRoot = getArchifySkillRoot();
  if (existingRoot) {
    markPluginInstalled(pluginId, expectedVersion);
    markProjectPluginInstalled(projectRoot, pluginId, expectedVersion);
    return true;
  }

  const projectConfig = readSparrowConfig(projectRoot);
  if (projectConfig.plugins?.[pluginId]) {
    return true;
  }

  return false;
}

export function initializePluginRuntimes(projectRoot: string): string[] {
  const pluginsDir = getGlobalPluginsDir();
  mkdirSync(pluginsDir, { recursive: true });

  const written: string[] = [];

  for (const plugin of augmentPlugins) {
    if (plugin.id !== 'archify') continue;

    if (isPluginAvailable(plugin.id, projectRoot, plugin.version)) {
      written.push(plugin.id + ' (cached)');
    }
  }

  return written;
}
