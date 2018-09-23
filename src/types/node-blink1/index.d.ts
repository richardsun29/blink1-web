declare module 'node-blink1' {

  export default class Blink1 {
    constructor(serialNumber?: string);

    static devices(): string[];

    version(callback: (ver: string) => void): void;

    fadeToRGB(
      fadeMillis: number,
      r: number,
      g: number,
      b: number,
      index: Blink1.Index,
      callback?: Blink1.Callback,
    ): void;

    fadeToRGB(
      fadeMillis: number,
      r: number,
      g: number,
      b: number,
      callback?: Blink1.Callback,
    ): void;

    setRGB(
      r: number,
      g: number,
      b: number,
      callback?: Blink1.Callback,
    ): void;

    off(callback?: Blink1.Callback): void;

    rgb(
      index: Blink1.Index,
      callback: Blink1.RGBCallback,
    ): void;

    rgb(
      callback: Blink1.RGBCallback,
    ): void;

    enableServerDown(
      millis: number,
      callback?: Blink1.Callback,
    ): void;

    disableServerDown(
      millis: number,
      callback?: Blink1.Callback,
    ): void;

    play(
      position: Blink1.Position,
      callback?: Blink1.Callback,
    ): void;

    playLoop(
      startPosition: Blink1.Position,
      endPosition: Blink1.Position,
      count: number,
      callback?: Blink1.Callback,
    ): void;

    pause(callback: Blink1.Callback): void;

    writePatternLine(
      fadeMillis: number,
      r: number,
      g: number,
      b: number,
      position: Blink1.Position,
      callback?: Blink1.Callback
    ): void;

    readPatternLine(
      position: Blink1.Position,
      callback: (value: Blink1.PatternLine) => void,
    ): void

    close(callback?: Blink1.Callback): void;
  }

  namespace Blink1 {
    export type Index = 0 | 1 | 2;

    export type Position = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

    export type Callback = () => void;

    export type RGBCallback = (
      r: number,
      g: number,
      b: number
    ) => void;

    export type PatternLine = {
      r: number,
      g: number,
      b: number,
      fadeMillis: number
    };
  }

}
