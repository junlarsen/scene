import React, { useEffect, useState } from 'react'

export type ClockProps = {
  twentyFourHourFormat: boolean
}

export default function Clock({ twentyFourHourFormat }: ClockProps) {
  const [time, setTime] = useState<string>("Loading ..")

  useEffect(() => {
    const computeTimeString = () => {
      const date = new Date()
      const minute = date.getMinutes().toString()
      const second = date.getSeconds().toString()
      let hour = date.getHours()
      let suffix = ""

      if (!twentyFourHourFormat) {
        suffix = hour > 12 ? " PM" : " AM"
        hour = hour > 12 ? hour - 12 : hour
      }

      return `${hour.toString().padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}${suffix}`
    }

    const interval = setInterval(() => {
      const date = computeTimeString()

      setTime(date)
    }, 1000)

    return () => clearInterval(interval)
  }, [time, twentyFourHourFormat])

  return (
    <div className="app__clock">
      {time}
    </div>
  )
}