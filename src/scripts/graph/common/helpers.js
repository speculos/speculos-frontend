
/**
 * Basic transform helper. It will remove previous transform attribute.
 */
export function translate(selection, x, y) {
  selection.attr('transform', `translate(${x}, ${y})`)
}
