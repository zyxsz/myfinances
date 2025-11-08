"use client";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./button";
import type { PaginationResult } from "@/api/interfaces/dto/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Dropdown,
  DropdownButton,
  DropdownItems,
  DropdownTrigger,
} from "./dropdown";
import { cn } from "@/lib/utils";

interface Props {
  pagination: PaginationResult<any>["pagination"];
  limits: number[];
}

export const PaginationLimitButton = ({ pagination, limits }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChangeLimit = (limit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", limit.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="px-2 py-1">{pagination.limitPerPage}</Button>
      </DropdownTrigger>

      <DropdownItems
        className="min-w-0 items-center"
        anchor={{ gap: 8, to: "bottom" }}
      >
        {limits.map((limit, key) => (
          <DropdownButton
            className={cn(
              "w-fit text-center",
              pagination.limitPerPage === limit && "border-border border"
            )}
            key={key}
            onClick={() => handleChangeLimit(limit)}
          >
            {limit}
          </DropdownButton>
        ))}
      </DropdownItems>
    </Dropdown>
  );
};
