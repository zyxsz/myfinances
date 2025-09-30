import { ProfilesService } from "@/api/services/profiles.service";
import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const profiles = await ProfilesService.getManyProfiles();

  console.log(profiles);

  return (
    <div className="w-full max-w-screen-xl mx-auto p-8 space-y-4">
      {profiles.length > 0 ? (
        <header>
          <Text variant="header2">Perfis</Text>
          <Text variant="paragraphSm" color="muted">
            Sinta se livre para separar suas finanças em diferentes perfis,
            assim ajudando a ter uma maior organização!
          </Text>
        </header>
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
