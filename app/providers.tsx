"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
