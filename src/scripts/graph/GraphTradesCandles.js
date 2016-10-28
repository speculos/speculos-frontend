import {mix} from 'mixwith'
import debounce from 'lodash/debounce'
import Graph from './common/Graph.js'
import Paddable from './common/Paddable.js'
import Zoomable from './common/Zoomable.js'
import Resizeable from './common/Resizeable.js'
import {extent} from 'd3-array'
import {event} from 'd3-selection'
import {axisLeft, axisBottom} from 'd3-axis'
import {scaleLinear, scaleTime} from 'd3-scale'
import d3tip from 'd3-tip'
import '../../styles/d3tip.css'


export default class GraphTradesCandles extends mix(Graph).with(Resizeable, Paddable, Zoomable) {

  onInit(group) {
    this.group = group.attr("class", "trades candles")
    this.setPadding({top:30, bottom:30, left:80, right:30})

    //scales & axis
    this.xScale = scaleTime()
    this.yScale = scaleLinear()
    this.xAxisGroup = this.group.append("g")
      .attr("class", "axis axis-x")
    this.yAxisGroup = this.group.append("g")
      .attr("class", "axis axis-y")
      .call(this.translate, this.padding.left, this.padding.top)

    //clipping
    this.clipRect = this.defs
      .append('clipPath').attr('id', 'clip')
      .append('rect').attr('x', 0).attr('y', 0)

    //graph content
    this.drawGroup = this.group.append("g")
      .attr("class", "draw")
      .attr('clip-path', 'url(#clip)')
      .style('pointer-events', 'all')
      .call(this.translate, this.padding.left, this.padding.top)
    this.bg = this.drawGroup.append('rect')
      .attr('class', 'zoom-capture')
      .style('visibility', 'hidden')
      .attr('x', 0).attr('y', 0)

    //tooltip
    this.tip = d3tip()
      .attr('class', 'd3-tip')
      .html(function(d) {
        return `
          <span>Date   : ${new Date(d.date).toLocaleTimeString()}</span><br/>
          <span>Entry  : ${d.entry}</span><br/>
          <span>Close  : ${d.close}</span><br/>
          <span>Min    : ${d.min}</span><br/>
          <span>Max    : ${d.max}</span><br/>
          <span>Volume : ${d.volume}</span>
          `
      })
      .direction('n')
      .offset([-10, 0])
    this.drawGroup.call(this.tip)

    //zoom
    this.initZoom(this.drawGroup)
    //custom zoom end event (https://github.com/d3/d3-zoom/issues/68)
    let debouncedZoomEnd = debounce(this.onZoomEnd, 200).bind(this)
    this.zoom.on('zoom.end', () => {
      let type = event && event.sourceEvent && event.sourceEvent.type
      debouncedZoomEnd(type)
    })
    this.drawGroup.on('dblclick.zoom', null)  //disable double click zoom
  }

  onSizeUpdate(width, height) {
    this.computePaddedSize(width, height)
    this.xScale.range([0, this.width_padded])
    this.yScale.range([this.height_padded, 0])
    this.bg.attr('width', this.width_padded).attr('height', this.height_padded)
    this.clipRect.attr('width', this.width_padded).attr('height', this.height_padded)
    this.xAxisGroup
      .call(this.translate, this.padding.left, this.height-this.padding.bottom)
    this.resetZoom()
    this.refresh()
  }

  onDataUpdate(data) {
    if (!data || !data.length) return
    this.data = data
    let tip = this.tip
    let candles = this.drawGroup.selectAll('g.candle').data(data, (d) => d.id)
    //remove
    candles.exit().remove()
    candles.enter()
      //create
      .append("g")
      .attr("class", "candle")
      .call(candle => {
        candle.append("line").attr("class", "shadow")
        candle.append("rect").attr("class", "body")
      })
      .on('mouseover', function (d) { tip.show(d, this) })
      .on('mouseout', this.tip.hide)
      //update
      .merge(candles)
      .classed("bullish", (d) => d.entry < d.close)
      .classed("bearish", (d) => d.entry > d.close)

    this.refresh()
  }

  setScaleDomains({daterange, raterange}) {
    if (daterange) this.xScale.domain(daterange)
    if (raterange) this.yScale.domain(raterange)
    this.resetZoom()
    this.refresh()
  }


  onZoom() {
    if (!this.data || !this.data.length) return
    this.zoomXScale = event.transform.rescaleX(this.xScale)
    this.zoomYScale = event.transform.rescaleY(this.yScale)
    this.refresh()
  }

  onZoomEnd(type) {
    if (!type) return  //return on programatic event
    //if (event.sourceEvent && event.sourceEvent.type === "mouseup")
    let [start, end] = this.zoomXScale.domain()
    let rateDomain = this.zoomYScale.domain()
    if (this.options.onRangeChange) {
      this.options.onRangeChange([+start, +end], rateDomain)
    }
  }

  setBaseScaleDomains() {
    if (this.zoomXScale) return  //only init on first data
    //we add some margin to the y scale
    let xExtent = extent(this.data, (d) => d.date)
    let yExtent = extent(this.data, (d) => d.rate)
    let yMargin = 0.02 * (yExtent[1] - yExtent[0])
    yExtent[0] -= yMargin
    yExtent[1] += yMargin
    this.yScale.domain(yExtent).nice()
    this.xScale.domain(xExtent).nice()
    this.resetZoom()
  }


  refresh() {
    if (!this.data || !this.data.length) return
    let xScale = this.zoomXScale || this.xScale
    let yScale = this.zoomYScale || this.yScale
    this.xAxisGroup.call(axisBottom(xScale))
    this.yAxisGroup.call(axisLeft(yScale))
    let bandWidth = xScale(5*60*1000) - xScale(0)
    let bandMargin = bandWidth * 0.2
    this.drawGroup.selectAll('g.candle').call(candle => {
      candle.select('rect')
        .attr("x", (d) => xScale(d.date) + bandMargin/2)
        .attr("y", (d) => Math.min(yScale(d.entry), yScale(d.close)))
        .attr("height", (d) => Math.abs(yScale(d.entry) - yScale(d.close)))
        .attr("width", bandWidth * 0.8)
        .attr("rx", bandMargin/6)
        .attr("ry", bandMargin/6)
      candle.select('line')
        .style("stroke-width", bandMargin/2)
        .attr("x1", (d) => xScale(d.date) + bandWidth/2)
        .attr("x2", (d) => xScale(d.date) + bandWidth/2)
        .attr("y1", (d) => yScale(d.min))
        .attr("y2", (d) => yScale(d.max))
    })
  }


}
