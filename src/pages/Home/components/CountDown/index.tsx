import { differenceInSeconds } from 'date-fns'
import { FC, useEffect, useState } from 'react'
import { Cycle } from '../..'
import { CountDownContainer, Separator } from './styles'

export const CountDown: FC = () => {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (!activeCycle) return undefined

    const interval = setInterval(() => {
      const diffInSeconds = differenceInSeconds(
        new Date(),
        activeCycle.startDate,
      )

      if (diffInSeconds >= totalSeconds) {
        setCycles((state) =>
          state.map((item) =>
            item.id === activeCycleId
              ? ({ ...item, finishedDate: new Date() } as Cycle)
              : item,
          ),
        )

        setAmountSecondsPassed(totalSeconds)

        clearInterval(interval)

        return
      }

      setAmountSecondsPassed(diffInSeconds)
    }, 1000)

    return () => clearInterval(interval)
  }, [activeCycle, totalSeconds])

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
