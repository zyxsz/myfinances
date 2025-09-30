import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;

  redirect(`/profiles/${profileId}/dashboard`);
}
