import { ReleasesService } from "@/api/services/releases.service";
import { Button } from "@/components/button";
import { ReleaseIcon, ReleaseLabel } from "@/components/release-icon";
import { Text } from "@/components/text";
import { formatDate, formatMoneyValue } from "@/lib/utils";
import { parseISO } from "date-fns";
import {
  ArrowRightIcon,
  BanknoteArrowDownIcon,
  BanknoteArrowUpIcon,
  HandCoinsIcon,
} from "lucide-react";
import { Suspense } from "react";

interface Props {
  profileId: string;
  range: {
    startAt: Date;
    endAt: Date;
  };
}

export const ProfileLastReleases = ({ profileId, range }: Props) => {
  const ReleasesTable = async () => {
    const releases = await ReleasesService.getLastReleases(
      profileId,
      range.startAt,
      range.endAt
    );

    if (releases.length <= 0)
      return (
        <div className="w-full h-80 flex flex-col items-center justify-center">
          <Text variant="header3">Nooooo :(</Text>
          <Text variant="paragraphSm" color="muted">
            Não encontramos nenhum lançamento realizado nesse período.
          </Text>
        </div>
      );

    return (
      <div className="space-y-2">
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
            {releases.map((release) => (
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

            {/* <tr className="[&_td]:text-start [&_td]:py-2 [&_td]:px-4 [&_td]:text-base [&_td]:font-normal [&_td]:text-app-primary-foreground [&_td]:bg-app-secondary [&_td]:first:rounded-tl-lg [&_td]:first:rounded-bl-lg [&_td]:last:rounded-tr-lg [&_td]:last:rounded-br-lg [&_td]:border [&_td]:border-border [&_td]:not:first:border-l-none [&_td]:not-first:border-l-0">
              <td>Hashdex Bitcoin FIC FIM</td>
              <td>
                <p className="text-sm">R$ 174,00</p>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <HandCoinsIcon className="size-6 text-app-primary-foreground/50 [&_circle]:text-app-main" />
                  <p className="text-sm text-app-primary-foreground-muted">
                    Investimento
                  </p>
                </div>
              </td>
              <td>
                <p className="text-sm">07/10/2025 10:31</p>
              </td>
            </tr>
            <tr className="[&_td]:text-start [&_td]:py-2 [&_td]:px-4 [&_td]:text-base [&_td]:font-normal [&_td]:text-app-primary-foreground [&_td]:bg-app-secondary [&_td]:first:rounded-tl-lg [&_td]:first:rounded-bl-lg [&_td]:last:rounded-tr-lg [&_td]:last:rounded-br-lg [&_td]:border [&_td]:border-border [&_td]:not:first:border-l-none [&_td]:not-first:border-l-0">
              <td>Filhos</td>
              <td>
                <p className="text-sm">R$ 226,01</p>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <BanknoteArrowDownIcon className="size-6 text-app-primary-foreground/50 [&_path:nth-child(4)]:text-red-500 [&_path:nth-child(2)]:text-red-500" />
                  <p className="text-sm text-app-primary-foreground-muted">
                    Gasto
                  </p>
                </div>
              </td>
              <td>
                <p className="text-sm">05/10/2025 10:31</p>
              </td>
            </tr>
            <tr className="[&_td]:text-start [&_td]:py-2 [&_td]:px-4 [&_td]:text-base [&_td]:font-normal [&_td]:text-app-primary-foreground [&_td]:bg-app-secondary [&_td]:first:rounded-tl-lg [&_td]:first:rounded-bl-lg [&_td]:last:rounded-tr-lg [&_td]:last:rounded-br-lg [&_td]:border [&_td]:border-border [&_td]:not:first:border-l-none [&_td]:not-first:border-l-0">
              <td>IFood</td>
              <td>
                <p className="text-sm">R$ 23,99</p>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <BanknoteArrowDownIcon className="size-6 text-app-primary-foreground/50 [&_path:nth-child(4)]:text-red-500 [&_path:nth-child(2)]:text-red-500" />
                  <p className="text-sm text-app-primary-foreground-muted">
                    Gasto
                  </p>
                </div>
              </td>
              <td>
                <p className="text-sm">02/10/2025 14:55</p>
              </td>
            </tr>
            <tr className="[&_td]:text-start [&_td]:py-2 [&_td]:px-4 [&_td]:text-base [&_td]:font-normal [&_td]:text-app-primary-foreground [&_td]:bg-app-secondary [&_td]:first:rounded-tl-lg [&_td]:first:rounded-bl-lg [&_td]:last:rounded-tr-lg [&_td]:last:rounded-br-lg [&_td]:border [&_td]:border-border [&_td]:not:first:border-l-none [&_td]:not-first:border-l-0">
              <td>Freelance</td>
              <td>
                <p className="text-sm">R$ 424,00</p>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <BanknoteArrowUpIcon className="size-6 text-app-primary-foreground/50 [&_path:nth-child(4)]:text-green-500 [&_path:nth-child(3)]:text-green-500" />
                  <p className="text-sm text-app-primary-foreground-muted">
                    Renda
                  </p>
                </div>
              </td>
              <td>
                <p className="text-sm">01/10/2025 20:13</p>
              </td>
            </tr> */}
          </tbody>
        </table>
        <footer className="px-[calc(1rem+2px)] flex items-center justify-between gap-4">
          <Text className="select-none" variant="paragraphSm" color="muted">
            Últimos lançamentos
          </Text>
          <Button variant="link" className="px-0">
            Ver todos <ArrowRightIcon />
          </Button>
        </footer>
      </div>
    );
  };

  return (
    <div>
      <Suspense fallback={<p>Loading releases...</p>}>
        <ReleasesTable />
      </Suspense>
    </div>
  );
};
