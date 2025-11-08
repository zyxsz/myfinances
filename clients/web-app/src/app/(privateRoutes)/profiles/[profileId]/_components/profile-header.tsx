"use client";
import type { Profile } from "@/api/interfaces/entities/profile.entity";
import { Text } from "@/components/text";
import { Fragment, type ComponentProps } from "react";
import { RangeButton } from "./range-button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  profile: Profile;
}

export const ProfileHeader = ({ profile }: Props) => {
  return (
    <Fragment>
      <header className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <Text variant="header3">{profile.name}</Text>
          <span className="text-xxs bg-white/10 px-2 py-0.5 rounded-full text-white select-none">
            {profile.type}
          </span>
        </div>
        <div>
          <RangeButton />
        </div>
      </header>
      <div className="flex items-center gap-2">
        <ProfileLink href={`/profiles/${profile.id}/dashboard`}>
          Dashboard
        </ProfileLink>

        <ProfileLink href={`/profiles/${profile.id}/releases`}>
          Lançamentos
        </ProfileLink>

        <button className="text-sm py-2 px-4 rounded-md border border-border hover:bg-app-secondary transition-colors cursor-pointer">
          Investimentos
        </button>
        <button className="text-sm py-2 px-4 rounded-md border border-border hover:bg-app-secondary transition-colors cursor-pointer">
          Configurações
        </button>
      </div>
    </Fragment>
  );
};

const ProfileLink = ({ href, ...rest }: ComponentProps<typeof Link>) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <Link
      href={`${href}?${searchParams.toString()}`}
      {...rest}
      className={cn(
        "text-sm py-2 px-4 rounded-md border border-border hover:bg-app-secondary transition-colors cursor-pointer",
        pathname === href && "bg-app-secondary cursor-default"
      )}
    />
  );
};
