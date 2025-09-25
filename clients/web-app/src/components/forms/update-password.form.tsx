"use client";

import { FormProvider, useForm } from "react-hook-form";
import { TextField } from "./fields/text.field";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Text } from "../text";
import { useRef } from "react";

const updateUserSchema = z
  .object({
    password: z.string().min(6).max(128),
    confirmPassword: z.string().min(6).max(128),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não combinam",
    path: ["confirmPassword"],
  });

export const UpdatePasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const isDirty = form.formState.isDirty;

  const onSubmit = (data: z.infer<typeof updateUserSchema>) => {
    console.log(data);
  };

  // Animations
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(async () => {
    await gsap.to(".updatePasswordFormCard", {
      delay: 1.5,
      opacity: 1,
      y: 0,
      ease: "power1",
      stagger: 0.15,
    });

    await gsap.to(".updatePasswordFormItem", {
      opacity: 1,
      x: 0,
      ease: "power2",
      stagger: 0.15,
    });
  }, [containerRef.current]);

  return (
    <section
      ref={containerRef}
      className="updatePasswordFormCard space-y-4 p-6 rounded-lg bg-app-secondary border border-border"
      style={{
        opacity: 0,
        transform: "translateY(-16px)",
      }}
    >
      <header>
        <Text
          className="updatePasswordFormItem"
          variant="header2"
          style={{
            opacity: 0,
            transform: "translateX(-16px)",
          }}
        >
          Atualize sua senha
        </Text>
        <Text
          className="updatePasswordFormItem"
          variant="paragraphSm"
          color="muted"
          style={{
            opacity: 0,
            transform: "translateX(-16px)",
          }}
        >
          Digite sua nova senha abaixo e atualize-a.
        </Text>
      </header>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div
            className="updatePasswordFormItem"
            style={{
              opacity: 0,
              transform: "translateX(-16px)",
            }}
          >
            <TextField
              containerClassName="flex-1"
              name="password"
              label="Senha"
              placeholder="Ex: *******"
            />
          </div>
          <div
            className="updatePasswordFormItem"
            style={{
              opacity: 0,
              transform: "translateX(-16px)",
            }}
          >
            <TextField
              containerClassName="flex-1"
              name="confirmPassword"
              label="Confirmar senha"
              placeholder="Ex: *******"
            />
          </div>

          <div className=" flex items-center justify-end gap-2 ">
            <Button
              variant="link"
              type="button"
              onClick={() => form.reset()}
              className="updatePasswordFormItem"
              // disabled={!isDirty}
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
              className="updatePasswordFormItem"
              style={{
                opacity: 0,
                transform: "translateX(-16px)",
              }}
            >
              Atualizar
            </Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
