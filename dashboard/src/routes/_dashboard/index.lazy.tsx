import { createLazyFileRoute } from '@tanstack/react-router'
import { Page, WelcomeHeader } from '@serhas/common/components'
import { TodayStatsWidget, UsersStatsWidget } from '@serhas/modules/users'
import { useCurrentStatsQuery } from '@serhas/modules/users/api/queries'
import { TotalTrafficsWidget } from '@serhas/features/total-traffic-widget'
import { useTranslation } from 'react-i18next'
import { FC } from 'react'

export const DashboardPage: FC = () => {
  const { t } = useTranslation()
  const { data } = useCurrentStatsQuery()

  return (
    <Page className="flex flex-col gap-4 w-full" title={t('home')}>
      <WelcomeHeader username={data.username} />
      
      <div className="flex flex-col gap-6">
        {/* Today's Stats Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3">{t('today_stats.title')}</h2>
          <TodayStatsWidget 
            today_new_users={data.today_new_users}
            today_removed_users={data.today_removed_users}
            today_revoked_users={data.today_revoked_users}
            today_sub_updated_users={data.today_sub_updated_users}
            today_online_users={data.today_online_users}
            today_traffic_reset_users={data.today_traffic_reset_users}
          />
        </div>

        {/* Overall Users Stats Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3">{t('users_stats.title')}</h2>
          <UsersStatsWidget 
            total={data.total_users}
            active={data.active_users}
            on_hold={data.on_hold_users}
            expired={data.expired_users}
            limited={data.limited_users}
            online={data.online_users}
          />
        </div>

        {/* Total Traffic Widget */}
        <div>
          <TotalTrafficsWidget />
        </div>
      </div>
    </Page>
  )
}

export const Route = createLazyFileRoute('/_dashboard/')({
  component: () => <DashboardPage />,
})
