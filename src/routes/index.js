const { Router } = require('express');
const talkerRouter = require('./talker.routes');
const generateToken = require('../utils/generateToken');
const login = require('../middlewares/login.middlewares');

const handleError = (error, _req, res, _next) => {
  const { status, message } = error;
  return res.status(status).json({ message });
};

const indexRouter = Router();

indexRouter.use('/talker', talkerRouter);

indexRouter.post('/login', login.validateEmail, login.validatePassword, (_, res) => {
  const token = generateToken();
  console.log(token.length);
  return res.status(200).json({ token });
});

indexRouter.use(handleError);

module.exports = indexRouter;
