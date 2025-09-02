import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "../../configs/locales/i18n";
import { LanguageProvider } from "../context/LanguageContext";
import { AuthProvider } from "./AuthProvider";

interface ProviderComponentProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export const ProviderComponent: React.FC<ProviderComponentProps> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>{children}</AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};
