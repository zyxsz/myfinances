import { ArrowRightIcon, CheckIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "./button";
import {
  Dropdown,
  DropdownButton,
  DropdownItems,
  DropdownTrigger,
} from "./dropdown";
import { ProfilesService } from "@/api/services/profiles.service";
import Link from "next/link";

interface Props {
  currentProfileId?: string;
}

export const ProfilesSelector = async ({ currentProfileId }: Props) => {
  const profiles = await ProfilesService.getManyProfiles();

  console.log(currentProfileId);

  if (profiles.length <= 0)
    return (
      <Button asChild>
        <Link href="/profiles">Meus perfis</Link>
      </Button>
    );

  const currentProfile = currentProfileId
    ? profiles.find((profile) => profile.id === currentProfileId)
    : null;

  return (
    <Dropdown>
      <DropdownTrigger>
        {currentProfile ? (
          <Button>
            {currentProfile.name} <ChevronDownIcon />
          </Button>
        ) : (
          <Button asChild>
            <Link href="/profiles">Meus perfis</Link>
          </Button>
        )}
      </DropdownTrigger>

      <DropdownItems anchor={{ gap: 8, to: "bottom start" }}>
        {profiles.map((profile) => (
          <DropdownButton key={profile.id} asChild>
            <Link href={`/profiles/${profile.id}`}>
              {profile.name}
              {profile.id === currentProfileId && <CheckIcon />}
            </Link>
          </DropdownButton>
        ))}
      </DropdownItems>
    </Dropdown>
  );
};

export const ProfilesSelectorSkeleton = () => {
  return <p>Loading...</p>;
};
