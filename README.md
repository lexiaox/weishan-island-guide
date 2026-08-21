# 微山岛游览图

以手绘微山岛地图为底图的互动导览网站，支持景点弹窗、推荐路线、地图缩放与拖拽。

## 内容协作

景点文案和图片已从页面代码中独立出来：

- 在 `content/spots.ts` 修改景点名称、介绍、坐标和图片路径。
- 把景点图片放入 `public/spots/`。
- 完整步骤请阅读 [队友修改指南](docs/TEAM_EDITING_GUIDE.md)。

## 本地开发

```bash
pnpm dev
pnpm test
pnpm build
```

## 腾讯云构建

项目已包含 EdgeOne Makers 配置：

```bash
pnpm run build:tencent
```

静态产物会生成到 `out/`。`edgeone.json` 已配置安装命令、构建命令、输出目录与 Node.js 版本，可用于腾讯云 EdgeOne Makers 的 Git 自动部署或直接上传。
