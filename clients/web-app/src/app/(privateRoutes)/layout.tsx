import { UsersService } from "@/api/services/users.service";
import { Navbar } from "@/components/navbar";
import {
  ProfilesSelector,
  ProfilesSelectorSkeleton,
} from "@/components/profiles-selector";
import { UserStoreProvider } from "@/stores/user.store.provider";
import { redirect } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { Providers } from "./providers";

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await UsersService.getAuthenticatedUser().catch(() => null);

  if (user === null) {
    redirect("/auth/login");
  }

  return (
    <Providers>
      <UserStoreProvider defaultState={{ user }}>
        <Navbar
          user={user}
          profilesSelector={
            <Suspense fallback={<ProfilesSelectorSkeleton />}>
              <ProfilesSelector />
            </Suspense>
          }
        />
        <div className="pt-18">{children}</div>
      </UserStoreProvider>
    </Providers>
  );
}
