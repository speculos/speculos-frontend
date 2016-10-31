import {Mixin} from 'mixwith'
import {zoom, zoomIdentity} from 'd3-zoom'
import {event} from 'd3-selection'
import debounce from 'lodash/debounce'

export default Mixin((superclass) => class extends superclass {

  initZoom(element) {
    this.element = element
    this.zoom = zoom().on('zoom', this.onZoom.bind(this))
    this.element.call(this.zoom)

    //custom zoom end event (https://github.com/d3/d3-zoom/issues/68)
    let debouncedZoomEnd = debounce(this.onZoomEnd, 200).bind(this)
    this.zoom.on('zoom.end', () => {
      let type = event && event.sourceEvent && event.sourceEvent.type
      debouncedZoomEnd(type)
    })
    this.visuGroup.on('dblclick.zoom', null)  //disable double click zoom
  }

  unbindZoom() {
    this.zoom && this.zoom.on('zoom zoom.end', null)
  }

  resetZoom() {
    this.element.call(this.zoom.transform, zoomIdentity)
  }

  onZoom() {
    //console.log('Zoomable onZoom call')
  }

  onZoomEnd() {

  }

})
