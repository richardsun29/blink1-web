import assert from 'assert';
import sinon = require('sinon');

import Pusher = require('pusher-js');

import Factory from '../util/factory';

describe('Factory', function() {
  afterEach(function() {
    sinon.restore();
  });
});
