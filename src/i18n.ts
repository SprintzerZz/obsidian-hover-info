/**
 * Internationalization module for Hover Info plugin.
 * Supports English (en) and Simplified Chinese (zh-cn).
 */

export type Lang = "en" | "zh-cn";

export interface LocaleDict {
  // Settings - sections
  "settings.folderHover": string;
  "settings.fileHover": string;
  "settings.style": string;

  // Settings - folder
  "settings.showFolderStats": string;
  "settings.showFolderStats.desc": string;
  "settings.showSubfolderCount": string;
  "settings.showSubfolderCount.desc": string;
  "settings.showMarkdownOnly": string;
  "settings.showMarkdownOnly.desc": string;

  // Settings - file
  "settings.showFileSummary": string;
  "settings.showFileSummary.desc": string;
  "settings.showTags": string;
  "settings.showTags.desc": string;
  "settings.showWordCount": string;
  "settings.showWordCount.desc": string;
  "settings.showCreatedDate": string;
  "settings.showCreatedDate.desc": string;
  "settings.showModifiedDate": string;
  "settings.showModifiedDate.desc": string;
  "settings.showFirstHeading": string;
  "settings.showFirstHeading.desc": string;
  "settings.maxSummaryLength": string;
  "settings.maxSummaryLength.desc": string;

  // Settings - style
  "settings.tooltipDelay": string;
  "settings.tooltipDelay.desc": string;
  "settings.maxWidth": string;
  "settings.maxWidth.desc": string;
  "settings.customCSS": string;
  "settings.customCSS.desc": string;

  // Settings - language
  "settings.language": string;
  "settings.language.desc": string;

  // Tooltip - folder
  "tooltip.markdownFile": string;
  "tooltip.markdownFile_plural": string;
  "tooltip.file": string;
  "tooltip.file_plural": string;
  "tooltip.markdown": string;
  "tooltip.subfolder": string;
  "tooltip.subfolder_plural": string;

  // Tooltip - file
  "tooltip.words": string;
  "tooltip.created": string;
  "tooltip.modified": string;

  // Dates
  "date.today": string;
  "date.yesterday": string;
  "date.daysAgo": string;
}

const en: LocaleDict = {
  // Settings - sections
  "settings.folderHover": "Folder Hover",
  "settings.fileHover": "File Hover",
  "settings.style": "Style",

  // Settings - folder
  "settings.showFolderStats": "Show folder file count",
  "settings.showFolderStats.desc":
    "Show the number of files inside a folder when hovering over it.",
  "settings.showSubfolderCount": "Show subfolder count",
  "settings.showSubfolderCount.desc":
    "Also show the number of subfolders inside the folder.",
  "settings.showMarkdownOnly": "Count markdown files only",
  "settings.showMarkdownOnly.desc":
    "Only count .md files. When disabled, all file types are counted.",

  // Settings - file
  "settings.showFileSummary": "Show file summary",
  "settings.showFileSummary.desc":
    "Show a summary tooltip when hovering over a file.",
  "settings.showTags": "Show tags",
  "settings.showTags.desc":
    "Display frontmatter and inline tags in the tooltip.",
  "settings.showWordCount": "Show word count",
  "settings.showWordCount.desc":
    "Display the word count of the file (requires reading file content).",
  "settings.showCreatedDate": "Show created date",
  "settings.showCreatedDate.desc": "Display the file creation date.",
  "settings.showModifiedDate": "Show modified date",
  "settings.showModifiedDate.desc": "Display the file last-modified date.",
  "settings.showFirstHeading": "Show first heading",
  "settings.showFirstHeading.desc":
    "Display the first heading from the file as the title.",
  "settings.maxSummaryLength": "Max summary length",
  "settings.maxSummaryLength.desc":
    "Maximum number of characters for the description/summary text.",
  "settings.tooltipDelay": "Tooltip delay (ms)",
  "settings.tooltipDelay.desc":
    "Delay before the tooltip appears after hovering (in milliseconds).",
  "settings.maxWidth": "Max tooltip width (px)",
  "settings.maxWidth.desc": "Maximum width of the tooltip in pixels.",
  "settings.customCSS": "Custom CSS",
  "settings.customCSS.desc":
    "Custom CSS to apply to the tooltip. Use .hover-info-tooltip as the selector.",

  // Settings - language
  "settings.language": "Language",
  "settings.language.desc": "Interface language for the plugin.",

  // Tooltip - folder
  "tooltip.markdownFile": "markdown file",
  "tooltip.markdownFile_plural": "markdown files",
  "tooltip.file": "file",
  "tooltip.file_plural": "files",
  "tooltip.markdown": "markdown",
  "tooltip.subfolder": "subfolder",
  "tooltip.subfolder_plural": "subfolders",

  // Tooltip - file
  "tooltip.words": "words",
  "tooltip.created": "Created",
  "tooltip.modified": "Modified",

  // Dates
  "date.today": "Today",
  "date.yesterday": "Yesterday",
  "date.daysAgo": "days ago",
};

