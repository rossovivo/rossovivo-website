"use client";

import { useState } from "react";
import { Facebook, Linkedin, Twitter, Link2, Check } from "lucide-react";

type BlogShareButtonsProps = {
  title: string;
  slug: string;
};

const BASE_URL = "https://www.rossovivo.com";

export function BlogShareButtons({ title, slug }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const postUrl = `${BASE_URL}/blog/${slug}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(postUrl);

  const shareLinks = [
    {
      label: "Share on X",
      icon: Twitter,
      href: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: "Share on Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "Share on LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  function handleCopyLink() {
    navigator.clipboard.writeText(postUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-1">Share</span>
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
        >
          <link.icon className="w-4 h-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopyLink}
        aria-label="Copy link"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
      >
        {copied ? (
          <Check className="w-4 h-4 text-accent" />
        ) : (
          <Link2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
