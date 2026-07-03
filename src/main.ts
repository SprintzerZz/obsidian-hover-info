import { Plugin } from "obsidian";
import {
  DEFAULT_SETTINGS,
  HoverInfoSettingTab,
  type HoverInfoSettings,
} from "./settings";
import { HoverManager } from "./hover";

export default class HoverInfoPlugin extends Plugin {
  settings: HoverInfoSettings;
  private hoverManager: HoverManager | null = null;

  async onload(): Promise<void> {
    await this.loadSettings();

    // Initialize hover manager
    this.hoverManager = new HoverManager(this.app, this.settings);
    this.hoverManager.attach();

    // Register settings tab
    this.addSettingTab(new HoverInfoSettingTab(this.app, this));
  }

  onunload(): void {
    if (this.hoverManager) {
      this.hoverManager.detach();
      this.hoverManager = null;
    }
  }

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
    // Update the hover manager with new settings
    if (this.hoverManager) {
      this.hoverManager.updateSettings(this.settings);
    }
  }
}
