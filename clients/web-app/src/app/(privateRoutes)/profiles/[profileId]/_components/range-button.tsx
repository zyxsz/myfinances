"use client";

import { Button } from "@/components/button";
import {
  Dropdown,
  DropdownButton,
  DropdownItems,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/dropdown";
import { addMonths, endOfMonth, parseISO, startOfMonth } from "date-fns";
import {
  Calendar1Icon,
  CalendarCheck2Icon,
  CalendarSearchIcon,
  ChevronDownIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const RangeButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rangeStartAt = searchParams.get("rangeStart");

  const handleSelectRange = (months: number) => {
    const date = addMonths(new Date(), months * -1);

    console.log(date.toISOString());

    const params = new URLSearchParams(searchParams.toString());
    params.set("rangeStart", startOfMonth(date).toISOString());
    params.set("rangeEnd", endOfMonth(date).toISOString());

    router.push(`${pathname}?${params.toString()}`);
  };

  const currentMonth = rangeStartAt
    ? new Date().getUTCMonth() - parseISO(rangeStartAt).getUTCMonth()
    : 0;

  const currentPeriodText = rangeStartAt
    ? (currentMonth === 0 && "Este mês") ||
      (currentMonth === 1 && "Mês passado") ||
      (currentMonth === 2 && "Mês retrasado") ||
      "Customizado"
    : "Selecione um período";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>
          {currentPeriodText} <ChevronDownIcon />
        </Button>
      </DropdownTrigger>

      <DropdownItems anchor={{ gap: 8, to: "bottom end" }}>
        <DropdownButton onClick={() => handleSelectRange(0)}>
          Este mês
          {currentMonth === 0 ? <CalendarCheck2Icon /> : <Calendar1Icon />}
        </DropdownButton>
        <DropdownButton onClick={() => handleSelectRange(1)}>
          Mês passado
          {currentMonth === 1 ? <CalendarCheck2Icon /> : <Calendar1Icon />}
        </DropdownButton>
        <DropdownButton onClick={() => handleSelectRange(2)}>
          Mês retrasado
          {currentMonth === 2 ? <CalendarCheck2Icon /> : <Calendar1Icon />}
        </DropdownButton>
        <DropdownSeparator />
        <DropdownButton>
          Customizar
          <CalendarSearchIcon />
        </DropdownButton>
      </DropdownItems>
    </Dropdown>
  );
};
