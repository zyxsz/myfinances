"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./button";
import type { PaginationResult } from "@/api/interfaces/dto/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  pagination: PaginationResult<any>["pagination"];
}

export const Pagination = ({ pagination }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const hasBack = pagination.currentPage > 1;
  const hasMore = pagination.currentPage < pagination.totalPages;

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="link"
        disabled={!hasBack}
        onClick={() => handleChangePage(pagination.currentPage - 1)}
      >
        <ChevronLeftIcon />
        Voltar
      </Button>

      {hasBack && (
        <Button
          variant="link"
          onClick={() => handleChangePage(pagination.currentPage - 1)}
        >
          {pagination.currentPage - 1}
        </Button>
      )}
      <Button variant="secondary" disabled>
        {pagination.currentPage}
      </Button>
      {hasMore && (
        <Button
          variant="link"
          onClick={() => handleChangePage(pagination.currentPage + 1)}
        >
          {pagination.currentPage + 1}
        </Button>
      )}

      <Button
        variant="link"
        disabled={!hasMore}
        onClick={() => handleChangePage(pagination.currentPage + 1)}
      >
        Próxima
        <ChevronRightIcon />
      </Button>
    </div>
  );
};
