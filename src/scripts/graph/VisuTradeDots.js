import Visualization from './common/Visualization.js'
import {scaleLog} from 'd3-scale'
import d3tip from 'd3-tip'
import '../../styles/d3tip.css'


export default class VisuTradeDots extends Visualization {

  onInit(group) {
    this.group = group.attr("class", "dots")
    this.dotScale = scaleLog().domain([0.001, 1000]).range([1, 20]).clamp(true)
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
    this.group.call(this.tip)
  }


  onData(data) {
    let tip = this.tip
    let dots = this.group.selectAll('circle').data(data, (d) => d.id)
    //remove
    dots.exit().remove()
    //create & update
    dots
      .enter()
        .append("circle")
        .attr("class", "dot")
        .on('mouseover', function (d) { tip.show(d, this) })
        .on('mouseout', this.tip.hide)
      .merge(dots)
        .attr("r", (d) => this.dotScale(d.amount))
        .classed("buy", (d) => d.type == "BUY")
        .classed("sell", (d) => d.type == "SELL")
  }


  refresh(xScale, yScale) {
    this.group.selectAll('circle')
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.rate))
  }


}
