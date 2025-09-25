"use client";
import { ArrowRightIcon } from "lucide-react";
import { Logo } from "../logo";
import { TextField } from "./fields/text.field";
import Link from "next/link";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useTransition } from "react";
import { UsersService } from "@/api/services/users.service";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Text } from "../text";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(64),
});

gsap.registerPlugin(useGSAP);

export const LoginForm = () => {
  const router = useRouter();
  const [isSubmitPending, startSubmitTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    startSubmitTransition(async () => {
      try {
        const response = await UsersService.signIn(data);

        Cookies.set("accessToken", response.accessToken, { secure: true });
        router.push("/dashboard");
      } catch (err) {
        console.log(err);
      }
    });
  };

  // Animations
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(async () => {
    await gsap.to(".headerItem", {
      delay: 0.15,
      opacity: 1,
      x: 0,
      ease: "power2",
      stagger: 0.15,
    });
    await gsap.to(".formCard", {
      height: "auto",
      ease: "power2",
    });
    await gsap.to(".formFooter", {
      opacity: 1,
      y: 0,
      ease: "power1",
    });
  }, [containerRef]);

  return (
    <div className="w-full max-w-lg space-y-4" ref={containerRef}>
      <header className="select-none">
        <div className="space-y-2">
          <Logo
            className="headerItem logo w-52 will"
            style={{
              opacity: 0,
              transform: "translateX(-16px)",
            }}
          />
          <Text
            className="headerItem"
            variant="paragraph"
            color="muted"
            style={{
              opacity: 0,
              transform: "translateX(-16px)",
            }}
          >
            Entre com sua conta
          </Text>
        </div>
      </header>

      <div className="formCard h-0 overflow-hidden py-0">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full p-6 rounded-lg bg-app-secondary border border-border flex flex-col gap-4"
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

            <div className="flex items-center justify-end flex-wrap">
              <button className="w-full flex items-center justify-center gap-4 text-sm font-bold p-4 px-6 rounded-md bg-app border border-border bg-app-primary hover:border-white/25 cursor-pointer transition-colors [&_svg]:size-4 select-none">
                Entrar
                <ArrowRightIcon />
              </button>
            </div>
          </form>
        </FormProvider>
      </div>

      <footer
        className="formFooter text-center select-none"
        style={{
          opacity: 0,
          transform: "translateY(-16px)",
          willChange: "transform, opacity",
        }}
      >
        <Text variant="paragraphSm" color="muted">
          Não possui uma conta?{" "}
          <Link
            href="/auth/register"
            className="text-app-main-text hover:underline cursor-pointer"
          >
            Registre-se aqui
          </Link>
          .
        </Text>
      </footer>
    </div>
  );
};
