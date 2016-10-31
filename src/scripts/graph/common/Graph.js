import {select} from 'd3-selection'


export default class Graph {

  getDefaultOptions() {
    return {
      size : [800, 500]
    }
  }

  constructor(container, options) {
    this.visualizations = {}
    this.container = container
    this.root = select(container)
    this.svg = this.root.append('svg')
    this.defs = this.svg.append('defs')
    this.rootGroup = this.svg.append("g").attr("class", "root")
    this.visuGroup = this.rootGroup.append("g").attr("class", "visualisations")
    this.onInit(this.rootGroup, this.visuGroup)
    this.setOptions(options)
  }

  setOptions(options) {
    this.options = Object.assign({}, this.getDefaultOptions(), options)
    //trigger option setters
    Object.assign(this, this.options)
  }

  set size([width, height]) {
    this.options.size = [width, height]
    this.svg.attr('width', width)
    this.svg.attr('height', height)
    this.onSizeUpdate(width, height)
  }

  get size() {
    return this.options.size
  }

  createVisualization(name, Visu, options) {
    //TODO maybe import all known visualizations and create them by name
    this.visualizations[name] = new Visu(this.visuGroup, options)
  }

  hideVisualization(name) {
    this.visualizations[name].hide()
  }

  showVisualization(name) {
    this.visualizations[name].show()
  }

  setVisualisationData(name, data) {
    this.visualizations[name].setData(data)
    this.refresh()
  }

  refreshVisualisations(...args) {
    for (let name in this.visualizations) {
      let visu = this.visualizations[name]
      visu.visible && visu.refresh(...args)
    }
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

  refresh() {
    //to be implemented by subclass
  }

  destroy() {
    //to be implemented by subclass
  }
}
