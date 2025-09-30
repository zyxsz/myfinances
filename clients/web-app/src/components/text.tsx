import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const textVariants = cva("", {
  variants: {
    variant: {
      header1: "text-4xl font-black",
      header2: "text-3xl font-black",
      header3: "text-xl font-bold",
      header4: "text-lg font-bold",
      paragraph: "text-base font-normal",
      paragraphSm: "text-sm font-normal",
      paragraphXs: "text-xs font-normal",
    },
    color: {
      default: "text-app-primary-foreground",
      muted:
        "text-app-primary-foreground-muted [&_strong]:text-app-primary-foreground",
      error: "text-app-error",
    },
  },
});

export const Text = ({
  className,
  variant,
  color,
  asChild = false,
  ...props
}: React.ComponentProps<"h1"> &
  VariantProps<typeof textVariants> & {
    asChild?: boolean;
  }) => {
  const defaultVariant = getComp(variant);
  const Comp = asChild ? Slot : defaultVariant;

  return (
    <Comp
      data-slot={defaultVariant}
      className={cn(textVariants({ variant, color, className }))}
      {...props}
    />
  );
};

const getComp = (variant: VariantProps<typeof textVariants>["variant"]) => {
  switch (variant) {
    case "header1": {
      return "h1";
    }
    case "header2": {
      return "h2";
    }
    case "header3": {
      return "h3";
    }
    case "header4": {
      return "h4";
    }
    case "paragraph": {
      return "p";
    }
    case "paragraphSm": {
      return "p";
    }
    case "paragraphXs": {
      return "p";
    }

    default: {
      return "p";
    }
  }
};
