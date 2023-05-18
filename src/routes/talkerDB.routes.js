const { Router } = require('express');
const connection = require('../db/connection');

const talkerDBRouter = Router();

talkerDBRouter.get('/', async (_req, res) => {
  const talkers = await connection.execute('SELECT * FROM talkers');
  return res.status(200).json(talkers[0]);
});

module.exports = talkerDBRouter;