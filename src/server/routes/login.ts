import express, { CookieOptions } from 'express';
const router: express.Router = express.Router();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Config from '../../util/config';

const loginPage: string = `
<!DOCTYPE html>
<html>
  <head>
    <title>blink(1) web</title>
  </head>
  <body>
    <h1>Login</h1>
    <form method="POST">
      <input name="password" type="password" placeholder="Password">
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
`;

// handle login attempts before checking jwt
router.post('/', express.urlencoded({ extended: true }), (req, res, next) => {
  if (!req.body.password) {
    res.status(400);
    res.send(loginPage);
    return;
  }

  bcrypt.compare(req.body.password, Config.PASSWORD_HASH, (err, same) => {
    if (same) {
      const token = jwt.sign({}, Config.JWT_SECRET);
      const cookieOptions: CookieOptions = {
        maxAge: 100 * 24 * 60 * 60 * 1000, // 100 years
      };
      res.cookie('jwt', token, cookieOptions);
      res.redirect('/');
    } else {
      res.status(403);
      res.send(loginPage);
    }
  });
});

// check jwt
router.all('*', (req, res, next) => {
  const token = req.cookies.jwt;
  jwt.verify(token, Config.JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      res.status(403);
      res.send(loginPage);
    } else {
      next();
    }
  });
});

export default router;
