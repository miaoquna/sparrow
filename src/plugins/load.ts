import * as archify from './bundled/archify/index.js';
import * as sparrowUi from './bundled/sparrow-ui/index.js';
import { registerBundledPlugin } from './registry.js';
import type { Plugin } from './types.js';

export function loadBundledPlugins(): void {
  registerBundledPlugin({
    manifest: archify.manifest,
    skillContent: archify.skillContent,
    augmentContents: { 'SKILL.md': archify.skillContent },
  } as Plugin);

  registerBundledPlugin({
    manifest: sparrowUi.manifest,
    skillContent: sparrowUi.skillContent,
    augmentContents: { 'SKILL.md': sparrowUi.skillContent },
  } as Plugin);
}
