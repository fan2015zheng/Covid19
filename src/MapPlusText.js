import React, { useState } from 'react'
import Map from './Map'
import Utils from './Utils.js'
import HistoryGraph from './HistoryGraph'
import './MapPlusText.css'

export default function MapPlusText() {

  const [history, setHistory] = useState([])
  const [stateId, setStateId] = useState()
  const [prevStateId, setPrevStateId] = useState(0)
  const [oState, setoState] = useState({})

  function selectLocation (stateId) {
    setStateId(parseInt(stateId))
  }
  
  if (stateId && stateId !== prevStateId) {
    const state = Utils.getUsState(stateId)
    setoState(state)
    setPrevStateId(stateId)
    const abbr = state.abbreviation.toLowerCase()

    fetch(`https://covidtracking.com/api/v1/states/${abbr}/daily.json`)
    .then(res => res.json())
    .then(data => {
      setHistory(data)
    })
  }

  let stateInfo = null
  let dataSource = null
  if (history.length > 0) {
    stateInfo = (
    <div className="col-md">
      <HistoryGraph history={history} state={oState}/>
    </div>
    )
  }
  else {
    dataSource =  (
      <div className="text-info p-1 mt-2 pt-2 _source">
        Data source: covidtracking.com
      </div>
    )
  }
  return(
    <>    
      <div className="row mt-2">
        <div className="col-md">
          <Map selectLocation={selectLocation}/>
        </div>
        {stateInfo}
      </div>
      {dataSource}
    </>
  )
}