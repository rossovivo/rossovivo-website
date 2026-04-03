import { PortableText as SanityPortableText } from "@portabletext/react";
import Image from "next/image";
import type { PortableText } from "@/lib/cms-types";

type BlogPortableTextProps = {
  value: PortableText;
};

export function BlogPortableText({ value }: BlogPortableTextProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <SanityPortableText
        value={value}
        components={{
          block: {
            normal: ({ children }) => (
              <p className="text-muted-foreground leading-relaxed mb-6">
                {children}
              </p>
            ),
            h2: ({ children }) => (
              <h2 className="heading-card !text-3xl mt-12 mb-4">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="heading-card !text-2xl mt-10 mb-3">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="heading-card !text-xl mt-8 mb-2">{children}</h4>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary/40 pl-6 my-8 text-muted-foreground italic">
                {children}
              </blockquote>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                {children}
              </ul>
            ),
            number: ({ children }) => (
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
                {children}
              </ol>
            ),
          },
          listItem: {
            bullet: ({ children }) => <li>{children}</li>,
            number: ({ children }) => <li>{children}</li>,
          },
          types: {
            image: ({ value: imageValue }) => {
              const url = imageValue?.url || imageValue?.asset?.url;
              if (!url) return null;
              return (
                <figure className="my-8">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                    <Image
                      src={url}
                      alt={imageValue?.alt || ""}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 720px"
                    />
                  </div>
                  {imageValue?.caption && (
                    <figcaption className="text-center text-sm text-muted-foreground mt-3">
                      {imageValue.caption}
                    </figcaption>
                  )}
                </figure>
              );
            },
          },
          marks: {
            link: ({ children, value: markValue }) => {
              const href =
                markValue && typeof markValue.href === "string"
                  ? markValue.href
                  : "";
              const isExternal =
                href.startsWith("http://") || href.startsWith("https://");
              return (
                <a
                  href={href}
                  className="text-primary hover:underline"
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {children}
                </a>
              );
            },
          },
        }}
      />
    </div>
  );
}
