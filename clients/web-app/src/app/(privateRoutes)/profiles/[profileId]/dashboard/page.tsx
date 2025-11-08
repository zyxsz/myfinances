import { ProfilesService } from "@/api/services/profiles.service";
import { Text } from "@/components/text";

import Link from "next/link";
import { ProfileMetricCards } from "../_components/profile-metric-cards";
import { parseRange } from "@/lib/utils";
import { RangeButton } from "../_components/range-button";
import { ProfileLastReleases } from "../_components/profile-last-releases";
import { Fragment } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ profileId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { profileId } = await params;
  const range = parseRange(await searchParams);

  return (
    <Fragment>
      <ProfileMetricCards profileId={profileId} range={range} />
      <ProfileLastReleases profileId={profileId} range={range} />
    </Fragment>
  );
}
