import { ReleasesService } from "@/api/services/releases.service";
import { Button } from "@/components/button";
import { Pagination } from "@/components/pagination";
import { PaginationLimitButton } from "@/components/pagination-limit-button";
import { ReleaseIcon, ReleaseLabel } from "@/components/release-icon";
import { Text } from "@/components/text";
import { formatDate, formatMoneyValue, parsePagination } from "@/lib/utils";
import { parseISO } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Fragment } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ profileId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { profileId } = await params;
  const { page, limit } = parsePagination(await searchParams);

  const releases = await ReleasesService.getReleasesWithPagination(
    profileId,
    page,
    limit
  );

  return (
    <Fragment>
      <table className="w-full border-separate border-spacing-x-0 border-spacing-y-2">
        <thead>
          <tr className="[&_th]:text-start [&_th]:py-2 [&_th]:px-4 [&_th]:text-sm [&_th]:font-normal [&_th]:text-app-primary-foreground-muted">
            <th>Nome</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {releases.data.map((release) => (
            <tr
              key={release.id}
              className="[&_td]:text-start [&_td]:py-2 [&_td]:px-4 [&_td]:text-base [&_td]:font-normal [&_td]:text-app-primary-foreground [&_td]:bg-app-secondary [&_td]:first:rounded-tl-lg [&_td]:first:rounded-bl-lg [&_td]:last:rounded-tr-lg [&_td]:last:rounded-br-lg [&_td]:border [&_td]:border-border [&_td]:not:first:border-l-none [&_td]:not-first:border-l-0"
            >
              <td>{release.name}</td>
              <td>
                <p className="text-sm">
                  {formatMoneyValue(release.valueInCents / 100)}
                </p>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <ReleaseIcon
                    className="text-app-primary-foreground"
                    releaseType={release.type}
                  />
                  <p className="text-sm text-app-primary-foreground-muted">
                    <ReleaseLabel releaseType={release.type} />
                  </p>
                </div>
              </td>
              <td>
                <p className="text-sm">
                  {formatDate(parseISO(release.createdAt))}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Text variant="paragraphSm" color="muted">
            Mostrando
          </Text>
          <PaginationLimitButton
            limits={[2, 10, 15, 25, 30, 50, 99]}
            pagination={releases.pagination}
          />

          <Text variant="paragraphSm" color="muted">
            resultados por página.
          </Text>
        </div>

        <Pagination pagination={releases.pagination} />
      </footer>
    </Fragment>
  );
}
