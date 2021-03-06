import sinon from 'sinon';

// add new jquery methods in both places
const fakeMethods: string[] = [
  'ready',
  'spectrum',
  'ajax',
];

type JQueryFakeMethods = {
  [method in
      'ready'
    | 'spectrum'
    | 'ajax'
  ]: sinon.SinonStub;
};

export interface IJQueryFake extends sinon.SinonStub, JQueryFakeMethods { }

export function getFake$(): IJQueryFake {
  // @ts-ignore
  const fake: IJQueryFake = sinon.stub();

  for (const method of fakeMethods) {
    // @ts-ignore
    fake[method] = sinon.stub();
  }

  fake.callsFake((callback) => {
    if (typeof callback === 'function') {
      callback();
    }
    return fake;
  });

  return fake;
}
