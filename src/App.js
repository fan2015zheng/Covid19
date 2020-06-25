import React, {useState} from 'react'
import './App.css'
import MapPlusText from './MapPlusText'

function App() {

  const [covid, setCovid] = useState({})
  
  if (!covid.lastModified) {
    
    fetch("https://covidtracking.com/api/v1/us/current.json")
    .then(res => res.json())
    .then(data => {
      setCovid(() => { return {
        positive: data[0].positive,
        death: data[0].death,
        lastModified: data[0].lastModified
      }})
    })
  }

  return (<> 
    
    <div className="container">
      
      <div className="row bg-info text-white p-2">
        <div className="col-sm _appTitle">
          Covid 19 USA 
          <div className="_date">Last update { covid.lastModified && covid.lastModified.split('T')[0]}</div>
        </div>
        <div className="col-sm">
          <div className="row"> 
            <div className="col pt-1">
              <div>US total cases</div>
              <div className="font-weight-bold">{covid.positive}</div>
            </div>
            <div className="col pt-1">
              <div>US total death</div>
              <div className="font-weight-bold">{covid.death}</div>
            </div>
          </div>
        </div>
      </div>     
      <MapPlusText />
    </div>
   
  </>);
}

export default App;
