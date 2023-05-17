const { Router } = require('express');
const talker = require('../models/talker.model');

const talkerRouter = Router();

talkerRouter.get('/', async (_req, res) => {
  const { status, result, message } = await talker.getAll();
  return res.status(status).json(message ? { message } : result);
});

module.exports = talkerRouter;
