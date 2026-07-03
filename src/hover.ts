import { App, TFile, TFolder } from "obsidian";
import { type HoverInfoSettings } from "./settings";
import { getFolderStats, getFileSummary } from "./summary";
import { type LocaleDict, getLocale } from "./i18n";

/**
 * Manages hover tooltip lifecycle: attachment, rendering, positioning, removal.
 */
export class HoverManager {
  private app: App;
  private settings: HoverInfoSettings;
  private tooltip: HTMLElement | null = null;
  private hoverTimer: number | null = null;
  private currentTarget: HTMLElement | null = null;
  private observer: MutationObserver | null = null;
  private boundHandler: (e: MouseEvent) => void;

  constructor(app: App, settings: HoverInfoSettings) {
    this.app = app;
    this.settings = settings;
    this.boundHandler = this.handleMouseOver.bind(this);
  }

  /** Get current locale dictionary based on plugin language setting. */
  private t(): LocaleDict {
    return getLocale(this.settings.language);
  }

  /**
   * Attach hover listeners to the file explorer.
   * Uses event delegation on document body, filtered by nav selectors.
   */
  attach(): void {
    document.body.addEventListener("mouseover", this.boundHandler, true);
    document.body.addEventListener(
      "mouseout",
      this.handleMouseOut.bind(this),
      true
    );
  }

  /**
   * Remove all listeners and clean up DOM.
   */
  detach(): void {
    document.body.removeEventListener("mouseover", this.boundHandler, true);
    document.body.removeEventListener(
      "mouseout",
      this.handleMouseOut.bind(this),
      true
    );
    this.removeTooltip();
    if (this.hoverTimer !== null) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  /**
   * Update settings reference (called after settings change).
   */
  updateSettings(settings: HoverInfoSettings): void {
    this.settings = settings;
  }

  private handleMouseOver(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Check if hovering over a folder title or file title
    const folderTitle = target.closest(".nav-folder-title") as HTMLElement | null;
    const fileTitle = target.closest(".nav-file-title") as HTMLElement | null;

    const el = folderTitle || fileTitle;
    if (!el) {
      this.cancelHover();
      return;
    }

    // Don't re-trigger on same element
    if (el === this.currentTarget) return;

    this.currentTarget = el;
    this.removeTooltip();

    // Debounce
    if (this.hoverTimer !== null) clearTimeout(this.hoverTimer);
    this.hoverTimer = window.setTimeout(() => {
      if (el === this.currentTarget) {
        if (folderTitle) {
          this.showFolderTooltip(event, folderTitle);
        } else if (fileTitle) {
          this.showFileTooltip(event, fileTitle);
        }
      }
    }, this.settings.tooltipDelay);
  }

  private handleMouseOut(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const folderTitle = target.closest(".nav-folder-title") as HTMLElement | null;
    const fileTitle = target.closest(".nav-file-title") as HTMLElement | null;

    if (folderTitle || fileTitle) {
      // Check if we're moving to the tooltip itself
      const related = event.relatedTarget as HTMLElement | null;
      if (related && related.closest(".hover-info-tooltip")) return;

      this.cancelHover();
      this.removeTooltip();
    }
  }

  private cancelHover(): void {
    this.currentTarget = null;
    if (this.hoverTimer !== null) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }
  }

  private showFolderTooltip(event: MouseEvent, el: HTMLElement): void {
    if (!this.settings.showFolderStats) return;

    const dataPath = el.getAttribute("data-path");
    if (!dataPath) return;

    const folder = this.app.vault.getAbstractFileByPath(dataPath);
    if (!(folder instanceof TFolder)) return;

    const stats = getFolderStats(folder, this.settings.showMarkdownOnly);
    const t = this.t();
    const lines: string[] = [];

    if (this.settings.showMarkdownOnly) {
      // Chinese: "5 个 Markdown 文件" — number counts don't change for plural
      lines.push(`${stats.mdCount} ${t["tooltip.markdownFile"]}`);
    } else {
      lines.push(`${stats.fileCount} ${t["tooltip.file"]}`);
      if (stats.mdCount > 0 && stats.mdCount !== stats.fileCount) {
        lines.push(`${stats.mdCount} ${t["tooltip.markdown"]}`);
      }
    }

    if (this.settings.showSubfolderCount && stats.folderCount > 0) {
      lines.push(`${stats.folderCount} ${t["tooltip.subfolder"]}`);
    }

    this.renderTooltip(event, lines.join(" · "));
  }

