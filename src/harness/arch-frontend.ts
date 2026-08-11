export const ARCH_FRONTEND_BODY = `# 前端架构约束（arch / frontend）

本文件定义 sparrow-arch 阶段**在存在 UI 规格时**必须遵守的前端架构纪律。

> ⚠️ 本约束文件仅在 \`docs/sparrow/requirement/ui/\` 目录存在时生效。无 UI 规格时忽略。

## 交互上下文定位

1. 交互上下文是与其他限界上下文同级的架构概念，涵盖整个产品的所有客户端 UI + BFF 聚合层。
2. 每个产品有且仅有一个交互上下文，其 slug 自动提议为 \`frontend\`，由用户确认。
3. 交互上下文在 \`project.md\` 中与其他 BC 同级列出，标注为「交互上下文」。
4. 交互上下文的 design/model/plan/apply 步骤与其他 BC 完全独立，没有依赖关系，可以任意顺序或并行执行。

## 技术选型纪律

1. **客户端技术选型**：为每类客户端提供 1 个推荐方案和 2-3 个备选方案，由用户确认或自行选择。
2. **BFF 技术选型**：根据部署关系推荐 RESTful BFF / GraphQL BFF / 进程内 BFF，由用户确认。
3. **同进程调用识别**：若客户端为 QT/QML 等原生桌面方案，必须询问 BC 是否同进程部署。若同进程，BC 可不暴露 HTTP 远程服务。
4. **禁止**代用户做出技术选型决策——必须给出推荐 + 理由，等待用户确认。

## API 契约绑定纪律

1. **业务服务是唯一真相源**：交互上下文和 BC 的 API 设计都从 \`prd-business.md\` 中的业务服务定义推导，不互相依赖。
2. **契约绑定表必须在 sparrow-arch 阶段生成**，写入 \`frontend.md\`，作为后续独立执行的基础。
3. **绑定表内容**：每个 UI 交互操作 → 目标 BC → 业务服务 ID → 输入/输出字段 → 一致性标记。
4. **一致性检查**：
   - ✅：前端请求参数与业务服务输入定义完全一致
   - ⚠️：存在不匹配 → **必须在此阶段解决**，不得遗留到下游
5. **禁止**隐式假设——所有跨 BC 的 API 调用关系必须显式记录在绑定表中。

## 交互上下文 spec 切片

1. sparrow-arch 必须为交互上下文创建 \`design/{ui-slug}/spec.md\`。
2. spec.md 包含所有 UI 交互相关的业务服务定义（输入/输出字段、来源 BC）。
3. 交互上下文的 spec.md 与其他 BC 的 spec.md 来自同一份 \`prd-business.md\`，确保一致性。

## BFF 聚合层设计

1. BFF 聚合层是交互上下文与后端 BC 之间的正式桥梁。
2. 其设计包含在 \`frontend.md\` 中，具体实现由交互上下文的 design → apply 步骤完成。
3. BFF 端点 1:1 对应 UI 页面需求，不做通用化抽象。
4. BFF 不做业务逻辑，只负责数据聚合和格式转换。
5. BFF 代码放在 \`edge/bff/\` 下，不放在 \`backend/{slug}/\` 下。

## 前端代码目录结构

\`\`\`
frontend/
├── features/
│   └── {feature-name}/
│       ├── pages/
│       ├── components/
│       ├── services/
│       ├── adapters/
│       └── stores/
├── shared/
│   ├── components/
│   ├── styles/
│   └── utils/
└── shell/                       # 微前端基座（可选）

edge/
└── bff/
    └── {page-or-feature}/
        └── *Aggregator
\`\`\`

## 必须（MUST）

1. **必须**在 API 契约绑定表中记录所有 UI ↔ BC 的交互关系。
2. **必须**创建交互上下文的 spec.md 切片。
3. **必须**将交互上下文与其他 BC 同级列在 project.md 中。
4. **必须**确保绑定表中的输入输出与业务服务定义完全一致。

## 禁止（MUST NOT）

1. **禁止**将前端代码按 BC 组织（不再使用 \`frontend/{bc-slug}/\` 结构）。
2. **禁止**在 sparrow-arch 阶段跳过契约一致性检查。
3. **禁止**代用户做技术选型而不提供推荐理由。
4. **禁止**在同一前端页面调用的后端服务”作为划分子领域的理由（与 arch-business 约束一致）。
`;
