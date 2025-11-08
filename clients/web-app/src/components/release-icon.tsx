import type { ReleaseType } from "@/api/interfaces/entities/release.entity";
import { cn } from "@/lib/utils";
import {
  BanknoteArrowDownIcon,
  BanknoteArrowUpIcon,
  HandCoinsIcon,
} from "lucide-react";
import type { ComponentProps, JSX, ReactNode } from "react";

interface Props extends ComponentProps<"svg"> {
  releaseType: ReleaseType;
}

const releaseIcons: Record<
  ReleaseType,
  ({
    className,
    ...rest
  }: ComponentProps<typeof BanknoteArrowUpIcon>) => JSX.Element
> = {
  INCOME: ({
    className,
    ...rest
  }: ComponentProps<typeof BanknoteArrowUpIcon>) => (
    <BanknoteArrowUpIcon
      className={cn(
        "size-6 text-app-primary-foreground/50 [&_path:nth-child(4)]:text-green-500 [&_path:nth-child(3)]:text-green-500",
        className
      )}
      {...rest}
    />
  ),
  INVESTMENT: ({
    className,
    ...rest
  }: ComponentProps<typeof HandCoinsIcon>) => (
    <HandCoinsIcon
      className={cn(
        "size-6 text-app-primary-foreground/50 [&_circle]:text-app-main",
        className
      )}
      {...rest}
    />
  ),
  OUTCOME: ({
    className,
    ...rest
  }: ComponentProps<typeof BanknoteArrowDownIcon>) => (
    <BanknoteArrowDownIcon
      className={cn(
        "size-6 text-app-primary-foreground/50 [&_path:nth-child(4)]:text-red-500 [&_path:nth-child(2)]:text-red-500",
        className
      )}
      {...rest}
    />
  ),
};

export const ReleaseIcon = ({ releaseType, ...rest }: Props) => {
  const icon = releaseIcons[releaseType];

  return icon(rest);
};

const releaseLabel: Record<ReleaseType, ReactNode> = {
  INCOME: "Renda",
  INVESTMENT: "Investimento",
  OUTCOME: "Gasto",
};

export const ReleaseLabel = ({ releaseType }: { releaseType: ReleaseType }) => {
  return releaseLabel[releaseType];
};
