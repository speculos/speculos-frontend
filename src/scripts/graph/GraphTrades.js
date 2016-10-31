import {mix} from 'mixwith'
import Graph from './common/Graph.js'
import Zoomable from './common/Zoomable.js'
import Brushable from './common/Brushable.js'
import Resizeable from './common/Resizeable.js'
import {translate} from './common/helpers.js'
import {extent} from 'd3-array'
import {event} from 'd3-selection'
import {axisLeft, axisBottom} from 'd3-axis'
import {scaleLinear, scaleTime} from 'd3-scale'

let clipId = 0

export default class GraphTrades extends mix(Graph).with(Resizeable, Brushable, Zoomable) {

  getDefaultOptions() {
    return {
      size : [800, 500],
      padding : {top:30, bottom:30, left:80, right:30},
      enableZoom : true,
      enableBrush : false,
      showYAxis : true,
      showXAxis : true,
      onZoomEnd : null,
      onBrushEnd : null
    }
  }

  onInit(rootGroup, visuGroup) {
    this.group = rootGroup.attr("class", "trades")

    //scales & axis
    this.xScale = scaleTime()
    this.yScale = scaleLinear()
    this.xAxisGroup = this.group.append("g")
      .attr("class", "axis axis-x")
    this.yAxisGroup = this.group.append("g")
      .attr("class", "axis axis-y")

    //clipping
    clipId++
    this.clipRect = this.defs
      .append('clipPath').attr('id', 'clip' + clipId)
      .append('rect').attr('x', 0).attr('y', 0)

    //graph content
    this.visuGroup = visuGroup
      .attr('clip-path', `url(#clip${clipId})`)
      .style('pointer-events', 'all')
    this.bg = this.visuGroup.append('rect')
      .attr('class', 'zoom-capture')
      .style('visibility', 'hidden')
      .attr('x', 0).attr('y', 0)
  }

  set padding({top=0, bottom=0, left=0, right=0}) {
    this.options.padding = {top, bottom, left, right}
    this.yAxisGroup.call(translate, left, top)
    this.visuGroup.call(translate, left, top)
  }

  get padding() {
    return this.options.padding
  }

  set enableZoom(state) {
    this.options.enableZoom = state
    if (state) this.initZoom(this.visuGroup)
    if (!state) this.unbindZoom()
  }

  set enableBrush(state) {
    this.options.enableBrush = state
    if (state) this.initBrush(this.group).call(translate, this.padding.left, this.padding.top)
    if (!state) this.unbindBrush()
  }

  set showXAxis(state) {
    this.options.showXAxis = state
    this.xAxisGroup.style('display', state ? 'inherit' : 'none')
  }

  set showYAxis(state) {
    this.options.showYAxis = state
    this.yAxisGroup.style('display', state ? 'inherit' : 'none')
  }


  onSizeUpdate(width, height) {
    this.width = width
    this.height = height
    this.width_padded = width - this.padding.right - this.padding.left
    this.height_padded = height - this.padding.top - this.padding.bottom
    this.xScale.range([0, this.width_padded])
    this.yScale.range([this.height_padded, 0])
    this.bg.attr('width', this.width_padded).attr('height', this.height_padded)
    this.clipRect.attr('width', this.width_padded).attr('height', this.height_padded)
    this.xAxisGroup.call(translate, this.padding.left, this.height-this.padding.bottom)
    this.brush && this.brush.extent([[0, 0], [this.width_padded, this.height_padded]])
    this.brush && this.setBrush(this.brushDateRange, this.brushRateRange)
    this.zoom && this.resetZoom()
    this.refresh()
  }


  setScaleDomains({daterange, raterange}) {
    if (daterange) this.xScale.domain(daterange)
    if (raterange) this.yScale.domain(raterange)
    this.zoom && this.resetZoom()
    this.refresh()
  }

  setBrush(daterange, raterange) {
    if (!daterange || !raterange) return
    this.brushDateRange = daterange
    this.brushRateRange = raterange
    this.brushGroup.call(this.brush.move, [
      [this.xScale(daterange[0]), this.yScale(raterange[1])],
      [this.xScale(daterange[1]), this.yScale(raterange[0])]
    ])
  }

  setScaleDomainsFromData(data) {
    //we add some margin to the y scale
    let xExtent = extent(data, (d) => d.date)
    let yExtent = extent(data, (d) => d.rate)
    let yMargin = 0.02 * (yExtent[1] - yExtent[0])
    yExtent[0] -= yMargin
    yExtent[1] += yMargin
    this.yScale.domain(yExtent).nice()
    this.xScale.domain(xExtent).nice()
    this.zoom && this.resetZoom()
  }


  onZoom() {
    this.zoomXScale = event.transform.rescaleX(this.xScale)
    this.zoomYScale = event.transform.rescaleY(this.yScale)
    this.refresh()
  }


  onZoomEnd(type) {
    if (!this.zoomXScale) return
    if (!type) return  //return on programatic event
    let [start, end] = this.zoomXScale.domain()
    let rateDomain = this.zoomYScale.domain()
    if (this.options.onRangeChange) {
      this.options.onRangeChange([+start, +end], rateDomain)
    }
  }

  onBrushEnd() {
    //only trigger callback on manual brush
    if (event.sourceEvent && event.sourceEvent.type === "mouseup") {
      if (!this.options.onBrushEnd) return
      if (!event.selection || !event.selection.length) return
      let [[x0,y0],[x1,y1]] = event.selection
      this.options.onBrushEnd(
        [+this.xScale.invert(x0), +this.xScale.invert(x1)],
        [this.yScale.invert(y1), this.yScale.invert(y0)]
      )
    }
  }

  refresh() {
    let xScale = this.zoomXScale || this.xScale
    let yScale = this.zoomYScale || this.yScale
    this.xAxisGroup.call(axisBottom(xScale))
    this.yAxisGroup.call(axisLeft(yScale))
    this.brush && this.brushGroup.call(this.brush)
    this.refreshVisualisations(xScale, yScale)
  }


}
