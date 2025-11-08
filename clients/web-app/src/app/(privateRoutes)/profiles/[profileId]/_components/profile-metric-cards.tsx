import type { ReleasePeriod } from "@/api/interfaces/entities/release.entity";
import { ReleasesService } from "@/api/services/releases.service";
import { ReleaseIcon } from "@/components/release-icon";
import { Text } from "@/components/text";
import { formatMoneyValue, formatPeriodDate } from "@/lib/utils";
import { parseISO } from "date-fns";
import {
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

export const ProfileMetricCards = ({ profileId, range }: Props) => {
  const OutComeCard = async () => {
    const data = await ReleasesService.getReleasesTotal(
      profileId,
      range.startAt,
      range.endAt,
      "OUTCOME"
    );

    return (
      <div className="relative p-4 rounded-lg border border-border bg-app-secondary flex-1/5 flex flex-col items-start justify-between hover:border-border-hover cursor-pointer select-none transition-colors">
        <header className="mb-2 flex items-center gap-2">
          <span className="bg-white/10 p-2 rounded-full [&_svg]:size-6">
            <ReleaseIcon
              className="text-app-primary-foreground"
              releaseType="OUTCOME"
            />
          </span>
          <Text variant="paragraphSm" color="muted" className="font-normal">
            Gastos
          </Text>
          <span className="text-xxs bg-white/10 px-2 py-0.5 rounded-full text-white select-none">
            {formatPeriodDate(
              parseISO(data.periodDetails.startAt),
              parseISO(data.periodDetails.endAt)
            )}
          </span>
        </header>

        <div>
          <Text variant="header2">
            {formatMoneyValue(data.totalValueInCents / 100)}
          </Text>
          <footer className="mt-2 flex items-center gap-2">
            <Text variant="paragraphXs" color="muted">
              Cerca de 23% da previsão total
            </Text>
            <span className="text-xxs bg-red-400/10 px-2 py-0.5 rounded-full text-red-400 select-none">
              -77%
            </span>
          </footer>
        </div>
      </div>
    );
  };

  const InComeCard = async () => {
    const data = await ReleasesService.getReleasesTotal(
      profileId,
      range.startAt,
      range.endAt,
      "INCOME"
    );

    return (
      <div className="p-4 rounded-lg border border-border bg-app-secondary flex-1/5 flex flex-col items-start justify-between hover:border-border-hover cursor-pointer select-none transition-colors">
        <header className="mb-6 flex items-center gap-2">
          <span className="bg-white/10 p-2 rounded-full [&_svg]:size-6">
            <ReleaseIcon
              className="text-app-primary-foreground"
              releaseType="INCOME"
            />
          </span>
          <Text variant="paragraphSm" color="muted" className="font-normal">
            Renda
          </Text>
          <span className="text-xxs bg-white/10 px-2 py-0.5 rounded-full text-white select-none">
            {formatPeriodDate(
              parseISO(data.periodDetails.startAt),
              parseISO(data.periodDetails.endAt)
            )}
          </span>
        </header>

        <div>
          <Text variant="header2">
            {formatMoneyValue(data.totalValueInCents / 100)}
          </Text>
          <footer className="mt-2 flex items-center gap-2">
            <Text variant="paragraphXs" color="muted">
              Esperado o total de <strong>R$ 1.500,00</strong> até o fechamento
              do mês.
            </Text>
            {/* <span className="text-xxs bg-red-400/10 px-2 py-0.5 rounded-full text-red-400 select-none">
          77%
        </span> */}
          </footer>
        </div>
      </div>
    );
  };

  const InvetmentsCard = async () => {
    const data = await ReleasesService.getReleasesTotal(
      profileId,
      range.startAt,
      range.endAt,
      "INVESTMENT"
    );

    return (
      <div className="p-4 rounded-lg border border-border bg-app-secondary flex-1/5 flex flex-col items-start justify-between hover:border-border-hover cursor-pointer select-none transition-colors">
        <header className="mb-6 flex items-center gap-2">
          <span className="bg-white/10 p-2 rounded-full  [&_svg]:size-6">
            <ReleaseIcon
              className="text-app-primary-foreground"
              releaseType="INVESTMENT"
            />
          </span>
          <Text variant="paragraphSm" color="muted" className="font-normal">
            Investimentos
          </Text>
          <span className="text-xxs bg-white/10 px-2 py-0.5 rounded-full text-white select-none">
            {formatPeriodDate(
              parseISO(data.periodDetails.startAt),
              parseISO(data.periodDetails.endAt)
            )}
          </span>
        </header>

        <div>
          <Text variant="header2">
            {formatMoneyValue(data.totalValueInCents / 100)}
          </Text>
          <footer className="mt-2 flex items-center gap-2">
            <Text variant="paragraphXs" color="muted">
              Cerca de <strong>41%</strong> da renda total.
            </Text>
            {/* <span className="text-xxs bg-red-400/10 px-2 py-0.5 rounded-full text-red-400 select-none">
        77%
      </span> */}
          </footer>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Suspense fallback={<p>Loading outcome...</p>}>
        <OutComeCard />
      </Suspense>

      <Suspense fallback={<p>Loading income...</p>}>
        <InComeCard />
      </Suspense>

      <Suspense fallback={<p>Loading investments...</p>}>
        <InvetmentsCard />
      </Suspense>
    </div>
  );
};
