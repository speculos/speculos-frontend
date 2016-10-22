import {Mixin} from 'mixwith'
import ResizeDetector from 'element-resize-detector'

export default Mixin((superclass) => class extends superclass {

  constructor(...args) {
    super(...args)
    this.resizeDetector = ResizeDetector({strategy: "scroll"})
    this.resizeDetector.listenTo(this.container, () => {
      this.onResize(this.container.clientWidth, this.container.clientHeight)
    })
  }

  onResize(width, height) {
    super.setSize(width, height)
  }

})
