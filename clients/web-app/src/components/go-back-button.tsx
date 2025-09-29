import type { ComponentProps } from "react";
import { Button } from "./button";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<typeof Button> {
  href: string;
}

export const GoBackButton = ({ href, className, ...rest }: Props) => {
  return (
    <Button variant="link" className={cn("px-0", className)} {...rest} asChild>
      <Link href={href}>
        <ArrowLeftIcon /> Voltar
      </Link>
    </Button>
  );
};
