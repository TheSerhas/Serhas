import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    Button,
} from "@serhas/common/components";
import { Link } from "@tanstack/react-router";
import { FC } from 'react';
import { Settings, MenuIcon, ShieldCheck } from "lucide-react";
import { LanguageSwitchMenu } from "@serhas/features/language-switch";
import { ThemeToggle } from "@serhas/features/theme-switch";
import { useAuth, Logout } from "@serhas/modules/auth";
import { useScreenBreakpoint } from "@serhas/common/hooks/use-screen-breakpoint";
import { useTranslation } from "react-i18next";
import { VersionIndicator } from "@serhas/features/version-indicator";

export const HeaderMenu: FC = () => {

    const isDesktop = useScreenBreakpoint("md");
    const { isSudo } = useAuth();
    const { t } = useTranslation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    className="bg-gray-800 text-secondary dark:hover:bg-secondary-foreground dark:hover:text-secondary dark:text-secondary-foreground"
                    size="icon"
                >
                    <MenuIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(!isDesktop && isSudo()) && (
                    <>
                        <DropdownMenuItem className="w-full">
                            <Link to="/settings" className="hstack gap-1 items-center justify-between w-full h-fit p-0">
                                {t("settings")}
                                <Settings className="size-4" />
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="w-full">
                            <Link to="/admins" className="hstack gap-1 items-center justify-between w-full h-fit p-0" >
                                {t("admins")}
                                <ShieldCheck className="size-4" />
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuItem className="w-full">
                    <Logout />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <LanguageSwitchMenu />
                    <ThemeToggle />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="py-1 shrink-0">
                    <VersionIndicator />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu >
    )
};
