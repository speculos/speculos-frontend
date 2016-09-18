import {select as d3select} from 'd3-selection'
import ResizeDetector from 'element-resize-detector'

let onResize = ResizeDetector({strategy: "scroll"})

const defaultOptions = {
  width : 300,
  height : 100,
  fillContainer : false,
  autoResize : true,
  enableZoom : true,
  padding : {
    top : 0.1,
    bottom : 0.1,
    left : 0.1,
    right : 0.1
  }
}

export default class Graph {
  constructor(rootElement, options) {
    this.rootElement = rootElement;
    this.root = d3select(rootElement);
    this.svg = this.root.append('svg');
    this.options = options;
  }

  set options(value) {
    this._opts = Object.assign({}, defaultOptions, this._opts || {}, value);
    this.updateSize();
    this.updatePadding();
    this.toggleAutoResize(this._opts.autoResize);
  }

  updateSize() {
    if (!this._opts.fillContainer) {
      this.width = this._opts.width;
      this.height = this._opts.height;
    }
    else {
      this.width = this.rootElement.clientWidth;
      this.height = this.rootElement.clientHeight;
    }
    this.svg.attr('width', this.width)
    this.svg.attr('height', this.height)
  }

  //compute padding in pixels
  updatePadding() {
    this.padding = {
      left : this.width * this._opts.padding.left,
      right : this.width * this._opts.padding.right,
      top : this.height * this._opts.padding.top,
      bottom : this.height * this._opts.padding.bottom
    }
  }

  toggleAutoResize(state) {
    if (state) {
      onResize.listenTo(this.rootElement, () => this.onResize())
    }
    else {
      onResize.removeAllListeners(this.onResize)
    }
  }

  init() {
    this.rect = this.svg.append('rect');
  }

  draw() {
    this.rect
      .attr('x', this.padding.left)
      .attr('y', this.padding.top)
      .attr('width', this.width - this.padding.left - this.padding.right)
      .attr('height', this.height - this.padding.top - this.padding.bottom)
  }

  onResize() {
    this.updateSize();
    this.updatePadding();
    this.draw();
  }

  destroy() {
    onResize.uninstall(this.rootElement);
  }

}
