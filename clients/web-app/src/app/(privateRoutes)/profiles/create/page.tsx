import { CreateProfileForm } from "@/components/forms/create-profile.form";
import { GoBackButton } from "@/components/go-back-button";
import { Text } from "@/components/text";

export default function Page() {
  return (
    <div className="w-full max-w-screen-xl mx-auto p-8 space-y-4">
      <header>
        <GoBackButton className="mb-2" href="/profiles" />
        <Text variant="header2">Criar perfil</Text>
        <Text variant="paragraphSm" color="muted">
          Preencha abaixo todos os campos necessários para criar um novo perfil.
        </Text>
      </header>

      <CreateProfileForm />
    </div>
  );
}
