import { archifyPlugin, ARCHIFY_RUNTIME_DIR } from './archify.js';
import type { AugmentPlugin, SkillPlugin } from './types.js';

export const augmentPlugins: AugmentPlugin[] = [archifyPlugin];
export const skillPlugins: SkillPlugin[] = [];

export function getAllPlugins() {
  return [...augmentPlugins, ...skillPlugins];
}

export { archifyPlugin, ARCHIFY_RUNTIME_DIR };
export type { AugmentPlugin, SkillPlugin, Plugin } from './types.js';
