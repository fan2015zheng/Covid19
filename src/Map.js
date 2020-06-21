import React, { useRef, useEffect } from 'react'
import './Map.css'
import * as d3 from 'd3'

function Map() {
  const svgr = useRef()

  useEffect(() => {
    d3.json("./usa.json").then(
      (states) => {
        const projection = d3.geoMercator()
        const path = d3.geoPath().projection(projection)
        
        const svg = d3.select(svgr.current)

        svg
          .selectAll("path")
          .data(states.features)
          .enter()
          .append("path")
          .attr("d", path)
      }
    )
  }, [])

  return(<React.Fragment>
    <svg ref={svgr} className="_svg"></svg>
  </React.Fragment>)
}

export default Map



