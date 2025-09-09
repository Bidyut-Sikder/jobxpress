"use client";

import React from "react";

export default function SubmitButton({
  action,
  text,
  variant,
}: {
  action: () => Promise<void>;
  text: string;
  variant: "destructive" | "secondary";
}) {
  return (
    <form action={action}>
      <button type="submit" className={`btn ${variant}`}>
        {text}
      </button>
    </form>
  );
}

