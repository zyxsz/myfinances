import { UsersService } from "@/api/services/users.service";
import { Navbar } from "@/components/navbar";
import { UserStoreProvider } from "@/stores/user.store.provider";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await UsersService.getAuthenticatedUser().catch(() => null);

  if (user === null) {
    redirect("/auth/login");
  }

  return (
    <UserStoreProvider defaultState={{ user }}>
      <Navbar user={user} />
      {children}
    </UserStoreProvider>
  );
}
