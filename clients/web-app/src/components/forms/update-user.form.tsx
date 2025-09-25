"use client";

import { FormProvider, useForm } from "react-hook-form";
import { TextField } from "./fields/text.field";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/stores/user.store.provider";
import { Button } from "../button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Text } from "../text";
import { useRef } from "react";

const updateUserSchema = z.object({
  nickname: z.string().min(2).max(32).nullable(),
  firstName: z.string().min(3).max(128),
  lastName: z.string().min(3).max(128),
});

gsap.registerPlugin(useGSAP);

export const UpdateUserForm = () => {
  const user = useUserStore((state) => state.user);

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      nickname: user?.nickname || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },
  });
  const isDirty = form.formState.isDirty;

  const onSubmit = (data: z.infer<typeof updateUserSchema>) => {
    console.log(data);
  };

  // Animations
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(async () => {
    await gsap.to(".updateUserFormCard", {
      delay: 0.35,
      opacity: 1,
      y: 0,
      ease: "power1",
      stagger: 0.15,
    });

    await gsap.to(".updateUserFormItem", {
      opacity: 1,
      x: 0,
      ease: "power2",
      stagger: 0.15,
    });
  }, [containerRef.current]);

  return (
    <section
      ref={containerRef}
      className="updateUserFormCard py-0 space-y-4"
      style={{
        opacity: 0,
        transform: "translateY(-16px)",
      }}
    >
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full p-6 rounded-lg bg-app-secondary border border-border"
        >
          <header>
            <Text
              className="updateUserFormItem"
              variant="header2"
              style={{
                opacity: 0,
                transform: "translateX(-16px)",
              }}
            >
              Atualize seus dados
            </Text>
            <Text
              className="updateUserFormItem"
              variant="paragraphSm"
              color="muted"
              style={{
                opacity: 0,
                transform: "translateX(-16px)",
              }}
            >
              Veja seu cadastro abaixo, sinta-se livre para atualizá-lo quando
              quiser.
            </Text>
          </header>

          <div
            className="updateUserFormItem"
            style={{
              opacity: 0,
              transform: "translateX(-16px)",
            }}
          >
            <TextField
              containerClassName="flex-1"
              name="nickname"
              label="Apelido"
              placeholder="Ex: JD"
            />
          </div>

          <div
            className="w-full flex flex-wrap gap-4 updateUserFormItem"
            style={{
              opacity: 0,
              transform: "translateX(-16px)",
            }}
          >
            <TextField
              containerClassName="flex-1/3"
              name="firstName"
              label="Primeiro nome"
              placeholder="Ex: John"
            />
            <TextField
              containerClassName="flex-1/3"
              name="lastName"
              label="Sobrenome"
              placeholder="Ex: Doe"
            />
          </div>

          <div className=" flex items-center justify-end gap-2 ">
            <Button
              variant="link"
              type="button"
              onClick={() => form.reset()}
              className="updateUserFormItem"
              style={{
                opacity: 0,
                transform: "translateX(-16px)",
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isDirty}
              className="updateUserFormItem"
              style={{
                opacity: 0,
                transform: "translateX(-16px)",
              }}
            >
              Salvar
            </Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
