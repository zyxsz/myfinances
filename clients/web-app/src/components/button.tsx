import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "flex items-center justify-center cursor-pointer outline-none transition-colors disabled:cursor-not-allowed disabled:brightness-90 w-fit",
  {
    variants: {
      variant: {
        default:
          "border border-border text-app-primary-foreground-muted bg-app-primary hover:bg-app-secondary hover:border-white/25 [&[aria-expanded=true]]:bg-app-secondary [&[aria-expanded=true]]:border-white/25",
        link: "text-app-primary-foreground-muted hover:underline hover:text-app-primary-foreground",
      },
      size: {
        default: "gap-2 text-xs p-2 px-4 rounded-md [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
