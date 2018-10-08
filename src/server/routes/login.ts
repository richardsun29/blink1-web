import express from 'express';
const router: express.Router = express.Router();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';

import Config from '../../util/config';

const loginPage: string = path.resolve('dist', 'www', 'login.html');

router.get('/', (req, res, next) => {
  const token = req.cookies.jwt;
  jwt.verify(token, Config.JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      res.status(403);
      res.sendFile(loginPage);
    } else {
      next();
    }
  });
});

router.post('/', express.urlencoded({ extended: true }), (req, res, next) => {
  if (!req.body.password) {
    res.status(400);
    res.sendFile(loginPage);
  }

  bcrypt.compare(req.body.password, Config.PASSWORD_HASH, (err, same) => {
    if (same) {
      const token = jwt.sign({}, Config.JWT_SECRET);
      res.cookie('jwt', token);
      res.status(200);
      res.redirect('/');
    } else {
      res.status(403);
      res.sendFile(loginPage);
    }
  });
});

export default router;
