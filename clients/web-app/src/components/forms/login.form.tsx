"use client";
import { ArrowRightIcon } from "lucide-react";
import { Logo } from "../logo";
import { TextField } from "./fields/text.field";
import Link from "next/link";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(64),
});

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-lg space-y-4">
      <header className="select-none">
        <Logo className="w-52" />
        <h1 className="text-app-primary-foreground-muted">
          Entre com sua conta
        </h1>
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
              placeholder="Ex: user@example.com"
              type="text"
            />
            <TextField
              id="password"
              name="password"
              label="Senha"
              placeholder="Ex: ********"
              type="password"
            />
          </div>

          {/* <div>
          <p className="text-app-primary-foreground-muted text-sm">
            Lembrar-me
          </p>
        </div> */}

          <div className="flex items-center justify-end flex-wrap">
            <button className="w-full flex items-center justify-center gap-4 text-sm font-bold p-4 px-6 rounded-md bg-app border border-border bg-app-primary hover:border-white/25 cursor-pointer transition-colors [&_svg]:size-4 select-none">
              Entrar
              <ArrowRightIcon />
            </button>

            {/* <button className="w-full p-2 bg-app-main text-app-main-foreground rounded-md border border-border">
            Entrar
          </button> */}
          </div>
        </form>
      </FormProvider>

      <footer className="text-center select-none">
        <p className="text-sm text-app-primary-foreground-muted">
          Não possui uma conta?{" "}
          <Link
            href="/auth/register"
            className="text-app-main-text hover:underline cursor-pointer"
          >
            Registre-se aqui
          </Link>
          .
        </p>
      </footer>
    </div>
  );
};
