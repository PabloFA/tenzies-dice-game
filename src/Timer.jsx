import { useEffect } from 'react'
import './App.css'

export default function Timer({
  seconds,
  setSeconds,
  minutes,
  setMinutes,
  tenzies,
}) {
  useEffect(() => {
    let intervalId

    const updateCounter = () => {
      if (!tenzies) {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }
    }

    intervalId = setInterval(updateCounter, 1000)

    return () => clearInterval(intervalId)
  }, [tenzies])

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0)
      setMinutes((prevMinutes) => prevMinutes + 1)
    }
  }, [seconds])

  return (
    <div className='timer-clock'>
      <h2 className='die-num'>{`${minutes
        .toString()
        .padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`}</h2>
    </div>
  )
}
