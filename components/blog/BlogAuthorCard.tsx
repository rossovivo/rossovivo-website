import Image from "next/image";
import type { BlogAuthor } from "@/lib/cms-types";

type BlogAuthorCardProps = {
  author: BlogAuthor;
};

export function BlogAuthorCard({ author }: BlogAuthorCardProps) {
  return (
    <div className="card-warm flex flex-col sm:flex-row items-center sm:items-start gap-5">
      {author.avatarUrl && (
        <Image
          src={author.avatarUrl}
          alt={author.name}
          width={80}
          height={80}
          className="rounded-full object-cover shrink-0"
        />
      )}
      <div className="text-center sm:text-left">
        <p className="text-sm text-muted-foreground mb-1">Written by</p>
        <p className="heading-card !text-xl mb-1">{author.name}</p>
        {author.role && (
          <p className="text-sm text-primary font-medium mb-2">
            {author.role}
          </p>
        )}
        {author.bio && (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {author.bio}
          </p>
        )}
      </div>
    </div>
  );
}
