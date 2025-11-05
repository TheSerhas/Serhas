import { FC } from 'react';
import { 
    UserPlusIcon, 
    UserMinusIcon, 
    ShieldXIcon, 
    RefreshCwIcon, 
    WifiIcon, 
    RotateCcwIcon 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { UserStatCard } from "../user-stat-card";

interface TodayStatsWidgetProps {
    today_new_users: number;
    today_removed_users: number;
    today_revoked_users: number;
    today_sub_updated_users: number;
    today_online_users: number;
    today_traffic_reset_users: number;
}

export const TodayStatsWidget: FC<TodayStatsWidgetProps> = ({ 
    today_new_users,
    today_removed_users,
    today_revoked_users,
    today_sub_updated_users,
    today_online_users,
    today_traffic_reset_users
}) => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <UserStatCard
                title={t('today_stats.new_users')}
                value={today_new_users}
                icon={UserPlusIcon}
                iconColor="text-green-600"
                description={t('today_stats.new_users_desc')}
            />
            <UserStatCard
                title={t('today_stats.removed_users')}
                value={today_removed_users}
                icon={UserMinusIcon}
                iconColor="text-red-600"
                description={t('today_stats.removed_users_desc')}
            />
            <UserStatCard
                title={t('today_stats.revoked_users')}
                value={today_revoked_users}
                icon={ShieldXIcon}
                iconColor="text-orange-600"
                description={t('today_stats.revoked_users_desc')}
            />
            <UserStatCard
                title={t('today_stats.sub_updated_users')}
                value={today_sub_updated_users}
                icon={RefreshCwIcon}
                iconColor="text-blue-600"
                description={t('today_stats.sub_updated_users_desc')}
            />
            <UserStatCard
                title={t('today_stats.online_users')}
                value={today_online_users}
                icon={WifiIcon}
                iconColor="text-emerald-600"
                description={t('today_stats.online_users_desc')}
            />
            <UserStatCard
                title={t('today_stats.traffic_reset_users')}
                value={today_traffic_reset_users}
                icon={RotateCcwIcon}
                iconColor="text-purple-600"
                description={t('today_stats.traffic_reset_users_desc')}
            />
        </div>
    );
};
