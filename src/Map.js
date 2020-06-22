import React, { useRef, useEffect } from 'react'
import './Map.css'
import * as d3 from 'd3'

function Map() {
  const svgr = useRef()

  useEffect(() => {
    d3.json("./usa.json").then(DrawUSA)
  }, [])

  function DrawUSA(data) {
    const projection = d3.geoAlbersUsa()
    const path = d3.geoPath().projection(projection)

    const svg = d3.select(svgr.current)
    const g = svg.append("g")

    svg
      .call(d3.zoom().on('zoom', () => {
        g.attr("transform", d3.event.transform)
      }))
   

    g
      .selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "_statePath")
      .append("title")
      .text((d) => {
        return d.properties.NAME
      })
  }

  return(<>
    <svg ref={svgr} className="_svg" viewBox="80 0 800 500"></svg>
  </>)
}

export default Map






