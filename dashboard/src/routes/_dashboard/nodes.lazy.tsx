import { Page, Loading } from '@serhas/common/components'
import { NodesTable } from '@serhas/modules/nodes'
import { createLazyFileRoute, Outlet } from '@tanstack/react-router'
import { type FC, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { SudoRoute } from '@serhas/libs/sudo-routes'

export const NodesPage: FC = () => {
  const { t } = useTranslation()
  return (
    <Page
      title={t('nodes')}
      className="sm:w-screen md:w-full"
    >
      <NodesTable />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </Page>
  )
}

export const Route = createLazyFileRoute('/_dashboard/nodes')({
  component: () => (
    <SudoRoute>
      {' '}
      <NodesPage />{' '}
    </SudoRoute>
  ),
})
