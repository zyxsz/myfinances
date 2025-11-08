"use client";

import { cn } from "@/lib/utils";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import { Slot } from "@radix-ui/react-slot";
import { Fragment, type ComponentProps, type ReactNode } from "react";

interface Props {
  id: string;

  positionAnchor: string;
  children: ReactNode;
}

export const Dropdown = (props: ComponentProps<typeof Menu>) => {
  return <Menu {...props} />;
};

export const DropdownTrigger = (props: ComponentProps<typeof MenuButton>) => {
  return <MenuButton {...props} as={"span"} />;
};

export const DropdownItems = ({
  className,
  ...props
}: ComponentProps<typeof MenuItems>) => {
  return (
    <MenuItems
      anchor={{ gap: 8 }}
      className={cn(
        "flex flex-col min-w-42 bg-app-secondary border border-border p-1 rounded-md outline-0",
        className,
      )}
      {...props}
    />
  );
};

export const DropdownItem = (props: ComponentProps<typeof MenuItem>) => {
  return <MenuItem {...props} />;
};

interface DropdownButtonProps extends ComponentProps<"button"> {}

export const DropdownButton = ({
  children,
  asChild,
  className,
  ...rest
}: { asChild?: boolean } & DropdownButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <MenuItem>
      <Comp
        data-slot="button"
        className={cn(
          "p-2 flex-1 flex items-center justify-between text-xs text-app-primary-foreground-muted hover:text-app-primary-foreground cursor-pointer hover:bg-app-secondary-card rounded-md transition-colors [&_svg]:size-4",
          className,
        )}
        {...rest}
      >
        {children}
      </Comp>
    </MenuItem>
  );
};

export const DropdownSeparator = (
  props: ComponentProps<typeof MenuSeparator>,
) => {
  return <MenuSeparator className="my-1 h-px bg-white/10" {...props} />;
};
