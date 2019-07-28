import sinon from 'sinon';

// add new lodash methods in both places
const fakeMethods: string[] = [
  'throttle',
  'isObject',
];

type LodashFakeMethods = {
  [method in
      'throttle'
    | 'isObject'
  ]: sinon.SinonStub;
};

export interface ILodashFake extends sinon.SinonStub, LodashFakeMethods { }

export function getFake_(): ILodashFake {
  // @ts-ignore
  const fake: ILodashFake = sinon.stub();

  for (const method of fakeMethods) {
    // @ts-ignore
    fake[method] = sinon.stub();
  }

  fake.returns(fake);

  fake.throttle.callsFake((callback, ms) => callback);

  return fake;
}
