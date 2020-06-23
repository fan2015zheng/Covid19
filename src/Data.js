import React, {useState, useEffect} from 'react'
import './Data.css'
import Utils from './Utils.js'

function Data({stateId}) {
  
  const [covid, setCovid] = useState({})
  const [prevStateId, setPrevStateId] = useState(0)

  if (!stateId) {
    return null
  }

  if (stateId != prevStateId) {
    const state = Utils.getUsState(stateId)
    console.log("haha",stateId)
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
   
  if (!covid.stateName) {
    return null
  }
  return(<>
    <h4>{covid.stateName}</h4>
    <div>{`Postive: ${covid.positive}`}</div>
    <div>{`Death: ${covid.death}`}</div>
  </>)
}

export default Data