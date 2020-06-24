import React, {useState} from 'react'
import './App.css'
import MapPlusText from './MapPlusText'


function App() {

  const [covid, setCovid] = useState({})
  
  if (!covid.lastModified) {
    
    fetch("https://covidtracking.com/api/v1/us/current.json")
    .then(res => res.json())
    .then(data => {
      console.log(data[0].lastModified)
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
          <div className="_date">{ covid.lastModified && covid.lastModified.split('T')[0]}</div>
        </div>
        <div className="col-sm">
          <div className="row"> 
            <div className="col pt-1">
              <div>Total cases</div>
              <div className="font-weight-bold">{covid.positive}</div>
            </div>
            <div className="col pt-1">
              <div>Total death</div>
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
