import Blink1 from 'node-blink1';

export default class Blink {
  private blink1: any;
  constructor() {
    this.blink1 = new Blink1();
    console.log(Blink1.devices());
    this.blink1.version(console.log);
  }

  public onMessage(data: any): void {

  }
}

// @ts-ignore
const blink: Blink = new Blink();
