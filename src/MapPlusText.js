import React, { useState } from 'react'
import Map from './Map'
import Utils from './Utils.js'

export default function MapPlusText() {

  const [covid, setCovid] = useState({})
  const [stateId, setStateId] = useState()
  const [prevStateId, setPrevStateId] = useState(0)

  function selectLocation (stateId) {
    setStateId(parseInt(stateId))
  }

  if (stateId && stateId !== prevStateId) {
    const state = Utils.getUsState(stateId)
    setPrevStateId(stateId)
    fetch(`https://covidtracking.com/api/v1/states/${state.abbreviation.toLowerCase()}/current.json`)
    .then(res => res.json())
    .then(data => {
      setCovid(() => { return {
        stateName: state.name,
        positive: data.positive,
        death: data.death
      }})
    })
  }

  let stateText = null
  if (covid.stateName) {
    stateText = (
      <div className="col-md-3">
      <div className="pl-4 pt-3 pl-md-0 pt-md-5">
        <div className="font-weight-bold">{covid.stateName}</div>
        <div>Total cases: {covid.positive}</div>
        <div>Total death: {covid.death}</div>
      </div>
    </div>
    )
  }
  return(
    <>    
      <div className="row">
        <div className="col-md-9">
          <Map selectLocation={selectLocation}/>
        </div>
        {stateText}
      </div>
    </>
  )
}