  private async showFileTooltip(
    event: MouseEvent,
    el: HTMLElement
  ): Promise<void> {
    if (!this.settings.showFileSummary) return;

    const dataPath = el.getAttribute("data-path");
    if (!dataPath) return;

    const file = this.app.vault.getAbstractFileByPath(dataPath);
    if (!(file instanceof TFile)) return;

    const summary = await getFileSummary(this.app, file, {
      showTags: this.settings.showTags,
      showWordCount: this.settings.showWordCount,
      maxSummaryLength: this.settings.maxSummaryLength,
    });

    const t = this.t();
    const lines: string[] = [];

    // First heading as title
    if (this.settings.showFirstHeading && summary.firstHeading) {
      lines.push(`**${escapeHtml(summary.firstHeading)}**`);
    }

    // Description
    if (summary.description) {
      lines.push(escapeHtml(summary.description));
    }

    // Tags
    if (this.settings.showTags && summary.tags.length > 0) {
      lines.push(
        summary.tags
          .map((tag) => `<span class="hover-info-tag">${escapeHtml(tag)}</span>`)
          .join(" ")
      );
    }

    // Meta info line
    const meta: string[] = [];

    if (this.settings.showWordCount && summary.wordCount !== null) {
      meta.push(`${summary.wordCount} ${t["tooltip.words"]}`);
    }

    if (this.settings.showCreatedDate && summary.created) {
      meta.push(`${t["tooltip.created"]}: ${formatDate(summary.created, t)}`);
    }

    if (this.settings.showModifiedDate && summary.modified) {
      meta.push(
        `${t["tooltip.modified"]}: ${formatDate(summary.modified, t)}`
      );
    }

    if (meta.length > 0) {
      lines.push(`<span class="hover-info-meta">${meta.join(" · ")}</span>`);
    }

    if (lines.length > 0) {
      this.renderTooltip(event, lines.join("<br>"));
    }
  }

  private renderTooltip(event: MouseEvent, html: string): void {
    this.removeTooltip();

    const tooltip = document.body.createDiv("hover-info-tooltip");
    tooltip.innerHTML = html;

    // Apply custom CSS from settings
    if (this.settings.customCSS) {
      const styleEl = tooltip.createEl("style");
      styleEl.textContent = this.settings.customCSS;
    }

    // Position near cursor
    this.positionTooltip(tooltip, event.clientX, event.clientY);

    document.body.appendChild(tooltip);
    this.tooltip = tooltip;

    // Listen for mousemove to update position
    const moveHandler = (e: MouseEvent) => {
      this.positionTooltip(tooltip, e.clientX, e.clientY);
    };
    tooltip.addEventListener("mousemove", moveHandler);

    // Remove on mouse leave from tooltip
    tooltip.addEventListener("mouseleave", () => {
      this.removeTooltip();
    });
  }

  private positionTooltip(
    tooltip: HTMLElement,
    mouseX: number,
    mouseY: number
  ): void {
    const offset = 12;
    const maxWidth = this.settings.maxWidth;
    tooltip.style.maxWidth = `${maxWidth}px`;

    // Get viewport dimensions
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Measure tooltip (it must be in the DOM)
    const rect = tooltip.getBoundingClientRect();
    const tw = rect.width || maxWidth;
    const th = rect.height || 100;

    let left = mouseX + offset;
    let top = mouseY + offset;

    // Flip horizontally if it would overflow
    if (left + tw > vw - 10) {
      left = mouseX - tw - offset;
      if (left < 10) left = 10;
    }

    // Flip vertically if it would overflow
    if (top + th > vh - 10) {
      top = mouseY - th - offset;
      if (top < 10) top = 10;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  private removeTooltip(): void {
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }
  }
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(timestamp: number, t: LocaleDict): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return (
      t["date.today"] +
      " " +
      date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  } else if (diffDays === 1) {
    return (
      t["date.yesterday"] +
      " " +
      date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  } else if (diffDays < 7) {
    return `${diffDays} ${t["date.daysAgo"]}`;
  } else {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}
