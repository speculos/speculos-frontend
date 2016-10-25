import {mix} from 'mixwith'
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
    if (!this.data || !this.data.length) return
    this.data = data
    this.updateScaleDomains()
    let dots = this.drawGroup.selectAll('circle').data(data)
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
      .exit()
      .remove()
    this.refresh()
  }

  onZoom() {
    if (!this.data || !this.data.length) return
    this.zoomXScale = event.transform.rescaleX(this.xScale)
    this.zoomYScale = event.transform.rescaleY(this.yScale)
    this.xAxisGroup.call(axisBottom(this.zoomXScale))
    this.yAxisGroup.call(axisLeft(this.zoomYScale))
    this.group.selectAll('circle')
      .attr("cx", (d) => this.zoomXScale(d.date))
      .attr("cy", (d) => this.zoomYScale(d.rate))
  }

  updateScaleDomains() {
    //we add some margin to the y scale
    let yExtent = extent(this.data, (d) => d.rate)
    let yMargin = 0.02 * (yExtent[1] - yExtent[0])
    yExtent[0] -= yMargin
    yExtent[1] += yMargin
    this.yScale.domain(yExtent).nice()
    this.xScale.domain(extent(this.data, (d) => d.date)).nice()
  }


  refresh() {
    if (!this.data || !this.data.length) return
    this.xAxisGroup.call(axisBottom(this.xScale))
    this.yAxisGroup.call(axisLeft(this.yScale))
    this.drawGroup.selectAll('circle')
      .attr("cx", (d) => this.xScale(d.date))
      .attr("cy", (d) => this.yScale(d.rate))
  }


}
