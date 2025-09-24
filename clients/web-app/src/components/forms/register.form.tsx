"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Logo } from "../logo";
import { TextField } from "./fields/text.field";
import Link from "next/link";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { UsersService } from "@/api/services/users.service";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const registerSchema = z
  .object({
    email: z.email(),
    nickname: z.string().min(2).max(32).nullable(),
    firstName: z.string().min(3).max(128),
    lastName: z.string().min(3).max(128),
    password: z.string().min(6).max(128),
    confirmPassword: z.string().min(6).max(128),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não combinam",
    path: ["confirmPassword"],
  });

export const RegisterForm = () => {
  const router = useRouter();
  const [isSubmitPending, startSubmitTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      nickname: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    startSubmitTransition(async () => {
      try {
        const response = await UsersService.signUp({
          email: data.email,
          nickname: data.nickname || null,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
        });

        Cookies.set("accessToken", response.accessToken, { secure: true });
        router.push("/dashboard");
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <div className="w-full max-w-lg space-y-4 py-12">
      <header className="select-none space-y-4">
        <Link
          href="/auth/login"
          className="flex items-center gap-4 text-sm text-app-primary-foreground-muted hover:text-app-primary-foreground [&_svg]:size-4 hover:underline cursor-pointer"
        >
          <ArrowLeftIcon />
          Voltar
        </Link>
        <div className="space-y-2">
          <Logo className="w-52" />
          <h1 className="text-sm text-app-primary-foreground-muted">
            Registre-se em nossa plataforma
          </h1>
        </div>
      </header>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-6 rounded-lg bg-app-secondary border border-border flex flex-col gap-4"
        >
          <div className="space-y-4">
            <TextField
              id="email"
              name="email"
              label="Email"
              placeholder="Ex: john@doe.com"
              type="text"
            />
            <TextField
              id="nickname"
              name="nickname"
              label="Apelido"
              placeholder="Ex: JD"
              type="text"
            />
            <TextField
              id="firstName"
              name="firstName"
              label="Primeiro nome"
              placeholder="Ex: John"
              type="text"
            />
            <TextField
              id="lastName"
              name="lastName"
              label="Sobrenome"
              placeholder="Ex: Doe"
              type="text"
            />
            <TextField
              id="password"
              name="password"
              label="Senha"
              placeholder="Ex: ********"
              type="password"
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirmar senha"
              placeholder="Ex: ********"
              type="password"
            />
          </div>

          <div className="flex items-center justify-end flex-wrap">
            <button className="w-full flex items-center justify-center gap-4 text-sm font-bold p-4 px-6 rounded-md bg-app border border-border bg-app-primary hover:border-white/25 cursor-pointer transition-colors [&_svg]:size-4 select-none">
              Criar conta
              <ArrowRightIcon />
            </button>
          </div>
        </form>
      </FormProvider>

      <footer className="text-center select-none">
        <p className="text-sm text-app-primary-foreground-muted">
          Já possui uma conta?{" "}
          <Link
            href="/auth/login"
            className="text-app-main-text hover:underline cursor-pointer"
          >
            Logue-se aqui
          </Link>
          .
        </p>
      </footer>
    </div>
  );
};
