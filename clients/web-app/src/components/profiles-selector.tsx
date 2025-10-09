"use client";

import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  PlusCircleIcon,
} from "lucide-react";
import { Button } from "./button";
import {
  Dropdown,
  DropdownButton,
  DropdownItems,
  DropdownSeparator,
  DropdownTrigger,
} from "./dropdown";
import { ProfilesService } from "@/api/services/profiles.service";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const ProfilesSelector = () => {
  const { profileId } = useParams();

  const { data: profiles } = useSuspenseQuery({
    queryKey: ["profiles"],
    queryFn: () => ProfilesService.getManyProfiles(),
  });

  if (profiles.length <= 0)
    return (
      <Button asChild>
        <Link href="/profiles">Criar perfil</Link>
      </Button>
    );

  const currentProfile = profileId
    ? profiles.find((profile) => profile.id === profileId)
    : null;

  return (
    <Dropdown>
      <DropdownTrigger>
        {currentProfile ? (
          <Button>
            {currentProfile.name} <ChevronDownIcon />
          </Button>
        ) : (
          <Button>
            Selecione um perfil <ChevronDownIcon />
          </Button>
        )}
      </DropdownTrigger>

      <DropdownItems anchor={{ gap: 8, to: "bottom start" }}>
        {profiles.map((profile) => (
          <DropdownButton key={profile.id} asChild>
            <Link href={`/profiles/${profile.id}`}>
              {profile.name}
              {profile.id === profileId && <CheckIcon />}
            </Link>
          </DropdownButton>
        ))}
        <DropdownSeparator />
        <DropdownButton asChild>
          <Link href={`/profiles/create`}>
            Criar perfil
            <PlusCircleIcon />
          </Link>
        </DropdownButton>
        <DropdownButton asChild>
          <Link href={`/profiles`}>
            Outros perfis
            <ArrowRightIcon />
          </Link>
        </DropdownButton>
      </DropdownItems>
    </Dropdown>
  );
};

export const ProfilesSelectorSkeleton = () => {
  return <p>Loading...</p>;
};