const zhCN: LocaleDict = {
  // Settings - sections
  "settings.folderHover": "文件夹悬停",
  "settings.fileHover": "文件悬停",
  "settings.style": "样式",

  // Settings - folder
  "settings.showFolderStats": "显示文件夹文件数量",
  "settings.showFolderStats.desc": "鼠标悬停在文件夹上时显示包含的文件数量。",
  "settings.showSubfolderCount": "显示子文件夹数量",
  "settings.showSubfolderCount.desc": "同时显示文件夹内的子文件夹数量。",
  "settings.showMarkdownOnly": "仅统计 Markdown 文件",
  "settings.showMarkdownOnly.desc": "仅统计 .md 文件。关闭时将统计所有类型文件。",

  // Settings - file
  "settings.showFileSummary": "显示文件摘要",
  "settings.showFileSummary.desc": "鼠标悬停在文件上时显示摘要信息。",
  "settings.showTags": "显示标签",
  "settings.showTags.desc": "在提示框中显示 frontmatter 和内联标签。",
  "settings.showWordCount": "显示字数",
  "settings.showWordCount.desc": "显示文件的字数统计（需要读取文件内容）。",
  "settings.showCreatedDate": "显示创建日期",
  "settings.showCreatedDate.desc": "显示文件的创建日期。",
  "settings.showModifiedDate": "显示修改日期",
  "settings.showModifiedDate.desc": "显示文件的最后修改日期。",
  "settings.showFirstHeading": "显示首个标题",
  "settings.showFirstHeading.desc": "显示文件中的第一个标题作为摘要标题。",
  "settings.maxSummaryLength": "摘要最大长度",
  "settings.maxSummaryLength.desc": "描述/摘要文本的最大字符数。",
  "settings.tooltipDelay": "提示框延迟 (毫秒)",
  "settings.tooltipDelay.desc": "鼠标悬停后提示框出现的延迟时间（毫秒）。",
  "settings.maxWidth": "提示框最大宽度 (像素)",
  "settings.maxWidth.desc": "提示框的最大宽度（像素）。",
  "settings.customCSS": "自定义 CSS",
  "settings.customCSS.desc":
    "应用于提示框的自定义 CSS。使用 .hover-info-tooltip 作为选择器。",

  // Settings - language
  "settings.language": "语言",
  "settings.language.desc": "插件的界面语言。",

  // Tooltip - folder
  "tooltip.markdownFile": "个 Markdown 文件",
  "tooltip.markdownFile_plural": "个 Markdown 文件",
  "tooltip.file": "个文件",
  "tooltip.file_plural": "个文件",
  "tooltip.markdown": "个 Markdown",
  "tooltip.subfolder": "个子文件夹",
  "tooltip.subfolder_plural": "个子文件夹",

  // Tooltip - file
  "tooltip.words": "字",
  "tooltip.created": "创建",
  "tooltip.modified": "修改",

  // Dates
  "date.today": "今天",
  "date.yesterday": "昨天",
  "date.daysAgo": "天前",
};

const locales: Record<Lang, LocaleDict> = { en, "zh-cn": zhCN };

/**
 * Get the translation dictionary for a given language.
 * Falls back to English if the language is not found.
 */
export function getLocale(lang: Lang): LocaleDict {
  return locales[lang] || locales["en"];
}

// Default export for the English locale
const i18n = locales;
export default i18n;
