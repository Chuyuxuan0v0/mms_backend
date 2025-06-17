# MMS物料管理系统后端

一个基于 Node.js + Express + Sequelize + MySQL 的物料管理系统后端API。

## 功能特性

- ✅ 物料的增删改查（CRUD）
- ✅ 分页查询和搜索
- ✅ 数据验证
- ✅ 错误处理
- ✅ 安全中间件
- ✅ 限流保护
- ✅ RESTful API设计

## 技术栈

- **Node.js** - 运行环境
- **Express** - Web框架
- **Sequelize** - ORM框架
- **MySQL** - 数据库
- **Joi** - 数据验证
- **Helmet** - 安全中间件
- **CORS** - 跨域处理
- **ESLint** - 代码检查
- **Prettier** - 代码格式化

## 跟我学

### 🛠️ 开发工具详解

#### 1. pnpm - 包管理器
**为什么选择 pnpm？**
- **更快的安装速度**：pnpm 使用硬链接和符号链接，避免重复下载
- **更少的磁盘空间**：所有依赖包存储在全局存储中，项目只存储链接
- **更严格的依赖管理**：防止 phantom dependencies（幽灵依赖）

**使用方法：**
```bash
# 安装依赖
pnpm install

# 添加新依赖
pnpm add express

# 添加开发依赖
pnpm add -D nodemon

# 运行脚本
pnpm dev
```

#### 2. ESLint - 代码质量检查
**作用：**
- 发现代码中的潜在问题
- 强制执行代码风格规范
- 提高代码质量和可维护性

**配置说明：**
```javascript
// .eslintrc.js
module.exports = {
  env: {
    node: true,        // Node.js 环境
    es2021: true,      // ES2021 语法支持
    jest: true,        // Jest 测试环境
  },
  extends: [
    'eslint:recommended',  // 使用推荐规则
  ],
  rules: {
    'indent': ['error', 2],           // 强制2空格缩进
    'quotes': ['error', 'single'],    // 强制单引号
    'semi': ['error', 'always'],      // 强制分号
    'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // 未使用变量警告
  },
};
```

**使用命令：**
```bash
# 检查代码
pnpm lint

# 自动修复
pnpm lint:fix
```

#### 3. Prettier - 代码格式化
**作用：**
- 统一代码格式
- 自动格式化代码
- 与 ESLint 配合使用

**配置说明：**
```json
// .prettierrc
{
  "semi": true,              // 添加分号
  "trailingComma": "es5",    // ES5兼容的尾随逗号
  "singleQuote": true,       // 使用单引号
  "printWidth": 80,          // 行宽限制
  "tabWidth": 2,             // 缩进宽度
  "useTabs": false,          // 使用空格而非制表符
  "endOfLine": "lf"          // 换行符类型
}
```

**使用命令：**
```bash
# 格式化代码
pnpm format
```

#### 4. dotenv - 环境变量管理
**作用：**
- 管理不同环境的配置
- 保护敏感信息（如数据库密码）
- 避免硬编码配置

**使用方法：**
```javascript
// 在 .env 文件中定义环境变量
DB_HOST=127.0.0.1
DB_PASSWORD=123456

// 在代码中使用
require('dotenv').config();
const dbHost = process.env.DB_HOST;
```

**最佳实践：**
- 将 `.env` 添加到 `.gitignore`
- 提供 `.env.example` 作为模板
- 不同环境使用不同的 `.env` 文件

#### 5. Sequelize - ORM框架
**作用：**
- 数据库操作抽象化
- 支持多种数据库
- 提供迁移和种子数据功能

**核心概念：**

**模型定义：**
```javascript
// src/models/material.js
class Material extends Model {
  static associate(models) {
    // 定义模型关联关系
  }
}

Material.init({
  code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: '物料编码',
  },
  // ... 其他字段
}, {
  sequelize,
  modelName: 'Material',
  tableName: 'materials',
  timestamps: true,        // 自动添加 createdAt, updatedAt
  underscored: true,       // 使用下划线命名
});
```

**数据库操作：**
```javascript
// 查询
const materials = await Material.findAll({
  where: { status: 'active' },
  order: [['createdAt', 'DESC']],
  limit: 10
});

// 创建
const material = await Material.create({
  code: 'MAT001',
  name: '螺丝钉'
});

// 更新
await material.update({ stock: 100 });

// 删除
await material.destroy();
```

