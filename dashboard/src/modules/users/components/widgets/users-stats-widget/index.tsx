import { FC } from 'react';
import { UsersIcon, ActivityIcon, ClockIcon, XCircleIcon, ShieldAlertIcon, WifiIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { UserStatCard } from "../user-stat-card";

interface UsersStatsProps {
    limited: number;
    active: number;
    expired: number;
    on_hold: number;
    online: number;
    total: number;
}

export const UsersStatsWidget: FC<UsersStatsProps> = ({ total, limited, active, expired, on_hold, online }) => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <UserStatCard
                title={t('users_stats.total')}
                value={total}
                icon={UsersIcon}
                iconColor="text-blue-600"
                description={t('users_stats.total_desc')}
            />
            <UserStatCard
                title={t('users_stats.active')}
                value={active}
                icon={ActivityIcon}
                iconColor="text-green-600"
                description={t('users_stats.active_desc')}
            />
            <UserStatCard
                title={t('users_stats.online')}
                value={online}
                icon={WifiIcon}
                iconColor="text-emerald-600"
                description={t('users_stats.online_desc')}
            />
            <UserStatCard
                title={t('users_stats.on_hold')}
                value={on_hold}
                icon={ClockIcon}
                iconColor="text-purple-600"
                description={t('users_stats.on_hold_desc')}
            />
            <UserStatCard
                title={t('users_stats.expired')}
                value={expired}
                icon={XCircleIcon}
                iconColor="text-gray-600"
                description={t('users_stats.expired_desc')}
            />
            <UserStatCard
                title={t('users_stats.limited')}
                value={limited}
                icon={ShieldAlertIcon}
                iconColor="text-red-600"
                description={t('users_stats.limited_desc')}
            />
        </div>
    );
};

