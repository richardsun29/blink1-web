import { strict as assert } from 'assert';
import cookieParser from 'cookie-parser';
import express from 'express';
import sinon from 'sinon';
import request from 'supertest';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Config from '../../util/config';

import login from './login';

describe('Login', () => {
  const password = 'password123';
  const jwtSecret = 'jwt secret';
  const fakeMainPage = '<h1>Main page</h1>';
  const fakeApiResult = '{fake: true}';

  const app: express.Application = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(login);
  app.get('/', (req, res, next) => res.send(fakeMainPage));
  app.post('/api', (req, res, next) => res.send(fakeApiResult));

  beforeEach(() => {
    sinon.replaceGetter(Config, 'PASSWORD_HASH', () => bcrypt.hashSync(password, 10));
    sinon.replaceGetter(Config, 'JWT_SECRET', () => jwtSecret);
  });

  afterEach(() => {
    sinon.verifyAndRestore();
  });

  enum Page { Main, Login, Api }

  function checkResponse(expectedPage: Page, done: Mocha.Done): request.CallbackHandler {
    return (err, res) => {
      if (err) {
        done(err);
      } else {
        switch (expectedPage) {
          case Page.Main:
            assert.strictEqual(res.text, fakeMainPage);
            break;
          case Page.Login:
            assert.notStrictEqual(res.text.indexOf('<h1>Login</h1>'), -1);
            break;
          case Page.Api:
            assert.strictEqual(res.text, fakeApiResult);
            break;
        }
        done();
      }
    };
  }

  describe('GET', () => {
    it('should show login page if not logged in', (done) => {
      request(app).get('/')
        .expect(403)
        .end(checkResponse(Page.Login, done));
    });

    it('should handle invalid cookie', (done) => {
      request(app).get('/')
        .set('Cookie', 'jwt=invalid')
        .expect(403)
        .end(checkResponse(Page.Login, done));
    });

    it('should handle unverified cookie', (done) => {
      const badToken = jwt.sign({}, 'wrong secret');
      request(app).get('/')
        .set('Cookie', `jwt=${badToken}`)
        .expect(403)
        .end(checkResponse(Page.Login, done));
    });

    it('should redirect to main page if logged in', (done) => {
      const token = jwt.sign({}, jwtSecret);
      request(app).get('/')
        .set('Cookie', `jwt=${token}`)
        .expect(200)
        .end(checkResponse(Page.Main, done));
    });
  });

  describe('POST', () => {
    it('should handle no password', (done) => {
      request(app).post('/')
        .expect(400)
        .end(checkResponse(Page.Login, done));
    });

    it('should reject incorrect password', (done) => {
      request(app).post('/')
        .send({ password: 'wrong password' })
        .expect(403)
        .end(checkResponse(Page.Login, done));
    });

    it('should accept correct password', (done) => {
      const agent = request.agent(app);

      agent.post('/')
        .send({ password })
        .expect(302)
        .expect('Location', '/')
        .end((err, res) => {
          if (err) {
            done(err);
          }
          agent.get('/')
            .expect(200)
            .end(checkResponse(Page.Main, done));
        });
    });
  });

  describe('/api', () => {
    it('should fail with no auth', (done) => {
      request(app).post('/api')
        .expect(403)
        .end(checkResponse(Page.Login, done));
    });

    it('should succeed with auth', (done) => {
      const agent = request.agent(app);

      agent.post('/')
        .send({ password })
        .expect(302)
        .expect('Location', '/')
        .end((err, res) => {
          if (err) {
            done(err);
          }
          agent.post('/api')
            .expect(200)
            .end(checkResponse(Page.Api, done));
        });
    });
  });
});
