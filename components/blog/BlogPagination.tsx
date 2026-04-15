import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type BlogPaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

function buildPageHref(basePath: string, page: number) {
  if (page <= 1) return basePath;
  const separator = basePath.includes("?") ? "&" : "?";
  return `${basePath}${separator}page=${page}`;
}

function getVisiblePages(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (currentPage > 3) pages.push("ellipsis");

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) pages.push("ellipsis");

  pages.push(totalPages);

  return pages;
}

export function BlogPagination({
  currentPage,
  totalPages,
  basePath,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <Link href={buildPageHref(basePath, currentPage - 1)} passHref legacyBehavior>
              <PaginationPrevious />
            </Link>
          </PaginationItem>
        )}

        {visiblePages.map((page, index) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <Link href={buildPageHref(basePath, page)} passHref legacyBehavior>
                <PaginationLink isActive={page === currentPage}>
                  {page}
                </PaginationLink>
              </Link>
            </PaginationItem>
          ),
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <Link href={buildPageHref(basePath, currentPage + 1)} passHref legacyBehavior>
              <PaginationNext />
            </Link>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
