import React, { useRef, useEffect } from 'react'
import './Map.css'
import * as d3 from 'd3'

function Map({selectLocation}) {
  const svgr = useRef()

  function DrawUSA(data) {
    const projection = d3.geoAlbersUsa()
    const path = d3.geoPath().projection(projection)

    const svg = d3.select(svgr.current)
    svg
      .selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "_statePath")
      .on("click", (d) => {
        
        const stateId = d.properties.STATE
        
        selectLocation(stateId)
      })
      .append("title")
      .text((d) => {
        console.log(d.properties.GEO_ID,d.properties.STATE, d.properties.NAME)
        return d.properties.NAME
      })
  }

  useEffect(() => {
    d3.json("./usa.json").then(DrawUSA)
  })

  return(<>
    <svg ref={svgr} className="_svg" viewBox="80 0 800 500"></svg>
  </>)
}

export default Map






