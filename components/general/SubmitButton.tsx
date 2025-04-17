"use client";

import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  width?: string;
  variant?: "default" | "destructive" | "outline" | "secondary";
  text: string;
  icon: React.ReactNode;
}

function SubmitButton({ width, variant, text, icon }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button className={width} variant={variant}>
      {pending ? (
        <>
          {" "}
          <Loader2 className="size-4 animate-spin" /> <span>Submitting...</span>
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
}

export default SubmitButton;
