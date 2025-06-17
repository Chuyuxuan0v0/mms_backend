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
