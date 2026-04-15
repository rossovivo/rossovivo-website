import type { PortableText } from "@/lib/cms-types";

const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(content: PortableText): number {
  let wordCount = 0;

  for (const block of content) {
    if (block._type !== "block" || !Array.isArray(block.children)) continue;
    for (const child of block.children) {
      if (child._type === "span" && typeof child.text === "string") {
        wordCount += child.text.split(/\s+/).filter(Boolean).length;
      }
    }
  }

  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
