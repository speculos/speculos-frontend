import {Mixin} from 'mixwith'
import {brush} from 'd3-brush'

export default Mixin((superclass) => class extends superclass {

  initBrush(element) {
    this.element = element

    this.brush = brush().on('end', this.onBrushEnd.bind(this))
    this.brushGroup = element.append("g")
      .attr("class", "brush")
      .call(this.brush)

  }

  unbindBrush() {
    this.brush && this.brush.on('end', null)
  }

  onBrushEnd() {
    //console.log('Zoomable onZoom call')
  }


})
