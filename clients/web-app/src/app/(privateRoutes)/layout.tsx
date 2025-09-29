import { UsersService } from "@/api/services/users.service";
import { Navbar } from "@/components/navbar";
import {
  ProfilesSelector,
  ProfilesSelectorSkeleton,
} from "@/components/profiles-selector";
import { UserStoreProvider } from "@/stores/user.store.provider";
import { redirect } from "next/navigation";
import { Suspense, type ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ profileId?: string }>;
}) {
  const { profileId } = await params;
  const user = await UsersService.getAuthenticatedUser().catch(() => null);

  if (user === null) {
    redirect("/auth/login");
  }

  return (
    <UserStoreProvider defaultState={{ user }}>
      <Navbar
        user={user}
        profilesSelector={
          <Suspense fallback={<ProfilesSelectorSkeleton />}>
            <ProfilesSelector currentProfileId={profileId} />
          </Suspense>
        }
      />
      <div className="pt-18">{children}</div>
    </UserStoreProvider>
  );
}
