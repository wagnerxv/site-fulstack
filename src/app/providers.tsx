// app/providers.tsx
"use client";
import { IgniterProvider } from "@igniter-js/core/client";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <IgniterProvider>{children}</IgniterProvider>
    </SessionProvider>
  );
}
