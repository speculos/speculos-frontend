import Visualization from './common/Visualization.js'
import {line} from 'd3-shape'

export default class VisuTradeLines extends Visualization {
  onInit(group) {
    this.group = group.attr("class", "line")
    this.path = this.group.append("path")
    this.line = line()
  }


  onData(data) {
    this.path.datum(data)
  }


  refresh(xScale, yScale) {
    this.line
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.rate))
    this.path.attr('d', this.line)
  }
}
