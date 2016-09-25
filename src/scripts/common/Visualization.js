
export default class Visualisation {
  constructor(rootGroup) {
    this.rootGroup = rootGroup;
    this.svg = $(this.rootGroup).parents('svg');
    this.group = this.rootGroup.append('g');
  }

  setData(data) {
    this.data = data;
  }

  setScales(xScale, yScale) {
    this.xScale = xScale;
    this.yScale = yScale;
  }

  refresh() {
    console.warn('Visualisation::refresh() not implemented');
  }

  show() {
    this.group.style('display', 'inline');
  }

  hide() {
    this.group.style('display', 'none');
  }

  onZoom() {
    console.warn('Visualisation::onZoom() not implemented');
  }

  onResize() {
    console.warn('Visualisation::onResize() not implemented');
  }
}
