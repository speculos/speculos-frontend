import Visualisation from './Visualization.js'
import {scaleLog} from 'd3-scale'
import d3tip from 'd3-tip'
import d3tipcss from '../../styles/d3tip.css';

export default class VisuTradeDots extends Visualisation {
  constructor(...args) {
    super(...args);
    this.group.attr("class", "dots")
    this.dotScale = scaleLog().domain([0.0000001, 1000]).range([0, 20]).clamp(true);
    this.tip = d3tip()
      .attr('class', 'd3-tip')
      .html(function(d) { return d.amount })
      .direction('n')
      .offset([-10, 0])
    this.group.call(this.tip);
  }

  setData(data) {
    this.data = data;
    let dots = this.group.selectAll('circle').data(data)
    let tip = this.tip;
    dots.enter()
      //create
      .append("circle")
      .attr("class", "dot")
      .on('mouseover', function (d) { tip.show(d, this) })
      .on('mouseout', this.tip.hide)
      //update
      .merge(dots)
      .attr("r", (d) => this.dotScale(d.amount))
      .attr("cx", (d) => this.xScale(d.date))
      .attr("cy", (d) => this.yScale(d.rate))
      .classed("buy", (d) => d.type == "buy")
      .classed("sell", (d) => d.type == "sell")
      //remove
      .exit()
      .remove()
  }

  refresh() {
    this.onResize();
  }

  onZoom(zoomXScale, zoomYScale) {
    this.group.selectAll('circle')
      .attr("cx", (d) => zoomXScale(d.date))
      .attr("cy", (d) => zoomYScale(d.rate))
  }

  onResize() {
    this.group.selectAll('circle')
      .attr("cx", (d) => this.xScale(d.date))
      .attr("cy", (d) => this.yScale(d.rate))
  }
}
