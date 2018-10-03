// tslint:disable:no-implicit-dependencies
declare var jQuery: typeof import('jquery');
declare var _: typeof import('lodash');
declare var tinycolor: typeof import('tinycolor2');

import ApiService from './api-service';
import DisplayService from './display-service';

const onColorSelect = (color: tinycolor.Instance) => {
  ApiService.blinkSetColor(color);
  DisplayService.setColor(color);
};

const spectrumOptions: Spectrum.Options = {
  flat: true,
  showPalette: true,
  showPaletteOnly: true,
  palette: [
    ['#000', '#444', '#666', '#999', '#ccc', '#eee', '#f3f3f3', '#fff'],
    ['#f00', '#f90', '#ff0', '#0f0', '#0ff', '#00f', '#90f', '#f0f'],
    ['#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#9fc5e8', '#b4a7d6', '#d5a6bd'],
    ['#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6fa8dc', '#8e7cc3', '#c27ba0'],
    ['#c00', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3d85c6', '#674ea7', '#a64d79'],
    ['#900', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#0b5394', '#351c75', '#741b47'],
  ],
  containerClassName: 'spectrum-container',
};

export function EntryPoint(): void {
  $().ready(() => {
    $('#color-picker').spectrum({
      ...spectrumOptions,
      move: _.throttle(onColorSelect, 200),
    });
  });
}
