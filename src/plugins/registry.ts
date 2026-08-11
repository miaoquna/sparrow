import type { Plugin } from './types.js';

export const BUNDLED_PLUGIN_VERSIONS: Record<string, string> = {
  archify: '2.13.0',
  'sparrow-ui': '2.13.0',
};

const _plugins: Plugin[] = [];

export function registerBundledPlugin(plugin: Plugin): void {
  _plugins.push(plugin);
}

export function getBundledPlugins(): Plugin[] {
  return _plugins;
}

export function getAugmentPlugins(): Plugin[] {
  return _plugins.filter((p) => p.manifest.contributes.augments?.length);
}

export function getSkillPlugins(): Plugin[] {
  return _plugins.filter((p) => p.manifest.contributes.skills?.length);
}
