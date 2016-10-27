import {mix} from 'mixwith'
import Graph from './common/Graph.js'
import Paddable from './common/Paddable.js'
import Resizeable from './common/Resizeable.js'
import {event} from 'd3-selection'
import {line} from 'd3-shape'
import {extent} from 'd3-array'
import {axisLeft, axisBottom} from 'd3-axis'
import {scaleLinear, scaleTime} from 'd3-scale'
import {brush} from 'd3-brush'

export default class GraphTradesMinimap extends mix(Graph).with(Resizeable, Paddable) {

  onInit(group) {
    this.group = group
    this.group.attr("class", "trades minimap")
    this.setPadding({top:30, bottom:30, left:80, right:30})

    //scales & axis
    this.xScale = scaleTime()
    this.yScale = scaleLinear()
    this.xAxisGroup = this.group.append("g")
      .attr("class", "axis axis-x")
    this.yAxisGroup = this.group.append("g")
      .attr("class", "axis axis-y")
      .attr('transform', `translate(${this.padding.left}, ${this.padding.top})`)
    this.axisBottom = axisBottom(this.xScale)
    this.axisLeft = axisLeft(this.yScale)

    //graph content
    this.drawGroup = this.group.append("g")
      .attr("class", "draw")
      .attr('transform', `translate(${this.padding.left}, ${this.padding.top})`)
    this.path = this.drawGroup.append("path")
      .attr("class", "line")
    this.line = line()
      .x((d) => this.xScale(d.date))
      .y((d) => this.yScale(d.rate))

    //brush
    this.brush = brush().on('end', this.onBrushEnd.bind(this))
    this.brushGroup = this.drawGroup.append("g")
      .attr("class", "brush")
      .call(this.brush)
  }


  onSizeUpdate(width, height) {
    this.computePaddedSize(width, height)
    this.xScale.range([0, this.width_padded])
    this.yScale.range([this.height_padded, 0])
    this.brush.extent([
      [0, 0],
      [this.width_padded, this.height_padded]
    ])
    this.xAxisGroup
      .call(this.translate, this.padding.left, this.height-this.padding.bottom)
    if (height <= 200) {
      this.axisLeft.ticks(5)
    }
    this.refresh()
  }


  onDataUpdate(data) {
    this.data = data
    //update scales
    this.xScale.domain(extent(this.data, (d) => d.date)).nice()
    this.yScale.domain(extent(this.data, (d) => d.rate)).nice()
    //update line data
    this.path.datum(data)
    //redraw
    this.refresh()
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

  setBrush(daterange, raterange) {
    //console.log('set brush', daterange, raterange)
    if (!daterange || !raterange) return
    this.brushGroup.call(this.brush.move, [
      [this.xScale(daterange[0]), this.yScale(raterange[1])],
      [this.xScale(daterange[1]), this.yScale(raterange[0])]
    ])
  }

  //onResize(width, height) {
  //  super.setSize(width, height);
  //}

  refresh() {
    if (!this.data || !this.data.length) return
    this.brushGroup.call(this.brush)
    this.xAxisGroup.call(this.axisBottom)
    this.yAxisGroup.call(this.axisLeft)
    this.path.attr('d', this.line)
  }


}
