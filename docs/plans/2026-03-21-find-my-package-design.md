# find-my-package 文档构建设计方案

**日期**：2026-03-21
**状态**：已批准并执行

---

## 概述

基于「找快递」iOS 应用的现有文档，为本网站的 `find-my-package` 应用创建完整的 MDX 文档集，遵循现有项目的风格和格式。

---

## 设计决策

### App ID 命名
- **ID**：`find-my-package`
- **路由**：`/find-my-package/...`
- **图标**：📦

### App Store URL
- 留空，待后续添加

### 图片处理
- 将源文档的 3 张截图复制到 `/public/images/find-my-package/`
- 图片路径统一转为小写 `.png` 扩展名

---

## 文件结构

```
content/find-my-package/
  project.mdx     # 项目简介，使用富文本组件
  faq.mdx         # 常见问题
  privacy.mdx     # 隐私政策
  terms.mdx       # 用户协议

public/images/find-my-package/
  home.png        # 首页截图
  scan.png        # 相机扫描截图
  setting.png     # 设置页面截图

content/apps.json  # 新增 find-my-package 条目
```

---

## project.mdx 设计

使用以下组件构建项目简介页：

- **HeroSection**：应用名称和一句话介绍
- **FeatureGrid (cols=2)**：功能介绍（首页、取件码管理、相机扫描、设置）
- **FeatureGrid (cols=3)**：使用场景（驿站取件、帮家人取件、驿站分拣）
- **FeatureGrid (cols=3)**：技术特点（本地识别、智能匹配、离线可用）
- **InfoSection**：隐私与安全说明
- **DataTable**：支持功能表格
- **ImageCard**：3 张截图展示

---

## 文档内容来源

| 目标文件 | 内容来源 |
|---------|---------|
| project.mdx | 应用简介.md（重构为富文本格式） |
| faq.mdx | 常见问题.md |
| privacy.mdx | 隐私政策.md |
| terms.mdx | 用户协议.md |

---

## 执行记录

- [x] 复制截图到 public 目录
- [x] 创建 project.mdx
- [x] 创建 faq.mdx
- [x] 创建 privacy.mdx
- [x] 创建 terms.mdx
- [x] 更新 apps.json
