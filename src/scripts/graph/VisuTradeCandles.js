import Visualization from './common/Visualization.js'
import d3tip from 'd3-tip'
import '../../styles/d3tip.css'


export default class VisuTradeCandles extends Visualization {

  onInit(group) {
    this.group = group.attr("class", "candles")
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
    this.group.call(this.tip)
  }


  onData(data) {
    let tip = this.tip
    let candles = this.group.selectAll('g.candle').data(data, (d) => d.date)
    //remove
    candles.exit().remove()
    //create & update
    candles
      .enter()
        .append("g")
        .attr("class", "candle")
        .call(candle => {
          candle.append("line").attr("class", "shadow")
          candle.append("rect").attr("class", "body")
        })
        .on('mouseover', function (d) { tip.show(d, this) })
        .on('mouseout', this.tip.hide)
      .merge(candles)
        .classed("bullish", (d) => d.entry < d.close)
        .classed("bearish", (d) => d.entry > d.close)
  }


  refresh(xScale, yScale) {
    //TODO get candle period from options
    let bandWidth = xScale(5*60*1000) - xScale(0)
    let bandMargin = bandWidth * 0.2
    this.group.selectAll('g.candle').call(candle => {
      candle.select('rect')
        .attr("x", (d) => xScale(d.date) + bandMargin/2)
        .attr("y", (d) => Math.min(yScale(d.entry), yScale(d.close)))
        .attr("height", (d) => Math.abs(yScale(d.entry) - yScale(d.close)))
        .attr("width", bandWidth * 0.8)
        //.attr("rx", bandMargin/6)
        //.attr("ry", bandMargin/6)
      candle.select('line')
        .style("stroke-width", bandMargin/2)
        .attr("x1", (d) => xScale(d.date) + bandWidth/2)
        .attr("x2", (d) => xScale(d.date) + bandWidth/2)
        .attr("y1", (d) => yScale(d.min))
        .attr("y2", (d) => yScale(d.max))
    })
  }


}
