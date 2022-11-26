import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { History } from '../../pages/History'
import { Home } from '../../pages/Home'
import { Default } from '../layout/Default'

interface RouterProps {
  switchTheme: () => void
}

export const Router: FC<RouterProps> = ({ switchTheme }) => {
  const baseUrl = import.meta.env.BASE_URL

  return (
    <Routes>
      <Route path={baseUrl} element={<Default switchTheme={switchTheme} />}>
        <Route index element={<Home />} />

        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  )
}
