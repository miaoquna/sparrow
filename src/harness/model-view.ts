export const MODEL_VIEW_BODY = `# View Model 建模约束（model / view-modeling）

本文件定义 sparrow-model 阶段**在存在 UI 设计时**必须遵守的 View Model 建模纪律。

> ⚠️ 本约束文件仅在 sparrow-design 生成的 \`api.md\` 和 \`tech.md\` 中包含 UI 相关设计时生效。

## View Model 定位

1. View Model（视图模型）是**为前端 UI 展示和交互而设计的数据模型**，与 DDD 的领域模型分离。
2. View Model 不是领域模型——它只关注**用户体验和页面布局**，不关注业务规则。
3. View Model 建模独立于 DDD 四层结构，属于前端关注点。

## View Model 设计原则

1. **页面为粒度**：每个 UI 页面对应一个或多个 View Model。
2. **组件为单元**：页面中的独立 UI 组件可有独立的 View Model。
3. **最小化数据传输**：View Model 只包含该页面/组件真正需要展示和交互的字段。
4. **单一职责**：一个 View Model 只服务于一个 UI 组件或页面。

## View Model 与消息契约的转换

1. 以 sparrow-design 生成的服务契约序列图为依据，分析前端需要的 View Model 与后端消息契约（DTO）之间的**不匹配**：
   - 字段名称不一致 → 需转换映射
   - DTO 字段过多 → View Model 只选择必要的字段
   - View Model 需要从多个 DTO 组装 → 需聚合逻辑
   - View Model 需要展示计算值 → 需在转换中计算
2. 定义 **ViewModel ↔ DTO 转换表**，明确每个字段的来源和转换规则。

## View Model 文档结构

\`\`\`markdown
### View Model: {ViewModelName}

- **页面/组件**：{PageName} / {ComponentName}
- **数据来源**：
  | 来源 API | 消息契约 | 说明 |
  |---------|---------|------|
  | API_GetOrder | GetOrderResponse | 订单详情 |
- **字段定义**：
  | 字段名 | 类型 | 来源字段 | 转换规则 | 说明 |
  |--------|------|---------|---------|------|
  | orderTitle | string | OrderDTO.title | 直接映射 | 订单标题 |
  | totalAmount | string | OrderDTO.amount | 格式化：分→元 | 订单金额 |
  | statusLabel | string | OrderDTO.status | 枚举→中文 | 状态标签 |
\`\`\`

## 禁止事项

1. **禁止**在 View Model 中包含业务逻辑或业务规则。
2. **禁止**直接引用领域对象（聚合、实体、值对象）。
3. **禁止**在 View Model 中包含数据库查询逻辑。
4. **禁止**为不存在对应 UI 页面的数据定义 View Model。
`;
