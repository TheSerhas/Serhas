import { SidebarObject } from '@serhas/common/components';
import { Box, Home, ShieldCheck, Server, ServerCog, Settings, UsersIcon } from 'lucide-react';
import { TFunction } from 'i18next';

export const getSidebarItems = (t: TFunction): SidebarObject => ({
    [t('dashboard')]: [
        {
            title: t('home'),
            to: '/',
            icon: <Home />,
            isParent: false,
        },
    ],
    [t('management')]: [
        {
            title: t('users'),
            to: '/users',
            icon: <UsersIcon />,
            isParent: false,
        },
        {
            title: t('services'),
            to: '/services',
            icon: <Server />,
            isParent: false,
        },
        {
            title: t('nodes'),
            to: '/nodes',
            icon: <Box />,
            isParent: false,
        },
        {
            title: t('hosts'),
            to: '/hosts',
            icon: <ServerCog />,
            isParent: false,
        },
    ],
    [t('system')]: [
        {
            title: t('admins'),
            to: '/admins',
            icon: <ShieldCheck />,
            isParent: false,
        },
        {
            title: t('settings'),
            to: '/settings',
            icon: <Settings />,
            isParent: false,
        },
    ]
});

export const getSidebarItemsNonSudoAdmin = (t: TFunction): SidebarObject => ({
    [t('dashboard')]: [
        {
            title: t('home'),
            to: '/',
            icon: <Home />,
            isParent: false,
        },
    ],
    [t('management')]: [
        {
            title: t('users'),
            to: '/users',
            icon: <UsersIcon />,
            isParent: false,
        },
    ],
});
