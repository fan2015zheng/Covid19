import React, {useRef, useState} from 'react'
import './HistoryGraph.css'
import * as d3 from 'd3'

export default function HistoryGraph({state, history}) {
  
  const [isCase, setIsCase] = useState(false)
  const caseBtnr = useRef()
  const deathBtnr = useRef()
  const viewBoxWidth = 400
  const viewBoxHeight = 200

  const current = history[0]
 console.log(current)
  const svgr = useRef()
  const svg = d3.select(svgr.current)
  
  const xScale = d3.scaleLinear()
    .domain([0, history.length-1])
    .range([viewBoxWidth, 0])

  const yScale = d3.scaleLinear()
    .domain([0, current ? (isCase ? current.positive: current.death) : 1000])
    .range([viewBoxHeight, 0])

  svg
    .select('#xAxis')
    .style("transform", `translateY(${viewBoxHeight}px)`)
    .call(d3.axisBottom(xScale))

  svg
    .select('#yAxis')
    .call(d3.axisLeft(yScale).ticks(5))

  const line = d3.line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(isCase ? d.positive : d.death))
    .curve(d3.curveBasis)

  svg.selectAll(".line")
    .data([history])
    .join("path")
    .attr("class", "line")
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "black")

  function caseGraph() {
    selectBtn(caseBtnr.current)
    unSelectBtn(deathBtnr.current)
    setIsCase(true)
  }

  function deathGraph() {
    selectBtn(deathBtnr.current)
    unSelectBtn(caseBtnr.current)
    setIsCase(false)
  }

  function selectBtn(btn) {
    btn.classList.remove("btn-info")
    btn.classList.add("btn-info")
    btn.classList.add("text-white")
  }

  function unSelectBtn(btn) {
    btn.classList.remove("btn-info")
    btn.classList.remove("text-white")
    btn.classList.add("btn-outline-secondary")
  }

  return (
    <>
      <div className="_stateName text-info">{state.name}</div>
      <div className="row">
        <div className="col">
          <small>Total cases</small> {current?.positive}
        </div>
        <div className="col">
          <small>Total death</small> {current?.death}
        </div>
      </div>
   
      <div className="mt-3">
        <button ref={caseBtnr}  className="btn btn-sm btn-outline-secondary" onClick={caseGraph}>Cases</button>
        <button ref={deathBtnr} className="btn btn-sm btn-info ml-1" onClick={deathGraph}>Deaths</button>
      </div>
      <svg ref={svgr} className="_histSvg" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
        <g id="xAxis" />
        <g id="yAxis" />
      </svg>
      <div className="_xPlain float-right">x-axis indicates x days ago</div>
    </>
  )
}