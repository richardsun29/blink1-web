// tslint:disable:no-implicit-dependencies
declare var _jquery: typeof import('jquery');
declare var _lodash: typeof import('lodash');
declare var _tinycolor: typeof import('tinycolor2');

$().ready(() => {
  $('#color-picker').spectrum({
    flat: true,
    allowEmpty: true,
    move: _.throttle(onColorSelect, 200),
  });
});

const onColorSelect = (color: tinycolor.Instance) => {
  console.log(tinycolor);
};
