import { ProfilesService } from "@/api/services/profiles.service";
import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRightIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export default async function Page() {
  const profiles = await ProfilesService.getManyProfiles();

  console.log(profiles);

  return (
    <div className="w-full max-w-screen-xl mx-auto p-8 space-y-4">
      {profiles.length > 0 ? (
        <Fragment>
          <header>
            <Text variant="header2">Perfis</Text>
            <Text variant="paragraphSm" color="muted">
              Sinta se livre para separar suas finanças em diferentes perfis,
              assim ajudando a ter uma maior organização!
            </Text>
          </header>
          <div className="flex items-center flex-col gap-2">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="w-full p-4 border border-border rounded-md bg-app-secondary flex items-center justify-between gap-4 hover:border-white/25 transition-colors"
              >
                <header>
                  <Text variant="header4">{profile.name}</Text>
                  <Text variant="paragraphXs" color="muted">
                    Atualizado{" "}
                    {formatDistanceToNow(parseISO(profile.updatedAt), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </Text>
                </header>
                <Button asChild>
                  <Link href={`/profiles/${profile.id}`}>
                    Acessar perfil <ArrowRightIcon />
                  </Link>
                </Button>
              </div>
            ))}

            <Button className="w-full" variant="secondary" asChild>
              <Link href="/profiles/create">
                Criar perfil <PlusCircleIcon />
              </Link>
            </Button>
          </div>
        </Fragment>
      ) : (
        <div className="mt-4 flex flex-col items-center justify-center max-w-screen-sm mx-auto text-center">
          <Text variant="header2">Nenhum perfil encontrado</Text>
          <Text variant="paragraphSm" color="muted">
            Sinta se livre para separar suas finanças em diferentes perfis,
            assim ajudando a ter uma maior organização! Clique no botão abaixo
            para criar um perfil.
          </Text>
          <Button className="mt-4" asChild>
            <Link href="/profiles/create">
              Criar perfil <PlusCircleIcon />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
