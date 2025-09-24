"use client";

import type { User } from "@/api/interfaces/entities/user.entity";
import { Logo } from "./logo";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  CogIcon,
  LogOutIcon,
  UserCog2Icon,
} from "lucide-react";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownItems,
  DropdownSeparator,
  DropdownTrigger,
} from "./dropdown";
import { Button } from "./button";
import { MenuSeparator } from "@headlessui/react";

interface Props {
  user: User;
}

export const Navbar = ({ user }: Props) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-18 bg-app-primary border-b border-border flex items-center justify-center">
      <div className="px-8 w-full max-w-screen-2xl mx-auto flex items-center gap-8 justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Logo className="w-32" />
          </Link>

          <ul>
            <Dropdown>
              <DropdownTrigger>
                <Button>
                  Perfil 01 <ChevronDownIcon />
                </Button>
              </DropdownTrigger>

              <DropdownItems anchor={{ gap: 8, to: "bottom start" }}>
                <DropdownButton>
                  Perfil 01 <CheckIcon />{" "}
                </DropdownButton>
                <DropdownButton>Perfil 02 </DropdownButton>
              </DropdownItems>
            </Dropdown>
          </ul>
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
              <DropdownButton>
                Meu perfil <UserCog2Icon />
              </DropdownButton>
              <DropdownButton>
                Configurações <CogIcon />
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
