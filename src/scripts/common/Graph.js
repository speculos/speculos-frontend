import {extent} from 'd3-array'
import {select, event} from 'd3-selection'
import {zoom, zoomIdentity} from 'd3-zoom'
import {axisLeft, axisBottom} from 'd3-axis'
import {scaleLinear, scaleTime} from 'd3-scale'
import ResizeDetector from 'element-resize-detector'

let onResize = ResizeDetector({strategy: "scroll"})

const defaultOptions = {
  width : 300,
  height : 100,
  fillContainer : false,
  autoResize : true,
  enableZoom : false,
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
    this.init();
    this.options = options;
  }

  init() {
    this.root = select(this.rootElement);
    this.svg = this.root.append('svg');
    this.defs = this.svg.append('defs');
    this.clipRect = this.defs
      .append('clipPath').attr('id', 'clip')
      .append('rect').attr('x', 0).attr('y', 0);
    this.rootGroup = this.svg.append("g").attr("class", "root");
    this.xScale = scaleTime();
    this.yScale = scaleLinear();
    this.xAxisGroup = this.rootGroup.append("g").attr("class", "axis axis-x");
    this.yAxisGroup = this.rootGroup.append("g").attr("class", "axis axis-y");
    this.drawGroup = this.rootGroup.append("g").attr("class", "draw").attr('clip-path', 'url(#clip)');
    this.zoom = zoom().on('zoom', this.onZoom.bind(this));
    this.svg.call(this.zoom);
    this.visualisations = [];
  }

  set options(value) {
    this._opts = Object.assign({}, defaultOptions, this._opts || {}, value);
    this.toggleAutoResize(this._opts.autoResize);
    this.updateSizes();
  }

  addVisualisation(Visu) {
    let visu = new Visu(this.drawGroup);
    this.visualisations.push(visu);
  }

  toggleAutoResize(state) {
    if (state) {
      onResize.listenTo(this.rootElement, () => this.onResize())
    }
    else {
      onResize.removeAllListeners(this.onResize)
    }
  }

  updateSizes() {
    //get full svg width & height
    if (!this._opts.fillContainer) {
      this.fullwidth = this._opts.width;
      this.fullheight = this._opts.height;
    }
    else {
      this.fullwidth = this.rootElement.clientWidth;
      this.fullheight = this.rootElement.clientHeight;
    }
    this.svg.attr('width', this.fullwidth)
    this.svg.attr('height', this.fullheight)
    //compute padding in pixels
    this.padding = {
      left : this.fullwidth * this._opts.padding.left,
      right : this.fullwidth * this._opts.padding.right,
      top : this.fullheight * this._opts.padding.top,
      bottom : this.fullheight * this._opts.padding.bottom
    }
    //get with without padding
    this.width = this.fullwidth - this.padding.left - this.padding.right;
    this.height = this.fullheight - this.padding.top - this.padding.bottom;
    //apply changes
    this.clipRect.attr('width', this.width).attr('height', this.height)
    this.rootGroup.attr("transform", `translate(${this.padding.left}, ${this.padding.top})`);
    this.xAxisGroup.attr("transform", `translate(0, ${this.height})`);
    this.xScale.range([0, this.width]);
    this.yScale.range([0, this.height]);
    this.visualisations.forEach(visu => visu.setScales(this.xScale, this.yScale));
  }


  onResize() {
    this.updateSizes();
    this.svg.call(this.zoom.transform, zoomIdentity)
    this.refresh();
  }

  onZoom() {
    //this.dotGroup.attr("transform", event.transform);
    this.zoomXScale = event.transform.rescaleX(this.xScale);
    this.zoomYScale = event.transform.rescaleY(this.yScale);
    this.xAxisGroup.call(axisBottom(this.zoomXScale))
    this.yAxisGroup.call(axisLeft(this.zoomYScale))

    this.visualisations.forEach(visu => visu.onZoom(this.zoomXScale, this.zoomYScale))
  }

  refresh() {
    if (!this.data) return;
    this.refreshAxis();
    this.visualisations.forEach(visu => visu.refresh());
  }


  refreshAxis() {
    this.xAxisGroup.call(axisBottom(this.xScale));
    this.yAxisGroup.call(axisLeft(this.yScale));
  }



  setData(data) {
    //console.log('set data', data);
    if (!data) return;
    this.data = data;

    //update scales (add margin to the y scale)
    let yExtent = extent(data, (d) => d.rate);
    let yMargin = 0.02 * (yExtent[1] - yExtent[0])
    yExtent[0] -= yMargin;
    yExtent[1] += yMargin;
    this.yScale.domain(yExtent).nice();
    this.xScale.domain(extent(data, (d) => d.date)).nice();

    //redraw
    this.refreshAxis();
    this.visualisations.forEach(visu => {
      visu.setScales(this.xScale, this.yScale);
      visu.setData(data);
    });
  }



  destroy() {
    onResize.uninstall(this.rootElement);
    //TODO visus
  }


}
