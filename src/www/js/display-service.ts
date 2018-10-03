// tslint:disable:no-implicit-dependencies
declare var jQuery: typeof import('jquery');
declare var tinycolor: typeof import('tinycolor2');

export default class DisplayService {
  constructor() {

  }

  public static setColor(color: tinycolor.Instance): void {
    if (!color) {
      color = tinycolor('#000');
    }

    $('body').css('background-color', color.toHexString());
    $('.light').css('background-color', color.toHexString());
  }
}
