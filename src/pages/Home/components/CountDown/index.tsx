import { differenceInSeconds } from 'date-fns'
import { FC, useContext, useEffect, useState } from 'react'
import { CycleContext } from '../..'
import { CountDownContainer, Separator } from './styles'

export const CountDown: FC = () => {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  } = useContext(CycleContext)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`
    else document.title = 'Ignite Timer'
  }, [activeCycle, minutes, seconds])

  useEffect(() => {
    if (!activeCycle) return undefined

    const interval = setInterval(() => {
      const diffInSeconds = differenceInSeconds(
        new Date(),
        activeCycle.startDate,
      )

      if (diffInSeconds >= totalSeconds) {
        markCurrentCycleAsFinished()

        setSecondsPassed(totalSeconds)

        clearInterval(interval)

        return
      }

      setSecondsPassed(diffInSeconds)
    }, 1000)

    return () => clearInterval(interval)
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>

      <Separator>:</Separator>

      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
