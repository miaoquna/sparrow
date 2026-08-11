import { register as registerExplore } from './explore.js';
import { register as registerArch } from './arch.js';
import { register as registerDesign } from './design.js';
import { register as registerModel } from './model.js';
import { register as registerPlan } from './plan.js';
import { register as registerApply } from './apply.js';
import { register as registerArchive } from './archive.js';
import { register as registerHarness } from './harness.js';
import { registerPluginSkills } from '../core/config.js';
import { getSkillPlugins } from '../plugins/index.js';
import { registerPluginSkillTemplates } from '../core/skill-generation.js';
import { loadBundledPlugins } from '../plugins/load.js';

export function initializeSkills(): void {
  loadBundledPlugins();

  registerExplore();
  registerArch();
  registerDesign();
  registerModel();
  registerPlan();
  registerApply();
  registerArchive();
  registerHarness();

  const skillPlugins = getSkillPlugins();
  const pluginSkillDefs = skillPlugins.flatMap((p) =>
    (p.manifest.contributes.skills || []).map((s) => ({
      id: s.id,
      name: s.id,
      description: s.description,
      phase: s.phase,
      order: s.order,
      nextSkill: s.nextSkill,
      commandName: s.commandName,
      category: s.category,
    }))
  );
  registerPluginSkills(pluginSkillDefs);
  registerPluginSkillTemplates(skillPlugins);
}
