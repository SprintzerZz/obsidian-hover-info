import { App, PluginSettingTab, Setting } from "obsidian";
import type HoverInfoPlugin from "./main";
import { type Lang, type LocaleDict, getLocale } from "./i18n";

export interface HoverInfoSettings {
  // Language
  language: Lang;

  // Folder settings
  showFolderStats: boolean;
  showSubfolderCount: boolean;
  showMarkdownOnly: boolean;

  // File settings
  showFileSummary: boolean;
  showTags: boolean;
  showWordCount: boolean;
  showCreatedDate: boolean;
  showModifiedDate: boolean;
  showFirstHeading: boolean;
  maxSummaryLength: number;

  // Style
  tooltipDelay: number;
  customCSS: string;
  maxWidth: number;
}

export const DEFAULT_SETTINGS: HoverInfoSettings = {
  language: "zh-cn",

  showFolderStats: true,
  showSubfolderCount: true,
  showMarkdownOnly: false,

  showFileSummary: true,
  showTags: true,
  showWordCount: false,
  showCreatedDate: false,
  showModifiedDate: true,
  showFirstHeading: true,
  maxSummaryLength: 100,

  tooltipDelay: 300,
  customCSS: "",
  maxWidth: 300,
};

export class HoverInfoSettingTab extends PluginSettingTab {
  plugin: HoverInfoPlugin;

  constructor(app: App, plugin: HoverInfoPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    const t = getLocale(this.plugin.settings.language);

    // === Language ===
    containerEl.createEl("h2", { text: t["settings.language"] });

    new Setting(containerEl)
      .setName(t["settings.language"])
      .setDesc(t["settings.language.desc"])
      .addDropdown((dropdown) =>
        dropdown
          .addOption("zh-cn", "简体中文")
          .addOption("en", "English")
          .setValue(this.plugin.settings.language)
          .onChange(async (value: Lang) => {
            this.plugin.settings.language = value;
            await this.plugin.saveSettings();
            // Re-render the settings tab with new language
            this.display();
          })
      );

    // === Folder section ===
    containerEl.createEl("h2", { text: t["settings.folderHover"] });

    new Setting(containerEl)
      .setName(t["settings.showFolderStats"])
      .setDesc(t["settings.showFolderStats.desc"])
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.showFolderStats)
          .onChange(async (value) => {
            this.plugin.settings.showFolderStats = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t["settings.showSubfolderCount"])
      .setDesc(t["settings.showSubfolderCount.desc"])
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.showSubfolderCount)
          .onChange(async (value) => {
            this.plugin.settings.showSubfolderCount = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t["settings.showMarkdownOnly"])
      .setDesc(t["settings.showMarkdownOnly.desc"])
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.showMarkdownOnly)
          .onChange(async (value) => {
            this.plugin.settings.showMarkdownOnly = value;
            await this.plugin.saveSettings();
          })
      );

    // === File section ===
    containerEl.createEl("h2", { text: t["settings.fileHover"] });

    new Setting(containerEl)
      .setName(t["settings.showFileSummary"])
      .setDesc(t["settings.showFileSummary.desc"])
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.showFileSummary)
          .onChange(async (value) => {
            this.plugin.settings.showFileSummary = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t["settings.showTags"])
      .setDesc(t["settings.showTags.desc"])
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.showTags)
          .onChange(async (value) => {
            this.plugin.settings.showTags = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t["settings.showWordCount"])
      .setDesc(t["settings.showWordCount.desc"])
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.showWordCount)
          .onChange(async (value) => {
            this.plugin.settings.showWordCount = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t["settings.showCreatedDate"])
      .setDesc(t["settings.showCreatedDate.desc"])
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.showCreatedDate)
          .onChange(async (value) => {
            this.plugin.settings.showCreatedDate = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t["settings.showModifiedDate"])
      .setDesc(t["settings.showModifiedDate.desc"])
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.showModifiedDate)
          .onChange(async (value) => {
            this.plugin.settings.showModifiedDate = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t["settings.showFirstHeading"])
      .setDesc(t["settings.showFirstHeading.desc"])
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.showFirstHeading)
          .onChange(async (value) => {
            this.plugin.settings.showFirstHeading = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t["settings.maxSummaryLength"])
      .setDesc(t["settings.maxSummaryLength.desc"])
      .addText((text) =>
        text
          .setValue(String(this.plugin.settings.maxSummaryLength))
          .onChange(async (value) => {
            const num = parseInt(value);
            if (!isNaN(num) && num > 0) {
              this.plugin.settings.maxSummaryLength = num;
              await this.plugin.saveSettings();
            }
          })
      );

    // === Style section ===
    containerEl.createEl("h2", { text: t["settings.style"] });

    new Setting(containerEl)
      .setName(t["settings.tooltipDelay"])
      .setDesc(t["settings.tooltipDelay.desc"])
      .addText((text) => {
        text
          .setValue(String(this.plugin.settings.tooltipDelay))
          .onChange(async (value) => {
            const num = parseInt(value);
            if (!isNaN(num) && num >= 0) {
              this.plugin.settings.tooltipDelay = num;
              await this.plugin.saveSettings();
            }
          });
        text.inputEl.type = "number";
        text.inputEl.setAttribute("min", "0");
        text.inputEl.setAttribute("step", "50");
      });

    new Setting(containerEl)
      .setName(t["settings.maxWidth"])
      .setDesc(t["settings.maxWidth.desc"])
      .addText((text) => {
        text
          .setValue(String(this.plugin.settings.maxWidth))
          .onChange(async (value) => {
            const num = parseInt(value);
            if (!isNaN(num) && num > 0) {
              this.plugin.settings.maxWidth = num;
              await this.plugin.saveSettings();
            }
          });
        text.inputEl.type = "number";
        text.inputEl.setAttribute("min", "100");
        text.inputEl.setAttribute("step", "10");
      });

    new Setting(containerEl)
      .setName(t["settings.customCSS"])
      .setDesc(t["settings.customCSS.desc"])
      .addTextArea((text) => {
        text
          .setValue(this.plugin.settings.customCSS)
          .onChange(async (value) => {
            this.plugin.settings.customCSS = value;
            await this.plugin.saveSettings();
          });
        text.inputEl.rows = 5;
        text.inputEl.cols = 40;
        text.inputEl.style.fontFamily = "monospace";
        text.inputEl.style.fontSize = "12px";
      });
  }
}
