import {mix} from 'mixwith'
import debounce from 'lodash/debounce'
import Graph from './common/Graph.js'
import Paddable from './common/Paddable.js'
import Zoomable from './common/Zoomable.js'
import Resizeable from './common/Resizeable.js'
import {extent} from 'd3-array'
import {event} from 'd3-selection'
import {axisLeft, axisBottom} from 'd3-axis'
import {scaleLinear, scaleTime, scaleLog} from 'd3-scale'
import d3tip from 'd3-tip'
import '../../styles/d3tip.css'


export default class GraphTradesDots extends mix(Graph).with(Resizeable, Paddable, Zoomable) {

  onInit(group) {
    this.group = group.attr("class", "trades dots")
    this.setPadding({top:30, bottom:30, left:80, right:30})

    //scales & axis
    this.xScale = scaleTime()
    this.yScale = scaleLinear()
    this.dotScale = scaleLog().domain([0.001, 1000]).range([1, 20]).clamp(true)
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
          <span>Type : ${d.type}</span><br/>
          <span>Date : ${new Date(d.date).toLocaleTimeString()}</span><br/>
          <span>Rate : ${d.rate}</span><br/>
          <span>Amount : ${d.amount}</span>
          `
      })
      .direction('n')
      .offset([-10, 0])
    this.drawGroup.call(this.tip)

    //zoom
    this.initZoom(this.drawGroup)
    //custom zoom end event (https://github.com/d3/d3-zoom/issues/68)
    //  this.zoom.on('end', this.onZoomEnd.bind(this))
    let debouncedZoomEnd = debounce(this.onZoomEnd, 200).bind(this)
    this.zoom.on('zoom.end', () => {
      let type = event && event.sourceEvent && event.sourceEvent.type
      debouncedZoomEnd(type)
    })
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
    //this.setBaseScaleDomains()
    let dots = this.drawGroup.selectAll('circle').data(data, (d) => d.id)
    let tip = this.tip
    dots.enter()
      //create
      .append("circle")
      .attr("class", "dot")
      .on('mouseover', function (d) { tip.show(d, this) })
      .on('mouseout', this.tip.hide)
      //update
      .merge(dots)
      .attr("r", (d) => this.dotScale(d.amount))
      .classed("buy", (d) => d.type == "BUY")
      .classed("sell", (d) => d.type == "SELL")
    //remove
    dots.exit().remove()
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
    this.drawGroup.selectAll('circle')
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.rate))
  }


}
