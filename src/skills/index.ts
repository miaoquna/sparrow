/**
 * Skills registry — imports all skill templates to trigger registration.
 * Each skill module calls registerSkillTemplate() on import.
 */

import { register as registerExplore } from './explore.js';
import { register as registerArch } from './arch.js';
import { register as registerDesign } from './design.js';
import { register as registerModel } from './model.js';
import { register as registerPlan } from './plan.js';
import { register as registerApply } from './apply.js';
import { register as registerArchive } from './archive.js';
import { register as registerHarness } from './harness.js';
import { registerPluginSkills } from '../core/config.js';
import { skillPlugins } from '../plugins/index.js';
import { registerPluginSkillTemplates } from '../core/skill-generation.js';

/**
 * Initialize all skill templates. Must be called before generating skill files.
 */
export function initializeSkills(): void {
  registerExplore();
  registerArch();
  registerDesign();
  registerModel();
  registerPlan();
  registerApply();
  registerArchive();
  registerHarness();

  // Initialize plugin skills
  const pluginSkillDefs = skillPlugins.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    phase: p.phase,
    order: p.order,
    nextSkill: p.nextSkill,
    commandName: p.commandName,
    category: p.category,
  }));
  registerPluginSkills(pluginSkillDefs);
  registerPluginSkillTemplates(skillPlugins);
}
