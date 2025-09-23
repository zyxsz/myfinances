import { UsersService } from "@/api/services/users.service";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await UsersService.getAuthenticatedUser().catch(() => null);

  if (user !== null) {
    redirect("/dashboard");
  }

  return children;
}
