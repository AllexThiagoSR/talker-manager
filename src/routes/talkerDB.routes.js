const { Router } = require('express');
const talkerDBModel = require('../models/talkerDB.model');

const talkerDBRouter = Router();

talkerDBRouter.get('/', async (_req, res) => {
  const talkers = await talkerDBModel.getAll();
  return res.status(200).json(talkers);
});

module.exports = talkerDBRouter;