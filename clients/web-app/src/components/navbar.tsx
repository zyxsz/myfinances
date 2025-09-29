"use client";

import type { User } from "@/api/interfaces/entities/user.entity";
import { Logo } from "./logo";
import Link from "next/link";
import { useState, type ComponentProps, type ReactNode } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  LogOutIcon,
  UserCog2Icon,
} from "lucide-react";
import {
  Dropdown,
  DropdownButton,
  DropdownItems,
  DropdownSeparator,
  DropdownTrigger,
} from "./dropdown";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ProfilesSelector } from "./profiles-selector";

interface Props {
  user: User;
  profilesSelector?: ReactNode;
}

const getMaxWidth = () => {
  const pathname = usePathname();

  console.log(pathname);

  switch (pathname) {
    case "/account": {
      return "64rem";
    }
    default: {
      return "80rem ";
    }
  }
};

export const Navbar = ({ profilesSelector }: Props) => {
  const [defaultWidth] = useState(getMaxWidth());
  const maxWidth = getMaxWidth();

  useGSAP(() => {
    gsap.to(".navbarContent", {
      maxWidth,
      duration: 0.2,
      ease: "power1.inOut",
    });
  }, [maxWidth]);

  return (
    <nav className="fixed top-0 left-0 right-0 h-18 bg-app-primary border-b border-border flex items-center justify-center">
      <div
        className={cn(
          "navbarContent px-8 w-full mx-auto flex items-center gap-8 justify-between"
        )}
        style={{ maxWidth: defaultWidth }}
      >
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Logo className="w-32" />
          </Link>

          <ul>{profilesSelector}</ul>
        </div>

        <div className="flex items-center gap-6">
          <ol className="flex items-center gap-2">
            <NavLink>Dashboard</NavLink>
            <NavLink>Lançamentos</NavLink>
          </ol>

          <Dropdown>
            <DropdownTrigger>
              <div className="size-12 rounded-full bg-app-secondary flex items-center justify-center select-none cursor-pointer border-2 border-transparent hover:border-white/25 transition-colors [&[aria-expanded=true]]:border-white/25">
                JD
              </div>
            </DropdownTrigger>
            <DropdownItems anchor={{ gap: 8, to: "bottom end" }}>
              {/* <DropdownButton>
                Meu perfil <UserCog2Icon />
              </DropdownButton> */}
              <DropdownButton asChild>
                <Link href="/account">
                  Meus dados <UserCog2Icon />
                </Link>
              </DropdownButton>
              <DropdownSeparator />
              <DropdownButton>
                Sair <LogOutIcon />
              </DropdownButton>
            </DropdownItems>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({
  children,
  ...rest
}: { children: ReactNode } & ComponentProps<"button">) => {
  return (
    <li>
      <Button {...rest}>{children}</Button>
    </li>
  );
};
