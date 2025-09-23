"use client";

import { motion, AnimatePresence } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props extends ComponentProps<"input"> {
  name: string;
  id?: string | undefined;
  label?: ReactNode;
}

export const TextField = ({ id, name, label, className, ...rest }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <fieldset className="flex flex-col">
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
        className="text-sm text-app-primary-foreground p-4 bg-app-secondary-card outline-none border border-border rounded-md focus:border-white/25 hover:border-white/25 transition-all"
        {...rest}
        {...register(name)}
      />

      <AnimatePresence key={`${name}-error-msg`}>
        {errors?.[name] && (
          <motion.p
            variants={{
              initial: { opacity: 0, height: 0, marginTop: 0 },
              animate: {
                opacity: 1,
                height: "auto",
                marginTop: "0.5rem",
              },
            }}
            initial="initial"
            animate="animate"
            exit={"initial"}
            className="text-xs text-app-error"
          >
            {errors[name]?.message?.toString()}
          </motion.p>
        )}
      </AnimatePresence>
    </fieldset>
  );
};