**迁移文件：**
```javascript
// src/migrations/xxx-create-materials.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('materials', {
      // 表结构定义
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('materials');
  }
};
```

#### 6. Joi - 数据验证
**作用：**
- 请求参数验证
- 提供详细的错误信息
- 支持复杂的验证规则

**使用示例：**
```javascript
const Joi = require('joi');

const createMaterialSchema = Joi.object({
  code: Joi.string().max(50).required().messages({
    'string.empty': '物料编码不能为空',
    'string.max': '物料编码长度不能超过50个字符',
    'any.required': '物料编码是必填项'
  }),
  price: Joi.number().precision(2).min(0).optional().messages({
    'number.base': '单价必须是数字',
    'number.min': '单价不能为负数'
  })
});

// 在中间件中使用
const validateCreateMaterial = (req, res, next) => {
  const { error } = createMaterialSchema.validate(req.body);
  if (error) {
    error.isJoi = true;
    return next(error);
  }
  next();
};
```

#### 7. Express 中间件
**作用：**
- 处理请求和响应
- 提供安全保护
- 实现跨域支持

**安全中间件：**
```javascript
// Helmet - 安全头设置
app.use(helmet());

// CORS - 跨域资源共享
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['http://localhost:3000'] 
    : true,
  credentials: true
}));

// 限流 - 防止API滥用
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100个请求
});
app.use('/api/', limiter);
```

#### 8. 错误处理
**统一错误处理：**
```javascript
// src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  // Sequelize 错误处理
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: '数据验证失败',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }
  
  // 默认错误处理
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || '内部服务器错误'
  });
};
```

### 🏗️ 项目架构设计

#### 1. 目录结构
```
src/
├── config/          # 配置文件
├── controllers/     # 控制器层 - 处理业务逻辑
├── middleware/      # 中间件 - 请求处理
├── models/          # 数据模型层 - 数据库操作
├── routes/          # 路由层 - API路由定义
├── validators/      # 验证层 - 数据验证
├── migrations/      # 数据库迁移
└── app.js          # 应用入口
```

#### 2. 分层架构
- **路由层 (Routes)**：定义API端点
- **验证层 (Validators)**：验证请求数据
- **控制器层 (Controllers)**：处理业务逻辑
- **模型层 (Models)**：数据库操作
- **中间件层 (Middleware)**：请求预处理和后处理

#### 3. RESTful API设计
```javascript
// 物料管理API
GET    /api/materials          // 获取物料列表
GET    /api/materials/:id      // 获取单个物料
POST   /api/materials          // 创建物料
PUT    /api/materials/:id      // 更新物料
DELETE /api/materials/:id      // 删除物料
DELETE /api/materials          // 批量删除
GET    /api/materials/categories // 获取分类
GET    /api/materials/statistics // 获取统计
```

### 🔧 开发最佳实践

#### 1. 环境配置
```bash
# 开发环境
NODE_ENV=development
PORT=3000

# 生产环境
NODE_ENV=production
PORT=3000
```

#### 2. 数据库配置
```javascript
// 支持多环境配置
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: console.log, // 开发环境显示SQL日志
  },
  production: {
    // 生产环境配置
    logging: false, // 生产环境不显示SQL日志
  }
};
```

#### 3. 错误处理策略
- 使用统一的错误处理中间件
- 区分不同类型的错误（验证错误、数据库错误等）
- 提供有意义的错误信息
- 生产环境隐藏敏感错误信息

#### 4. 安全考虑
- 使用 Helmet 设置安全头
- 实现请求限流
- 验证所有输入数据
- 使用环境变量管理敏感信息

#### 5. 性能优化
- 数据库查询优化（索引、分页）
- 使用连接池
- 实现缓存策略
- 压缩响应数据

### 📚 学习资源

