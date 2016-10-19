import {Mixin} from 'mixwith';

const defaultPadding = {
  top : 0,
  left : 0,
  right : 0,
  bottom : 0
};

export default Mixin((superclass) => class extends superclass {

  setPadding({top, bottom, left, right}) {
    this.padding = this.padding || defaultPadding;
    if (Number.isFinite(top)) this.padding.top = top;
    if (Number.isFinite(left)) this.padding.left = left;
    if (Number.isFinite(right)) this.padding.right = right;
    if (Number.isFinite(bottom)) this.padding.bottom = bottom;
  }

  //overload Graph setSize
  computePaddedSize(width, height) {
    this.width_padded = width - this.padding.right - this.padding.left;
    this.height_padded = height - this.padding.top - this.padding.bottom;
  }

});
