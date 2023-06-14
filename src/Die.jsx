import React from 'react'
import './App.css'

export default function Die({ value, holdDice, isHeld }) {
  const styles = {
    backgroundColor: isHeld ? '#59E391' : 'white',
  }
  const Dot = () => <span className='dot' />

  const Face = ({ children }) => (
    <div className='die-face' style={styles} onClick={holdDice}>
      {children}
    </div>
  )

  let dots = Number.isInteger(value)
    ? Array(value)
        .fill(0)
        .map((_, i) => <Dot key={i} />)
    : null
  return (
    <Face>{dots}</Face>
    /*<div className='die-face' style={styles} onClick={holdDice}>
      <h2 className='die-num'>{value}</h2>
    </div>*/
  )
}
