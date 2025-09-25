"use client";

import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { useFormContext } from "react-hook-form";

interface Props extends ComponentProps<"input"> {
  name: string;
  id?: string | undefined;
  label?: ReactNode;
  containerClassName?: string;
}

export const TextField = ({
  id,
  name,
  label,
  className,
  containerClassName,
  ...rest
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <fieldset className={cn("flex flex-col", containerClassName)}>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 text-xs text-app-primary-foreground-muted select-none cursor-pointer"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "text-sm text-app-primary-foreground p-4 bg-app-secondary-card outline-none border border-border rounded-md focus:border-white/25 hover:border-white/25 transition-all",
          className
        )}
        {...rest}
        {...register(name)}
      />

      <ErrorMessage error={errors?.[name]?.message?.toString()} />
    </fieldset>
  );
};

const ErrorMessage = ({ error }: { error?: string }) => {
  const [currentError, setCurrentError] = useState(error || null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!error) return;
    setCurrentError(error);
  }, [error]);

  useGSAP(async () => {
    if (error) {
      gsap.to(errorRef.current, {
        delay: 0.1,
        duration: 0.2,
        opacity: 1,
        height: "auto",
        marginTop: "0.5rem",
        ease: "power1",
      });
    } else {
      gsap.to(errorRef.current, {
        delay: 0.1,
        duration: 0.2,
        opacity: 0,
        height: 0,
        marginTop: "0",
        ease: "power1",
      });
    }
  }, [error]);

  return (
    <Text
      variant="paragraphXs"
      color="error"
      ref={errorRef}
      style={{ height: 0, opacity: 0 }}
    >
      {currentError || "Error"}
    </Text>
  );
};

// variants={{
//   initial: { opacity: 0, height: 0, marginTop: 0 },
//   animate: {
//     opacity: 1,
//     height: "auto",
//     marginTop: "0.5rem",
//   },
// }}
