import isEmpty from 'is-empty-object'

/* eslint no-unused-vars:'off' */

const defaults = {

}

export default class Visualization {

  constructor(rootGroup, options) {
    this.visible = true
    this.options = Object.assign({}, defaults, options)
    this.rootGroup = rootGroup
    this.svg = $(this.rootGroup).parents('svg')
    this.defs = $(this.svg).find('defs')
    this.group = this.rootGroup.append('g')
    this.onInit(this.group)
  }

  show() {
    this.visible = true
    this.group.style('visibility', 'visible')
  }

  hide() {
    this.visible = false
    this.group.style('visibility', 'hidden')
  }

  setData(data) {
    if (!data || isEmpty(data)) return
    this.data = data
    this.onData(data)
  }

  onInit(group) {
    //to be implemented by subclass
  }

  onData(data) {
    //to be implemented by subclass
  }

  refresh(xScale, yScale) {
    //to be implemented by subclass
  }

}
