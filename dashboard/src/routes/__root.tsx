import { TooltipProvider, Loading } from '@serhas/common/components';
import { ThemeProvider } from '@serhas/features/theme-switch'
import { queryClient } from '@serhas/common/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

export const Route = createRootRoute({
    component: () => {
        const locale = useTranslation().i18n.language;

        useEffect(() => {
            const rtlLanguages = ["ar", "fa"];
            document.documentElement.setAttribute(
                "dir",
                rtlLanguages.includes(locale) ? "rtl" : "ltr"
            );
        }, [locale])

        return (
            <QueryClientProvider client={queryClient}>
                <ThemeProvider defaultTheme="light" storageKey="ui-theme">
                    <TooltipProvider>
                        <Suspense fallback={<Loading />}>
                            <Outlet />
                        </Suspense>
                    </TooltipProvider>
                </ThemeProvider>
            </QueryClientProvider>
        )
    },
})
