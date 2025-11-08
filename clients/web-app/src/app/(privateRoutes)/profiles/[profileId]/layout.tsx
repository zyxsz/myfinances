import { ProfilesService } from "@/api/services/profiles.service";
import type { ReactNode } from "react";
import { ProfileHeader } from "./_components/profile-header";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ profileId: string }>;
  children: ReactNode;
}) {
  const { profileId } = await params;
  const profile = await ProfilesService.getProfile(profileId);

  return (
    <div className="w-full max-w-screen-xl mx-auto p-8 space-y-4">
      <ProfileHeader profile={profile} />
      {children}
    </div>
  );
}
