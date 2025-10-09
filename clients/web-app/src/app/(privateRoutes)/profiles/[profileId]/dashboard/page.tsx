import { ProfilesService } from "@/api/services/profiles.service";
import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { formatDistance, formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowRightIcon,
  BanknoteArrowDownIcon,
  BanknoteArrowUpIcon,
  HandCoinsIcon,
} from "lucide-react";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;

  const profile = await ProfilesService.getProfile(profileId);

  return (
    <div className="w-full max-w-screen-xl mx-auto p-8 space-y-4">
      <header className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <Text variant="header3">{profile.name}</Text>
          <span className="text-xxs bg-white/10 px-2 py-0.5 rounded-full text-white select-none">
            {profile.type}
          </span>
        </div>
        <div>
          <Text variant="paragraphXs" color="muted">
            Atualizado{" "}
            {formatDistanceToNow(parseISO(profile.updatedAt), {
              addSuffix: true,
              locale: ptBR,
            })}
          </Text>
        </div>
      </header>
      <div className="flex items-center gap-2">
        <Link
          href={`/profiles/${profileId}/dashboard`}
          className="text-sm bg-app-secondary py-2 px-4 rounded-md border border-border cursor-default"
        >
          Dashboard
        </Link>
        <button className="text-sm py-2 px-4 rounded-md border border-border hover:bg-app-secondary transition-colors cursor-pointer">
          Lançamentos
        </button>
        <button className="text-sm py-2 px-4 rounded-md border border-border hover:bg-app-secondary transition-colors cursor-pointer">
          Investimentos
        </button>
        <button className="text-sm py-2 px-4 rounded-md border border-border hover:bg-app-secondary transition-colors cursor-pointer">
          Configurações
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="relative p-4 rounded-lg border border-border bg-app-secondary flex-1/5 flex flex-col items-start justify-between hover:border-border-hover cursor-pointer select-none transition-colors">
          <header className="mb-2 flex items-center gap-2">
            <span className="bg-white/10 p-2 rounded-full text-app-primary-foreground [&_svg]:size-6">
              <BanknoteArrowDownIcon className="[&_path:nth-child(4)]:text-red-500 [&_path:nth-child(2)]:text-red-500" />
            </span>
            <Text variant="paragraphSm" color="muted" className="font-normal">
              Gastos
            </Text>
            <span className="text-xxs bg-white/10 px-2 py-0.5 rounded-full text-white select-none">
              01 out - 07 out
            </span>
          </header>

          <div>
            <Text variant="header2">R$ 250,00</Text>
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
        <div className="p-4 rounded-lg border border-border bg-app-secondary flex-1/5 flex flex-col items-start justify-between hover:border-border-hover cursor-pointer select-none transition-colors">
          <header className="mb-6 flex items-center gap-2">
            <span className="bg-white/10 p-2 rounded-full text-app-primary-foreground [&_svg]:size-6">
              <BanknoteArrowUpIcon className="[&_path:nth-child(4)]:text-green-500 [&_path:nth-child(3)]:text-green-500" />
            </span>
            <Text variant="paragraphSm" color="muted" className="font-normal">
              Renda
            </Text>
            <span className="text-xxs bg-white/10 px-2 py-0.5 rounded-full text-white select-none">
              01 out - 07 out
            </span>
          </header>

          <div>
            <Text variant="header2">R$ 424,00</Text>
            <footer className="mt-2 flex items-center gap-2">
              <Text variant="paragraphXs" color="muted">
                Esperado o total de <strong>R$ 1.500,00</strong> até o
                fechamento do mês.
              </Text>
              {/* <span className="text-xxs bg-red-400/10 px-2 py-0.5 rounded-full text-red-400 select-none">
                77%
              </span> */}
            </footer>
          </div>
        </div>
        <div className="p-4 rounded-lg border border-border bg-app-secondary flex-1/5 flex flex-col items-start justify-between hover:border-border-hover cursor-pointer select-none transition-colors">
          <header className="mb-6 flex items-center gap-2">
            <span className="bg-white/10 p-2 rounded-full text-app-primary-foreground [&_svg]:size-6">
              <HandCoinsIcon className="[&_circle]:text-app-main" />
            </span>
            <Text variant="paragraphSm" color="muted" className="font-normal">
              Investimentos
            </Text>
            <span className="text-xxs bg-white/10 px-2 py-0.5 rounded-full text-white select-none">
              01 out - 07 out
            </span>
          </header>

          <div>
            <Text variant="header2">R$ 174,00</Text>
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
      </div>

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
            <tr className="[&_td]:text-start [&_td]:py-2 [&_td]:px-4 [&_td]:text-base [&_td]:font-normal [&_td]:text-app-primary-foreground [&_td]:bg-app-secondary [&_td]:first:rounded-tl-lg [&_td]:first:rounded-bl-lg [&_td]:last:rounded-tr-lg [&_td]:last:rounded-br-lg [&_td]:border [&_td]:border-border [&_td]:not:first:border-l-none [&_td]:not-first:border-l-0">
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
            </tr>
          </tbody>
        </table>
        <footer className="px-[calc(1rem+2px)] flex items-center justify-between gap-4">
          <Text className="select-none" variant="paragraphSm" color="muted">
            Lançamentos recentes
          </Text>
          <Button variant="link" className="px-0">
            Ver todos <ArrowRightIcon />
          </Button>
        </footer>
      </div>
    </div>
  );
}
