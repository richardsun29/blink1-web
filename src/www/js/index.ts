// tslint:disable:no-implicit-dependencies
declare var jQuery: typeof import('jquery');
declare var _: typeof import('lodash');
declare var tinycolor: typeof import('tinycolor2');

import Api from './api-service';

const onColorSelect = (color: tinycolor.Instance) => {
  Api.blinkSetColor(color);
};

export function EntryPoint(): void {
  $().ready(() => {
    $('#color-picker').spectrum({
      flat: true,
      allowEmpty: true,
      move: _.throttle(onColorSelect, 200),
    });
  });
}
