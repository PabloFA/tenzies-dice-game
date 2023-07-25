import './App.css'
import React from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Timer from './Timer'
import Ranking from './Ranking'

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [roll, setRoll] = React.useState(0)
  const [seconds, setSeconds] = React.useState(0)
  const [minutes, setMinutes] = React.useState(0)
  let min = minutes < 10 ? '0' + minutes : minutes
  let sec = seconds < 10 ? '0' + seconds : seconds
  let time = `${min}:${sec}`
  const [ranking, setRanking] = React.useState(
    JSON.parse(localStorage.getItem('ranking')) || []
  )

  React.useEffect(() => {
    if (!tenzies) {
      const allHeld = dice.every((die) => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(
        (die) => die.value === firstValue
      )
      if (allHeld && allSameValue) {
        setTenzies(true)
        newTime(time, roll)
      }
    }
  })

  React.useEffect(() => {
    localStorage.setItem('ranking', JSON.stringify(ranking))
  }, [ranking])

  function newTime(time, roll) {
    const newRanking = {
      rankingTime: time,
      rankingRolls: roll,
      id: nanoid(),
    }
    setRanking([newRanking, ...ranking])
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie()
        })
      )
      setRoll((prevRoll) => prevRoll + 1)
    } else {
      setTenzies(false)
      setDice(allNewDice())
      resetGame()
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  function resetGame() {
    setSeconds(0)
    setMinutes(0)
    setRoll(0)
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>

      <p className='instructions'>
        Roll until all dice are the same. Click each die to freeze it
        at its current value between rolls.
      </p>
      <div className='dice-container'>{diceElements}</div>
      <div className='controls'>
        <Timer
          seconds={seconds}
          setSeconds={setSeconds}
          minutes={minutes}
          setMinutes={setMinutes}
          tenzies={tenzies}
        />
        <button className='roll-dice' onClick={rollDice}>
          {tenzies ? 'New Game' : 'Roll'}
        </button>
        <h2 className='die-num'>
          {roll} {roll > 1 ? 'rolls' : 'roll'}
        </h2>
      </div>
      {ranking.length >= 1 && <Ranking ranking={ranking} />}
    </main>
  )
}
