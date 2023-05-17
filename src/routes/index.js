const { Router } = require('express');
const talkerRouter = require('./talker.routes');
const generateToken = require('../utils/generateToken');
const login = require('../middlewares/login.middlewares');
const indexMiddlewares = require('../middlewares/index.middlewares');

const indexRouter = Router();

indexRouter.use('/talker', talkerRouter);

indexRouter.post('/login', login.validateEmail, login.validatePassword, (_, res) => {
  const token = generateToken();
  console.log(token.length);
  return res.status(200).json({ token });
});

indexRouter.use(indexMiddlewares.handleError);

module.exports = indexRouter;
