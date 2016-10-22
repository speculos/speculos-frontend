import {mix} from 'mixwith'
import Graph from './common/Graph.js'
import Paddable from './common/Paddable.js'
import Resizeable from './common/Resizeable.js'
import {line} from 'd3-shape'
import {extent} from 'd3-array'
import {axisLeft, axisBottom} from 'd3-axis'
import {scaleLinear, scaleTime} from 'd3-scale'

export default class GraphTradesMinimap extends mix(Graph).with(Resizeable, Paddable) {

  onInit(group) {
    this.group = group
    this.group.attr("class", "trades minimap")
    this.setPadding({top:30, bottom:30, left:60, right:30})

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

  }


  onSizeUpdate(width, height) {
    this.computePaddedSize(width, height)
    this.xScale.range([0, this.width_padded])
    this.yScale.range([this.height_padded, 0])
    this.xAxisGroup
      .call(this.translate, this.padding.left, this.height-this.padding.bottom)
    if (height <= 200) {
      this.axisLeft.ticks(5)
    }
    this.refresh()
  }


  onDataUpdate(data) {
    //console.log('minimap data update', data.length);
    this.data = data
    //update scales
    this.xScale.domain(extent(this.data, (d) => d.date)).nice()
    this.yScale.domain(extent(this.data, (d) => d.rate)).nice()
    //update line data
    this.path.datum(data)
    //redraw
    this.refresh()
  }

  //onResize(width, height) {
  //  super.setSize(width, height);
  //}

  refresh() {
    if (!this.data || !this.data.length) return
    this.xAxisGroup.call(this.axisBottom)
    this.yAxisGroup.call(this.axisLeft)
    this.path.attr('d', this.line)
  }


}
