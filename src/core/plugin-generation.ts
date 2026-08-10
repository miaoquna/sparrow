import type { SkillPlugin } from '../plugins/types.js';

export function buildPluginSkillBody(plugin: SkillPlugin): string {
  return [
    `# ${plugin.commandName}`,
    '',
    `${plugin.description}`,
    '',
    '> This skill delegates to a bundled third-party engine. See plugin metadata below.',
    '',
    '---',
    '',
    '## 前置条件',
    '',
    '本技能是 Sparrow 框架的扩展技能，属于 DDD 流水线的辅助工具。',
    '',
    plugin.skillContent,
  ].join('\n');
}
