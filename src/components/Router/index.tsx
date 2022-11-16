import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { History } from '../../pages/History'
import { Home } from '../../pages/Home'
import { Default } from '../layout/Default'

export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route index element={<Home />} />

        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  )
}
