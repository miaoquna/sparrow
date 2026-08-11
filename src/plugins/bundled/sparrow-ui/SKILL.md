# Sparrow UI — 基于 DDD 的前端界面生成

## 执行顺序检查

```
当前步骤：sparrow-ui（第 1.5 步 / 共 7 步）
所属层级：产品级（product-level）
前置条件：
  1. docs/sparrow/requirement/prd-business.md 必须存在
  2. docs/sparrow/requirement/prd-quanlity.md （若存在则必须读取）
下一步骤：sparrow-arch（产品级）
```

> ⚠️ 本步骤为**可选步骤**。如果项目不需要前端界面，可跳过，直接执行 sparrow-arch。

**前置条件检查**：
- 如果 prd-business.md 不存在，请提示用户先执行 sparrow-explore

---

## 输出目录

所有 UI 相关产出统一存放于：

\`\`\`
docs/sparrow/ui/
├── ui-spec.md           # 统一的 UI 规格文档（按角色分章节）
├── design-tokens.md     # 设计令牌（色彩、字体、间距）
├── index.html           # 主页面原型
├── components/          # 共享组件库
│   └── component-library.md
├── design-tokens.md    # 设计令牌（色彩、字体、间距）
└── mockups/            # 视觉稿/截图
```

---

## UI 需求分析

根据 prd-business.md 中的业务服务定义，分析前端 UI 需求：

1. 确定需要哪些前端页面（基于业务服务的用户交互入口）
2. 确定页面的导航结构和信息架构
3. 确定每个页面的核心交互流程

---

以下内容委托给 UI/UX Pro Max (ui-ux-pro-max) 引擎：

使用 UI/UX Pro Max 的设计系统生成 UI 规格和原型。UI/UX Pro Max 提供 84 种 UI 风格、192 套配色方案、74 组字体搭配、98 条 UX 指南和 22 个技术栈的设计系统。

### 操作步骤

1. 根据 UI 需求分析结果，使用 UI/UX Pro Max 生成 UI 设计规格
2. 为每个页面生成原型 HTML（保存到 docs/sparrow/ui/）
3. 生成设计令牌（design-tokens.md）
4. 生成组件库文档（components/component-library.md）

### 技术栈选择

优先检查以下约束源：
1. 项目级 harness（docs/sparrow/harness/）中的 UI 设计约束
2. 全局级 harness（~/.config/sparrow/harness/）中的 UI 设计约束
3. 若无 harness 约束，询问用户选择前端技术栈

### UI 设计 Harness 约束

如果项目级或全局级 harness 中存在 UI 设计相关约束规则，则严格遵循；否则按 UI 规格自由设计。
