import {Mixin} from 'mixwith'
import {zoom, zoomIdentity} from 'd3-zoom'

export default Mixin((superclass) => class extends superclass {

  initZoom(element) {
    this.element = element
    this.zoom = zoom().on('zoom', this.onZoom.bind(this))
    this.element.call(this.zoom)
  }

  resetZoom() {
    this.element.call(this.zoom.transform, zoomIdentity)
  }

  onZoom() {
    console.log('Zoomable onZoom call')
  }

})
