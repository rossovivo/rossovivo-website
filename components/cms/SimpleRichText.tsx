import { PortableText as SanityPortableText } from "@portabletext/react";
import type {
  PortableText,
  RichTextDocument,
  RichTextNode,
} from "@/lib/cms-types";

const renderNode = (node: RichTextNode, key: string): React.ReactNode => {
  const children = (node.content || [])
    .map((child, index) => renderNode(child, `${key}-${index}`))
    .filter(Boolean);

  switch (node.nodeType) {
    case "text":
      return node.value || "";
    case "paragraph":
      return (
        <p key={key} className="text-muted-foreground">
          {children}
        </p>
      );
    case "heading-2":
      return (
        <h2 key={key} className="heading-card">
          {children}
        </h2>
      );
    case "heading-3":
      return (
        <h3 key={key} className="heading-card text-xl">
          {children}
        </h3>
      );
    case "unordered-list":
      return (
        <ul key={key} className="list-disc pl-6 space-y-2 text-muted-foreground">
          {children}
        </ul>
      );
    case "ordered-list":
      return (
        <ol key={key} className="list-decimal pl-6 space-y-2 text-muted-foreground">
          {children}
        </ol>
      );
    case "list-item":
      return <li key={key}>{children}</li>;
    default:
      return null;
  }
};

type SimpleRichTextProps = {
  document: RichTextDocument | PortableText;
};

export function SimpleRichText({ document }: SimpleRichTextProps) {
  if (Array.isArray(document)) {
    return (
      <div className="space-y-4">
        <SanityPortableText
          value={document}
          components={{
            block: {
              normal: ({ children }) => (
                <p className="text-muted-foreground">{children}</p>
              ),
              h2: ({ children }) => <h2 className="heading-card">{children}</h2>,
              h3: ({ children }) => (
                <h3 className="heading-card text-xl">{children}</h3>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-charcoal/20 pl-4 text-muted-foreground">
                  {children}
                </blockquote>
              ),
            },
            list: {
              bullet: ({ children }) => (
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  {children}
                </ul>
              ),
              number: ({ children }) => (
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  {children}
                </ol>
              ),
            },
            listItem: {
              bullet: ({ children }) => <li>{children}</li>,
              number: ({ children }) => <li>{children}</li>,
            },
            marks: {
              link: ({ children, value }) => {
                const href =
                  value && typeof value.href === "string" ? value.href : "";
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

  return (
    <div className="space-y-4">
      {(document.content || [])
        .map((node, index) => renderNode(node, `root-${index}`))
        .filter(Boolean)}
    </div>
  );
}
