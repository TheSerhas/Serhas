import { createLazyFileRoute } from '@tanstack/react-router'
import { Page } from '@serhas/common/components'
import { UsersStatsWidget, useUsersStatsQuery } from '@serhas/modules/users'
import { TotalTrafficsWidget } from '@serhas/features/total-traffic-widget'
import { useTranslation } from 'react-i18next'
import { FC } from 'react'

export const DashboardPage: FC = () => {
  const { t } = useTranslation()
  const { data } = useUsersStatsQuery()

  return (
    <Page className="flex flex-col gap-4 w-full" title={t('home')}>
      <div className={`grid grid-cols-1 gap-4`}>
        <UsersStatsWidget {...data} />
        <TotalTrafficsWidget />
      </div>
    </Page>
  )
}

export const Route = createLazyFileRoute('/_dashboard/')({
  component: () => <DashboardPage />,
})
