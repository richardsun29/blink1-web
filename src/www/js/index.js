'use strict';

$().ready(() => {
  $('#color-picker').spectrum({
    flat: true,
    allowEmpty: true,
  }).on('move.spectrum', _.throttle(onColorSelect, 200));
})

const onColorSelect = (e, tinycolor) => {
  console.log(tinycolor);
};

// node module for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    onColorSelect,
  };
}
