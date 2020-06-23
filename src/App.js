import React, {useState} from 'react'
import './App.css'
import Map from './Map'
import Data from './Data'

function App() {
  
  const [stateId, setStateId] = useState()

  function selectLocation (stateId) {
    setStateId(parseInt(stateId))
  }

  return (<>
    <h2 className="text-center">Covid-19 USA data</h2>
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <Map selectLocation={selectLocation}/>
        </div>
        <div className="col-sm">
          <Data stateId={stateId}/>
        </div>
      </div>
    </div>
   
  </>);
}

export default App;
