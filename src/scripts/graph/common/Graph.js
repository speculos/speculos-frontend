import isEmpty from 'is-empty-object'
import {select} from 'd3-selection'

const defaults = {
  width : 800,
  height : 500
}

export default class Graph {

  constructor(container, options) {
    this.container = container
    this.options = Object.assign({}, defaults, options)
    this.root = select(this.container)
    this.svg = this.root.append('svg')
    this.defs = this.svg.append('defs')
    this.group = this.svg.append("g").attr("class", "root")
    this.onInit(this.group)
    this.setSize(this.options.width, this.options.height)
  }

  setSize(width, height) {
    this.width = width
    this.height = height
    this.svg.attr('width', width)
    this.svg.attr('height', height)
    this.onSizeUpdate(width, height)
  }

  setData(data) {
    if (!data || isEmpty(data)) return
    this.data = data
    this.onDataUpdate(data)
  }

  /**
   * Transform helper. It will remove previous transform attribute.
   */
  translate(selection, x, y) {
    selection.attr('transform', `translate(${x}, ${y})`)
  }

  onInit(/*group*/) {
    //to be implemented by subclass
  }

  onSizeUpdate(/*width, height*/) {
    //to be implemented by subclass
  }

  onDataUpdate(/*data*/) {
    //to be implemented by subclass
  }

  destroy() {
    //to be implemented by subclass
  }
}
