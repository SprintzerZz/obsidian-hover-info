import { App, TFile, TFolder } from "obsidian";

export interface FolderStats {
  fileCount: number;
  mdCount: number;
  folderCount: number;
}

export interface FileSummary {
  description: string | null;
  tags: string[];
  wordCount: number | null;
  created: number | null;
  modified: number | null;
  size: number;
  firstHeading: string | null;
}

/**
 * Recursively count files and subfolders within a folder.
 */
export function getFolderStats(folder: TFolder, markdownOnly: boolean): FolderStats {
  let fileCount = 0;
  let mdCount = 0;
  let folderCount = 0;

  for (const child of folder.children) {
    if (child instanceof TFolder) {
      folderCount++;
      const sub = getFolderStats(child, markdownOnly);
      fileCount += sub.fileCount;
      mdCount += sub.mdCount;
      folderCount += sub.folderCount;
    } else if (child instanceof TFile) {
      fileCount++;
      if (child.extension === "md") {
        mdCount++;
      }
    }
  }

  return { fileCount, mdCount, folderCount };
}

/**
 * Extract a human-readable summary for a file from cached metadata.
 * Falls back to reading file content only when word count is needed.
 */
export async function getFileSummary(
  app: App,
  file: TFile,
  options: {
    showTags: boolean;
    showWordCount: boolean;
    maxSummaryLength: number;
  }
): Promise<FileSummary> {
  const cache = app.metadataCache.getFileCache(file);

  // Description from frontmatter
  let description: string | null = null;
  if (cache?.frontmatter) {
    description =
      cache.frontmatter["description"] ||
      cache.frontmatter["summary"] ||
      cache.frontmatter["desc"] ||
      null;
    if (description && typeof description !== "string") {
      description = String(description);
    }
    if (description && description.length > options.maxSummaryLength) {
      description = description.slice(0, options.maxSummaryLength) + "…";
    }
  }

  // Tags
  const tags: string[] = [];
  if (options.showTags) {
    // Frontmatter tags
    if (cache?.frontmatter?.tags) {
      const ftags = cache.frontmatter.tags;
      if (Array.isArray(ftags)) {
        for (const t of ftags) {
          tags.push(typeof t === "string" ? t : String(t));
        }
      } else if (typeof ftags === "string") {
        tags.push(ftags);
      }
    }
    // Inline tags from cache
    if (cache?.tags) {
      for (const t of cache.tags) {
        const tag = t.tag.startsWith("#") ? t.tag : "#" + t.tag;
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      }
    }
  }

  // First heading
  const firstHeading =
    cache?.headings && cache.headings.length > 0
      ? cache.headings[0].heading
      : null;

  // Word count (requires reading file content)
  let wordCount: number | null = null;
  if (options.showWordCount) {
    try {
      const content = await app.vault.cachedRead(file);
      wordCount = content.split(/\s+/).filter((w) => w.length > 0).length;
    } catch {
      wordCount = null;
    }
  }

  return {
    description,
    tags,
    wordCount,
    created: file.stat.ctime,
    modified: file.stat.mtime,
    size: file.stat.size,
    firstHeading,
  };
}
