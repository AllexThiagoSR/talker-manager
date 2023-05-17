const { Router } = require('express');
const talkerRouter = require('./talker.routes');
const generateToken = require('../utils/generateToken');

const indexRouter = Router();

indexRouter.use('/talker', talkerRouter);

indexRouter.post('/login', (_, res) => {
  const token = generateToken();
  console.log(token.length);
  return res.status(200).json({ token });
});

module.exports = indexRouter;
