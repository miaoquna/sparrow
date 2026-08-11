export const ARCH_FRONTEND_BODY = `# 前端架构约束（arch / frontend）

本文件定义 sparrow-arch 阶段**在存在 UI 规格时**必须遵守的前端架构纪律。

> ⚠️ 本约束文件仅在 \`docs/sparrow/ui/\` 目录存在时生效。无 UI 规格时忽略。

## 前端架构定位

1. 前端架构为**项目级架构**，与应用架构（\`application.md\`）同级。
2. 前端架构定义后，写入 \`docs/sparrow/arch/frontend.md\`。
3. 应用架构中的**边缘层**和**客户端层**与前端架构关联：
   - 边缘层：定义 UI 适配与服务聚合能力
   - 客户端层：按 UI 规格确定客户端类型（Web / Mobile / 小程序等）

## 微前端架构（Micro Frontend）

1. 如果项目包含多个独立的 UI 模块（对应不同限界上下文），可考虑微前端架构。
2. 微前端架构原则：
   - 每个微前端模块对应一个或多个限界上下文的 UI
   - 模块间通过事件总线或共享状态通信
   - 使用基座（Shell）统一加载和路由各模块
   - 各模块可独立开发、构建、部署
3. 技术选型可参考：Module Federation、qiankun、single-spa 等方案。
4. 如果项目规模较小、UI 模块间耦合度高，**不应**强行引入微前端架构。

## 前端分层结构

1. 前端代码应遵循以下分层：
   - **页面层（Pages）**：路由页面组件，负责页面布局和导航
   - **组件层（Components）**：可复用的 UI 组件
   - **服务层（Services）**：调用后端 API 的 HTTP 客户端、状态管理
   - **适配层（Adapters）**：数据转换（DTO ↔ ViewModel）
2. 各层依赖方向：页面层 → 组件层 + 服务层；服务层 → 适配层。

## 前端代码目录结构

\`\`\`
frontend/
├── {bc-slug}/                   # 各限界上下文的前端模块
│   ├── src/
│   │   ├── pages/               # 页面组件
│   │   ├── components/          # UI 组件
│   │   ├── services/            # API 调用服务
│   │   ├── adapters/            # 数据转换适配器
│   │   ├── stores/              # 状态管理
│   │   └── router/              # 路由配置
│   └── package.json
├── shared/                      # 跨 BC 共享资源
│   ├── components/              # 共享 UI 组件库
│   ├── styles/                  # 全局样式与设计令牌
│   └── utils/                   # 工具函数
└── shell/                       # 微前端基座（可选）
\`\`\`

## 与后端架构的关系

1. 前端模块与后端限界上下文的对应关系应在 frontend.md 中明确标注。
2. 一个前端模块可以聚合多个后端 BC 的服务（通过边缘层的服务聚合）。
3. 前端不直接访问后端 BC 的领域对象，仅通过 API 契约（api.md）交互。
`;
