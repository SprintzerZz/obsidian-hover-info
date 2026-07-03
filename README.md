<p align="center">
  <img src="icon.png" width="80" alt="Hover Info" />
  <h1 align="center">Hover Info</h1>
  <p align="center">
    <strong>English</strong> | <a href="#中文">中文</a>
  </p>
</p>

---

An [Obsidian](https://obsidian.md) plugin that enriches the file explorer with hover tooltips — see file counts when hovering folders, and metadata summaries when hovering files.

## ✨ Features

- **Folder hover** — shows recursive file and subfolder counts
- **File hover** — shows frontmatter description, tags, word count, modified date, and more
- **Zero config** — works out of the box with sensible defaults
- **Fully customizable** — toggle every data field, adjust delay and max-width, inject custom CSS
- **Bilingual** — English and 简体中文, switch in settings
- **Lightweight** — reads from Obsidian's metadata cache, no disk I/O for most fields

## 📸 Preview


| Folder hover | File hover | Settings |
|:---:|:---:|:---:|
| ![folder](https://raw.githubusercontent.com/SprintzerZz/BlogImg/main/20260703113437878.png) | ![file](https://raw.githubusercontent.com/SprintzerZz/BlogImg/main/20260703113401040.png) | ![settings](https://raw.githubusercontent.com/SprintzerZz/BlogImg/main/20260703113513438.png) |

## 📦 Installation

### Manual

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/SprintzerZz/obsidian-hover-info/releases)
2. Create a folder `<vault>/.obsidian/plugins/hover-info/`
3. Copy the three files into that folder
4. In Obsidian, go to **Settings → Community Plugins**, enable **Hover Info**


### From Source

```bash
git clone https://github.com/SprintzerZz/obsidian-hover-info.git
cd obsidian-hover-info
npm install
npm run build
# Then copy main.js, manifest.json, styles.css to your vault's plugin folder
```

## 🎯 Usage

Once enabled, just hover over items in the file explorer:

- **Hover a folder** → tooltip shows: `12 files · 3 subfolders`
- **Hover a .md file** → tooltip shows the heading, description, tags, dates

### Defining a file summary

Three ways to define the summary text shown on hover:

**Method 1: `description` field (recommended)**

```markdown
---
description: A beginner's guide to Obsidian plugin development
tags:
  - obsidian
  - tutorial
---

# Plugin Development Guide

Your content...
```

**Method 2: `summary` field**

```markdown
---
summary: 10 tips for managing notes efficiently in Obsidian
---
```

**Method 3: `desc` field** (shorthand)

```markdown
---
desc: 2024 reading list and reviews
---
```

**Priority:** `description` → `summary` → `desc` — the first non-empty value is used. If none are set, the summary area is left blank.

**Other auto-extracted info** (no configuration needed):

| Field | Source |
|---|---|
| Title | First `# Heading` in the file |
| Tags | Frontmatter `tags` + inline `#tags` |
| Word count | Full text word count |
| Created / Modified | File system timestamps |

## ⚙️ Settings

Open **Settings → Community Plugins → Hover Info (gear icon)**:

### Folder Hover
| Setting | Default | Description |
|---|---|---|
| Show folder file count | On | Show file count when hovering folders |
| Show subfolder count | On | Also show subfolder count |
| Count markdown only | Off | Only count .md files (vs all types) |

### File Hover
| Setting | Default | Description |
|---|---|---|
| Show file summary | On | Show summary tooltip on file hover |
| Show tags | On | Display frontmatter and inline tags |
| Show word count | Off | Word count (reads file content) |
| Show created date | Off | File creation date |
| Show modified date | On | Last modified date |
| Show first heading | On | First `# Heading` as title |
| Max summary length | 100 | Truncate description at N chars |

### Style
| Setting | Default | Description |
|---|---|---|
| Language | 简体中文 | UI language (English / 中文) |
| Tooltip delay | 300ms | Delay before tooltip appears |
| Max tooltip width | 300px | Maximum tooltip width |
| Custom CSS | (empty) | Custom CSS for `.hover-info-tooltip` |

### 🎨 Example Theme: Acrylic Glow

Paste this into **Settings → Hover Info → Custom CSS** for a frosted-glass look with a purple glow border:

```css
/* ============================================
   Hover Info — Acrylic Glow Theme
   ============================================ */

.hover-info-tooltip {
  /* Frosted glass */
  background: rgba(28, 28, 38, 0.9) !important;
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);

  /* Gradient border */
  border: 2px solid rgba(139, 92, 246, 0.5) !important;
  border-radius: 14px !important;

  /* Multi-layer glow */
  box-shadow:
    0 0 12px rgba(139, 92, 246, 0.35),
    0 0 40px rgba(99, 102, 241, 0.15),
    0 0 80px rgba(6, 182, 212, 0.08),
    0 12px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;

  color: #e4e4ec !important;
  font-size: 13px !important;
  line-height: 1.7 !important;
  padding: 14px 20px !important;

  animation: tipIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
}

/* Border shifts to cyan on hover */
.hover-info-tooltip:hover {
  border-color: rgba(6, 182, 212, 0.6) !important;
  box-shadow:
    0 0 18px rgba(6, 182, 212, 0.4),
    0 0 50px rgba(99, 102, 241, 0.2),
    0 0 90px rgba(139, 92, 246, 0.1),
    0 12px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;
}

/* Tags */
.hover-info-tag {
  display: inline-block;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.7), rgba(99, 102, 241, 0.7));
  color: #fff !important;
  padding: 3px 9px !important;
  border-radius: 6px !important;
  font-size: 11px !important;
  font-weight: 500;
  margin: 2px 3px !important;
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.25);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.hover-info-tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(139, 92, 246, 0.5);
}

/* Meta text */
.hover-info-meta {
  color: #9898b0 !important;
  font-size: 11px !important;
}

/* Title */
.hover-info-tooltip strong {
  display: block;
  color: #f4f4fc !important;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.4px;
  margin-bottom: 4px;
}

/* Entrance animation */
@keyframes tipIn {
  from { opacity: 0; transform: translateY(8px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
```

> 💡 **Light theme?** Swap the background to `rgba(255, 255, 255, 0.8)`, text to `#2a2a38`, and reduce shadow opacity.

## 🛠 Development

```bash
npm install        # Install dependencies
npm run dev        # Watch mode (auto-rebuild)
npm run build      # Production build (type-check + bundle)
```

### Project Structure

```
src/
├── main.ts         # Plugin entry point & lifecycle
├── settings.ts     # Settings interface, defaults, settings tab UI
├── hover.ts        # Hover event delegation & tooltip rendering
├── summary.ts      # Folder stats & file summary extraction
└── i18n.ts         # Chinese/English translations
```

## 📄 License

MIT

---

<h1 id="中文">Hover Info 鼠标悬停信息</h1>

为 [Obsidian](https://obsidian.md) 文件列表增加悬停提示：鼠标移到文件夹上显示文件数量，移到文件上显示摘要信息。

## ✨ 功能特性

- **文件夹悬停** — 递归统计包含的文件数和子文件夹数
- **文件悬停** — 显示 frontmatter 描述、标签、字数、修改日期等信息
- **开箱即用** — 默认配置即可工作，无需额外设置
- **高度可定制** — 每个数据字段均可独立开关，可调节延迟和宽度，支持自定义 CSS
- **双语界面** — 支持英文和简体中文，设置中随时切换
- **轻量高效** — 直接读取 Obsidian 缓存，无需磁盘 I/O

## 📸 预览


| 文件夹悬停 | 文件悬停 | 设置页面 |
|:---:|:---:|:---:|
| ![文件夹](https://raw.githubusercontent.com/SprintzerZz/BlogImg/main/20260703113437878.png) | ![文件](https://raw.githubusercontent.com/SprintzerZz/BlogImg/main/20260703113401040.png) | ![设置](https://raw.githubusercontent.com/SprintzerZz/BlogImg/main/20260703113513438.png) |

## 📦 安装

### 手动安装

1. 从 [Release 页面](https://github.com/SprintzerZz/obsidian-hover-info/releases) 下载 `main.js`、`manifest.json`、`styles.css`
2. 在仓库目录下创建文件夹 `<仓库>/.obsidian/plugins/hover-info/`
3. 将三个文件放入该文件夹
4. 打开 Obsidian → **设置 → 第三方插件**，启用 **Hover Info**


### 从源码构建

```bash
git clone https://github.com/SprintzerZz/obsidian-hover-info.git
cd obsidian-hover-info
npm install
npm run build
# 将 main.js、manifest.json、styles.css 复制到仓库的插件目录
```

## 🎯 使用方法

启用插件后，直接在文件列表中悬停即可：

- **悬停文件夹** → 弹出提示：`12 个文件 · 3 个子文件夹`
- **悬停 .md 文件** → 弹出提示：标题、描述、标签、日期等

### 如何定义文件摘要

有三种方式定义悬停时显示的摘要文字：

**方式一：`description` 字段（推荐）**

```markdown
---
description: 面向新手的 Obsidian 插件开发入门教程
tags:
  - obsidian
  - 教程
---

# 插件开发指南

正文内容...
```

**方式二：`summary` 字段**

```markdown
---
summary: 介绍如何在 Obsidian 中高效管理笔记的 10 个技巧
---
```

**方式三：`desc` 字段（简写）**

```markdown
---
desc: 2024 年读书清单与读后感
---
```

**优先级：** `description` → `summary` → `desc`，找到第一个非空的就使用。都没写则摘要区域留空。

**其他自动提取的信息**（无需额外配置）：

| 显示内容 | 来源 |
|---|---|
| 标题 | 文件中第一个 `# 标题` |
| 标签 | Frontmatter 的 `tags` + 正文中的 `#标签` |
| 字数 | 自动统计全文 |
| 创建/修改日期 | 文件系统时间戳 |

## ⚙️ 设置项

打开 **设置 → 第三方插件 → Hover Info（齿轮图标）**：

### 文件夹悬停
| 设置项 | 默认值 | 说明 |
|---|---|---|
| 显示文件夹文件数量 | 开 | 悬停文件夹时显示文件数量 |
| 显示子文件夹数量 | 开 | 同时显示子文件夹数量 |
| 仅统计 Markdown 文件 | 关 | 只统计 .md 文件，还是所有类型 |

### 文件悬停
| 设置项 | 默认值 | 说明 |
|---|---|---|
| 显示文件摘要 | 开 | 悬停文件时显示摘要提示 |
| 显示标签 | 开 | 显示 frontmatter 和内联标签 |
| 显示字数 | 关 | 统计全文字数（需读取文件内容） |
| 显示创建日期 | 关 | 文件创建日期 |
| 显示修改日期 | 开 | 最后修改日期 |
| 显示首个标题 | 开 | 将第一个 `# 标题` 作为摘要标题 |
| 摘要最大长度 | 100 | 描述文字超过此长度时截断 |

### 样式
| 设置项 | 默认值 | 说明 |
|---|---|---|
| 语言 | 简体中文 | 界面语言（中文 / English） |
| 提示框延迟 | 300ms | 悬停后提示框出现的延迟时间 |
| 提示框最大宽度 | 300px | 提示框最大宽度 |
| 自定义 CSS | (空) | 针对 `.hover-info-tooltip` 的自定义样式 |

### 🎨 示例主题：流光亚克力

将以下 CSS 粘贴到 **设置 → Hover Info → 自定义 CSS**，即可获得毛玻璃 + 紫色发光边框效果：

```css
/* ============================================
   Hover Info — 流光亚克力主题
   ============================================ */

.hover-info-tooltip {
  /* 亚克力毛玻璃 */
  background: rgba(28, 28, 38, 0.9) !important;
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);

  /* 渐变边框 */
  border: 2px solid rgba(139, 92, 246, 0.5) !important;
  border-radius: 14px !important;

  /* 多层发光 */
  box-shadow:
    0 0 12px rgba(139, 92, 246, 0.35),
    0 0 40px rgba(99, 102, 241, 0.15),
    0 0 80px rgba(6, 182, 212, 0.08),
    0 12px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;

  color: #e4e4ec !important;
  font-size: 13px !important;
  line-height: 1.7 !important;
  padding: 14px 20px !important;

  animation: tipIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
}

/* 悬停时边框变为青色 */
.hover-info-tooltip:hover {
  border-color: rgba(6, 182, 212, 0.6) !important;
  box-shadow:
    0 0 18px rgba(6, 182, 212, 0.4),
    0 0 50px rgba(99, 102, 241, 0.2),
    0 0 90px rgba(139, 92, 246, 0.1),
    0 12px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;
}

/* 标签 */
.hover-info-tag {
  display: inline-block;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.7), rgba(99, 102, 241, 0.7));
  color: #fff !important;
  padding: 3px 9px !important;
  border-radius: 6px !important;
  font-size: 11px !important;
  font-weight: 500;
  margin: 2px 3px !important;
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.25);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.hover-info-tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(139, 92, 246, 0.5);
}

/* 元信息 */
.hover-info-meta {
  color: #9898b0 !important;
  font-size: 11px !important;
}

/* 标题 */
.hover-info-tooltip strong {
  display: block;
  color: #f4f4fc !important;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.4px;
  margin-bottom: 4px;
}

/* 入场动画 */
@keyframes tipIn {
  from { opacity: 0; transform: translateY(8px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
```

> 💡 **浅色主题？** 把背景换成 `rgba(255, 255, 255, 0.8)`，文字换成 `#2a2a38`，阴影透明度降低即可。

## 🛠 开发

```bash
npm install        # 安装依赖
npm run dev        # 开发模式（自动重新构建）
npm run build      # 生产构建（类型检查 + 打包）
```

### 项目结构

```
src/
├── main.ts         # 插件入口和生命周期
├── settings.ts     # 设置接口、默认值、设置页 UI
├── hover.ts        # 悬停事件代理和提示框渲染
├── summary.ts      # 文件夹统计和文件摘要提取
└── i18n.ts         # 中英文翻译词典
```

## 📄 开源协议

MIT
