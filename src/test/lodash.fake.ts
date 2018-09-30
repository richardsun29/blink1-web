import sinon from 'sinon';

// add new jquery methods in both places
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

interface ILodashFake extends sinon.SinonStub, LodashFakeMethods { }

// @ts-ignore
const fake: ILodashFake = sinon.stub();

for (const method of fakeMethods) {
  // @ts-ignore
  fake[method] = sinon.stub();
}

fake.returns(fake);

fake.throttle.callsFake((callback, ms) => callback);

export default fake;
