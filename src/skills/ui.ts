import { registerSkillTemplate } from '../core/skill-generation.js';

const UI_BODY = `# Sparrow UI — 基于 DDD 的前端界面生成

## 执行顺序检查

在执行之前，请检查当前阶段是否合适：

\`\`\`
当前步骤：sparrow-ui（第 1.5 步 / 共 7 步）
所属层级：产品级（product-level）
前置条件：
  1. docs/sparrow/requirement/prd-business.md 必须存在
  2. docs/sparrow/requirement/prd-quanlity.md （若存在则必须读取）
下一步骤：sparrow-arch（产品级）
\`\`\`

> ⚠️ 本步骤为**可选步骤**。如果项目不需要前端界面，可跳过，直接执行 **sparrow-arch**。

**前置条件检查**：
- 如果 \`docs/sparrow/requirement/prd-business.md\` 不存在，请提示用户先执行 **sparrow-explore**
- 如果已存在 \`docs/sparrow/ui/\` 目录，请参考下方"输出文件存在性检查"章节处理

{{HARNESS}}

---

## 输出文件存在性检查

在生成任何输出之前，检查目标文件是否已存在：

\`\`\`
目标目录：docs/sparrow/ui/
\`\`\`

### 检查规则
1. 如果 \`docs/sparrow/ui/\` 目录**不存在**：
   - 正常生成所有 UI 产出文件
2. 如果 \`docs/sparrow/ui/\` 目录**已存在**：
   - 显示已有文件的清单
   - 询问用户是否要覆盖已有文件，还是仅更新特定文件
   - 允许用户选择操作方式（覆盖/更新/追加）

---

## 概述

根据 sparrow-explore 生成的业务需求文档（\`prd-business.md\`）和质量属性文档（\`prd-quanlity.md\`），分析用户画像、确定用户旅程，并生成前端 UI 规格、原型页面和设计令牌。

> 📐 约束参见 \`ui/requirements.md\` harness：用户画像 → 用户旅程 → UI 页面定义的完整流程。

本技能内部委托给 **UI/UX Pro Max** 引擎执行，该引擎提供 84 种 UI 风格、192 套配色方案、74 组字体搭配、98 条 UX 指南，覆盖 22 个技术栈。

---

## 执行步骤

### 步骤一：用户画像分析

读取 \`docs/sparrow/requirement/prd-business.md\` 中定义的**参与者（Actor）**，为每类参与者确定**用户画像**：

1. 角色名称与职责
2. 核心目标与痛点
3. 技术熟练度
4. 使用场景与频率

如果 \`docs/sparrow/requirement/prd-quanlity.md\` 存在，参考其中的质量属性（如可用性、响应时间等）对用户画像的影响。

### 步骤二：用户旅程定义

根据用户画像，为每类用户定义完整的**用户旅程**：

1. 旅程阶段（发现 → 探索 → 使用 → 完成 → 退出）
2. 每个阶段的用户操作与系统响应
3. 情感曲线（用户在各阶段的体验状态）
4. 关键触点与痛点

### 步骤三：UI 页面定义

根据用户旅程中的**关键触点**，定义交互和操作的 UI 页面：

1. 页面名称与路径
2. 页面目的（解决哪个用户旅程阶段的哪个触点）
3. 页面结构（主要区域、组件层级）
4. 交互方式（用户可执行的操作及系统反馈）
5. 关联的限界上下文（该页面调用了哪个 BC 的服务）

### 步骤四：技术栈选择

按优先级确定前端技术栈：
1. 项目级 harness（\`docs/sparrow/harness/\`）中的 UI 设计约束
2. 全局级 harness（\`~/.config/sparrow/harness/\`）中的 UI 设计约束
3. 若无 harness 约束，询问用户选择前端技术栈

### 步骤五：UI 规格生成

生成以下规格文档：

1. **设计令牌**（\`docs/sparrow/ui/design-tokens.md\`）：色彩体系、字体层级、间距系统、圆角/阴影规范
2. **组件库**（\`docs/sparrow/ui/components/component-library.md\`）：通用 UI 组件定义及其变体
3. **各 BC 的 UI 规格**（\`docs/sparrow/ui/specs/{slug}/ui-spec.md\`）：基于限界上下文划分的界面定义

### 步骤六：原型页面生成

为关键页面生成可交互的 HTML 原型：

1. 主页面原型（\`docs/sparrow/ui/index.html\`）
2. 各功能页面的原型（\`docs/sparrow/ui/{page-name}.html\`）

{{PLUGIN:sparrow-ui}}

---

## 输出目录结构

\`\`\`
docs/sparrow/ui/
├── design-tokens.md              # 设计令牌
├── index.html                    # 主页面原型
├── components/
│   └── component-library.md      # 组件库
├── specs/
│   └── {slug}/
│       └── ui-spec.md            # 各限界上下文的 UI 规格
└── mockups/                      # 视觉稿/截图
\`\`\`

## 质量检查清单

- [ ] 每类参与者都有对应的用户画像
- [ ] 用户画像从 prd-business.md 的 Actor 推导而来
- [ ] 用户旅程覆盖完整的交互流程，包含情感曲线
- [ ] UI 页面与用户旅程的关键触点一一对应
- [ ] 设计令牌完整（色彩、字体、间距）
- [ ] 组件被正确识别和归类
- [ ] 原型页面可独立打开和交互
- [ ] 每个 UI 页面标注了关联的限界上下文
- [ ] 技术栈选择与项目 harness 一致（如有）

## 完成后的下一步

✅ 完成 sparrow-ui 后，请执行 **sparrow-arch**（产品级）—— sparrow-arch 将检查 UI 规格，在业务架构和应用架构设计中纳入前端考虑，并生成独立的前端架构文档 \`docs/sparrow/arch/frontend.md\`。`;

export function register(): void {
  registerSkillTemplate('sparrow-ui', () => UI_BODY);
}
