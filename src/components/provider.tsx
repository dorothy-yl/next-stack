"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import {ReactNode} from "react"
import {QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"

const queryClient = new QueryClient();

type ProviderProps = {
    children: ReactNode
}

const Provider = ({ children }: ProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
        <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
            <Toaster />
            {children}
        </NextThemesProvider>
        </QueryClientProvider>
    )
}
export default Provider;