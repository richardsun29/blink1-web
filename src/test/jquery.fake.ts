import sinon from 'sinon';

// add new jquery methods in both places
const fakeMethods: string[] = [
  'ready',
  'spectrum',
  'post',
];

type JQueryFakeMethods = {
  [method in
      'ready'
    | 'spectrum'
    | 'post'
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

  fake.returns(fake);

  fake.ready.callsFake((callback) => callback());

  return fake;
}
