import React from 'react'
import './App.css'

export default function Die({ value, holdDice, isHeld }) {
  const styles = {
    backgroundColor: isHeld ? '#240046' : 'white',
  }

  const dotHeld = {
    backgroundColor: isHeld ? '#fff' : '#240046',
  }

  const Dot = () => <span className='dot' style={dotHeld} />

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
  return <Face>{dots}</Face>
}
