import React from 'react'
import './App.css'
import Map from './Map'

function App() {
  
  return (<>
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="text-center">Covid-19 USA data</h2>
          <Map />
        </div>
      </div>
    </div>
   
  </>);
}

export default App;
