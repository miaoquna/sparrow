export type PluginType = 'augment' | 'skill';

export interface BasePlugin {
  id: string;
  name: string;
  type: PluginType;
  version: string;
  skillContent: string;
}

export interface AugmentPlugin extends BasePlugin {
  type: 'augment';
  targetSkills: string[];
}

export interface SkillPlugin extends BasePlugin {
  type: 'skill';
  commandName: string;
  phase: 'product' | 'team';
  order: number;
  category: string;
  description: string;
  nextSkill: string | null;
}

export type Plugin = AugmentPlugin | SkillPlugin;
