"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type SocialPost = {
  id: string | number;
  image: string;
  caption: string;
  type?: string;
  link?: string;
  timestamp?: string;
};

const REQUIRED_POSTS = 6;
const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com/rossovivopizza/";

const getDisplayPosts = (incoming: SocialPost[]) => {
  return incoming.filter((item) => item?.image).slice(0, REQUIRED_POSTS);
};

type SocialProofProps = {
  instagramUrl?: string;
  instagramHandle?: string;
};

export function SocialProof({
  instagramUrl = DEFAULT_INSTAGRAM_URL,
  instagramHandle = "@rossovivo",
}: SocialProofProps) {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadInstagram = async () => {
      try {
        const response = await fetch("/api/instagram");
        const data = await response.json();
        if (!isMounted) return;

        const curated = Array.isArray(data?.items)
          ? (data.items as SocialPost[])
          : [];
        setPosts(getDisplayPosts(curated));
      } catch (error) {
        if (!isMounted) return;
        setPosts([]);
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    loadInstagram();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="section-padding bg-cream paper-texture">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-4 text-charcoal">
            <Instagram className="h-7 w-7 text-primary" />
            <span className="font-display text-2xl">{instagramHandle}</span>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {posts.length > 0
            ? posts.map((post, index) => (
                <motion.a
                  key={`${post.id}-${index}`}
                  href={post.link || instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open Instagram post ${index + 1}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="block overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={post.image}
                      alt={post.caption}
                      className="h-full w-full object-cover"
                    />
                    {post.type === "VIDEO" ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm">
                          <Play className="h-6 w-6 fill-white text-white" />
                        </div>
                      </div>
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-cream">
                      <p className="truncate font-display text-lg">
                        {post.caption}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))
            : Array.from({ length: REQUIRED_POSTS }).map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <div
                    className={`aspect-[4/3] bg-stone-200 ${
                      isLoading ? "animate-pulse" : ""
                    }`}
                  />
                </div>
              ))}
        </div>

        {!isLoading && posts.length === 0 ? (
          <p className="mt-5 text-center text-sm text-charcoal/70">
            Latest Instagram posts are temporarily unavailable.
          </p>
        ) : null}

        <div className="mt-10 flex justify-center">
          <Button asChild variant="cta" size="lg" className="gap-2">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Rossovivo on Instagram"
            >
              <Instagram className="h-5 w-5" />
              Follow us on Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