- [Node.js 官方文档](https://nodejs.org/docs/)
- [Express.js 官方文档](https://expressjs.com/)
- [Sequelize 官方文档](https://sequelize.org/)
- [Joi 验证库文档](https://joi.dev/)
- [RESTful API 设计指南](https://restfulapi.net/)

## 项目结构

```
mms_backend/
├── src/
│   ├── config/
│   │   └── database.js          # 数据库配置
│   ├── controllers/
│   │   └── materialController.js # 物料控制器
│   ├── middleware/
│   │   └── errorHandler.js      # 错误处理中间件
│   ├── models/
│   │   ├── index.js             # 模型索引
│   │   └── material.js          # 物料模型
│   ├── routes/
│   │   └── materialRoutes.js    # 物料路由
│   ├── validators/
│   │   └── materialValidator.js # 数据验证
│   ├── migrations/              # 数据库迁移文件
│   └── app.js                   # 主应用文件
├── .env.example                 # 环境变量示例
├── .eslintrc.js                 # ESLint配置
├── .prettierrc                  # Prettier配置
├── .sequelizerc                 # Sequelize配置
├── package.json                 # 项目配置
└── README.md                    # 项目说明
```

## 快速开始

### 1. 环境要求

- Node.js >= 14
- MySQL >= 5.7
- pnpm (推荐) 或 npm

### 2. 安装依赖

```bash
# 使用 pnpm
pnpm install

# 或使用 npm
npm install
```

### 3. 环境配置

复制环境变量示例文件并修改配置：

```bash
cp env.example .env
```

编辑 `.env` 文件，配置数据库连接信息：

```env
# 数据库配置
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=123456
DB_NAME=mms_db
DB_DIALECT=mysql
```

### 4. 数据库准备

确保MySQL服务已启动，并创建数据库：

```sql
CREATE DATABASE mms_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. 启动项目

```bash
# 开发模式
pnpm dev

# 或生产模式
pnpm start
```

服务器将在 `http://localhost:3000` 启动。

## API文档

### 基础信息

- **基础URL**: `http://localhost:3000/api`
- **内容类型**: `application/json`

### 物料管理API

#### 1. 获取物料列表

```http
GET /api/materials
```

**查询参数**:
- `page` (可选): 页码，默认1
- `limit` (可选): 每页数量，默认10
- `search` (可选): 搜索关键词
- `category` (可选): 物料分类
- `status` (可选): 状态筛选
- `sortBy` (可选): 排序字段，默认created_at
- `sortOrder` (可选): 排序方向，默认DESC

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "code": "MAT001",
      "name": "螺丝钉",
      "category": "紧固件",
      "specification": "M4x20",
      "unit": "个",
      "price": 0.50,
      "stock": 1000,
      "minStock": 100,
      "maxStock": 2000,
      "supplier": "供应商A",
      "location": "A区-01-01",
      "description": "标准螺丝钉",
      "status": "active",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

#### 2. 获取单个物料

```http
GET /api/materials/:id
```

#### 3. 创建物料

```http
POST /api/materials
```

**请求体**:
```json
{
  "code": "MAT001",
  "name": "螺丝钉",
  "category": "紧固件",
  "specification": "M4x20",
  "unit": "个",
  "price": 0.50,
  "stock": 1000,
  "minStock": 100,
  "maxStock": 2000,
  "supplier": "供应商A",
  "location": "A区-01-01",
  "description": "标准螺丝钉",
  "status": "active"
}
```

#### 4. 更新物料

```http
PUT /api/materials/:id
```

#### 5. 删除物料

```http
DELETE /api/materials/:id
```

#### 6. 批量删除物料

```http
DELETE /api/materials
```

**请求体**:
```json
{
  "ids": [1, 2, 3]
}
```

#### 7. 获取物料分类

```http
GET /api/materials/categories
```

#### 8. 获取库存统计

```http
GET /api/materials/statistics
```

### 健康检查

```http
GET /health
```

## 开发工具

### 代码格式化

```bash
pnpm format
```

### 代码检查

```bash
# 检查代码
pnpm lint

# 自动修复
pnpm lint:fix
```

### 数据库迁移

```bash
# 运行迁移
pnpm db:migrate

# 运行种子数据
pnpm db:seed
```

## 测试

使用Postman或其他API测试工具测试接口：

1. 导入Postman集合（可自行创建）
2. 设置环境变量 `baseUrl` 为 `http://localhost:3000`
3. 开始测试各个接口

## 部署

### 生产环境配置

1. 设置 `NODE_ENV=production`
2. 配置生产环境数据库
3. 设置适当的限流和安全配置
4. 使用PM2或Docker进行部署

### Docker部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

MIT License
