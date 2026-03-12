import type { RichTextDocument, RichTextNode } from "@/lib/cms-types";

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
  document: RichTextDocument;
};

export function SimpleRichText({ document }: SimpleRichTextProps) {
  return (
    <div className="space-y-4">
      {(document.content || [])
        .map((node, index) => renderNode(node, `root-${index}`))
        .filter(Boolean)}
    </div>
  );
}
