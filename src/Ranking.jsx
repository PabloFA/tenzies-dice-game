import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

export default function Ranking(ranking) {
  function turnToSeconds(time) {
    const timer = time.split(':')
    const minutes = parseInt(timer[0])
    const seconds = parseInt(timer[1])
    return minutes * 60 + seconds
  }

  function comparedTimes(a, b) {
    const timeA = turnToSeconds(a.rankingTime)
    const timeB = turnToSeconds(b.rankingTime)
    return timeA - timeB
  }

  const sortedRanking = ranking.ranking.sort(comparedTimes)
  const topThree = sortedRanking.slice(0, 3)

  const rankingPlaces = topThree.map((place, index) => {
    let trophyColor
    if (index === 0) {
      trophyColor = '#FFB800'
    } else if (index === 1) {
      trophyColor = '#F8823D'
    } else {
      trophyColor = '#C2C2C3'
    }

    const trophyStyle = { color: trophyColor }

    return (
      <div className='row' key={place.id}>
        <div className='trophy'>
          <p className='tab-content'>{index + 1}</p>
          <FontAwesomeIcon icon={faTrophy} style={trophyStyle} />
        </div>
        <div>
          <p className='tab-content'>{place.rankingTime}</p>
        </div>
        <div>
          <p className='tab-content'>{place.rankingRolls}</p>
        </div>
      </div>
    )
  })

  return (
    <div className='table'>
      <div className='tab-header'>
        <div className='row'>
          <div>
            <h2 className='die-num'>Place</h2>
          </div>
          <div>
            <h2 className='die-num'>Time</h2>
          </div>
          <div>
            <h2 className='die-num'>Rolls</h2>
          </div>
        </div>
      </div>

      <div className='tab-body'>{rankingPlaces}</div>

      <h2 className='die-num'>
        {JSON.parse(localStorage.getItem('ranking.rankingTime'))}
      </h2>
    </div>
  )
}
