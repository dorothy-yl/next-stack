"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import {ReactNode} from "react"

type ProviderProps = {
    children: ReactNode
}

const Provider = ({ children }: ProviderProps) => {
    return (
        <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
            {children}
        </NextThemesProvider>
    )
}
export default Provider;