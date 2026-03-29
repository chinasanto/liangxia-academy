# AI量化学院

这是一个基于 `Next.js 16 + React 19 + TypeScript + Tailwind CSS 4` 的课程平台项目。当前已经把你提供的基础站原型和课程 HTML 接入到了同一个项目中，前台可以展示课程，后台可以管理课程并控制上架状态。

## 当前已经完成

- 以压缩包里的 Next.js 网站原型作为基础站
- 接入 5 门课程到 `量虾学院`
- 提供课程列表页：`/academy`
- 提供课程详情页：`/academy/[slug]`
- 提供后台页：`/admin`
- 后台支持修改课程标题、摘要、分类、等级、排序、精选和上架状态
- 已支持接入 Neon 做课程与文章数据库管理

## 目录说明

- `app/page.tsx`：网站首页
- `app/academy/page.tsx`：课程列表页
- `app/academy/[slug]/page.tsx`：课程详情页
- `app/admin/page.tsx`：课程后台
- `app/api/admin/courses`：后台读写接口
- `app/api/admin/database`：Neon 状态与初始化接口
- `data/course-catalog.json`：课程管理数据
- `content/course-html`：原始课程 HTML 文件

## 本地运行

```bash
npm install
npm run dev
```

启动后可访问：

- 首页：`/`
- 学院：`/academy`
- 后台：`/admin`

## 构建项目

```bash
npm run build
```

## 当前后台的实现方式

现在后台支持两种数据模式：

- 未配置 `DATABASE_URL` 时，系统使用本地文件模式
- 已配置 `DATABASE_URL` 且完成初始化后，系统优先使用 Neon 数据库
- 如果 Neon 尚未初始化，前台会先回退到本地文件数据，避免站点空白

## 启用 Neon

1. 在 Neon 创建一个 Postgres 数据库。
2. 把连接串填到环境变量 `DATABASE_URL`。
3. 在本地或 Vercel 配置：

```bash
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
```

4. 登录后台 `/admin`，点击“同步到 Neon”。
5. 同步完成后，课程和文章会写入 Neon，后续后台改动会优先写数据库。

如果你下一步要继续，我可以再帮你做这些方向：

- 增加登录和权限控制
- 给文章也做可视化后台
- 支持新增课程和删除课程
- 把原始 HTML 进一步拆成站内原生组件页面
