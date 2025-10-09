"use client";

import { FormProvider, useForm } from "react-hook-form";
import { TextField } from "./fields/text.field";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { ProfilesService } from "@/api/services/profiles.service";
import { getQueryClient } from "@/app/(privateRoutes)/providers";

const schema = z.object({
  name: z.string().min(2).max(64),
  document: z.string().max(14).nullable().optional(),
  type: z.enum(["PJ", "PF"]),
});

export const CreateProfileForm = () => {
  const [isSubmitPending, startSubmitTransition] = useTransition();

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      document: null,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
    startSubmitTransition(async () => {
      await ProfilesService.createProfile({
        document: data.document || null,
        name: data.name,
        type: data.type,
      });

      await getQueryClient().invalidateQueries({
        queryKey: ["profiles"],
        exact: true,
      });

      router.push("/profiles");
    });
  };

  const handleCancel = () => {
    form.reset();
    router.push("/profiles");
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextField name="name" label="Nome*" placeholder="Ex: Pf01" />
        <TextField
          name="document"
          label="Documento"
          placeholder="Ex: 000.000.000-00"
        />
        <TextField name="type" label="Tipo*" placeholder="Selecione um tipo" />

        <div className=" flex items-center justify-end gap-2 ">
          <Button variant="link" type="button" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            Criar perfil <PlusCircleIcon />
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
