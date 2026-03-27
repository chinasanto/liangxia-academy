# 量虾学院

这是一个基于 `Next.js 16 + React 19 + TypeScript + Tailwind CSS 4` 的课程平台项目。当前已经把你提供的基础站原型和课程 HTML 接入到了同一个项目中，前台可以展示课程，后台可以管理课程并控制上架状态。

## 当前已经完成

- 以压缩包里的 Next.js 网站原型作为基础站
- 接入 5 门课程到 `量虾学院`
- 提供课程列表页：`/academy`
- 提供课程详情页：`/academy/[slug]`
- 提供本地后台页：`/admin`
- 后台支持修改课程标题、摘要、分类、等级、排序、精选和上架状态
- 课程数据持久化到 `data/course-catalog.json`

## 目录说明

- `app/page.tsx`：网站首页
- `app/academy/page.tsx`：课程列表页
- `app/academy/[slug]/page.tsx`：课程详情页
- `app/admin/page.tsx`：课程后台
- `app/api/admin/courses`：后台读写接口
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

现在的后台是“本地文件型后台”：

- 管理页面通过 API 读取 `data/course-catalog.json`
- 保存时会直接把修改写回这个 JSON 文件
- 适合先把课程运营和上架流程跑通

如果你下一步要继续，我可以再帮你做这些方向：

- 接入真正的数据库后台
- 增加登录和权限控制
- 支持新增课程和删除课程
- 把原始 HTML 进一步拆成站内原生组件页面
