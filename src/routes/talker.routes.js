const { Router } = require('express');
const talkerModel = require('../models/talker.model');
const talkerMiddleware = require('../middlewares/talker.middlewares');
const indexMiddlewares = require('../middlewares/index.middlewares');
const { rateIsvalid } = require('../utils/validateTalk');

const talkerRouter = Router();

talkerRouter.get('/', async (_req, res) => {
  const { status, result } = await talkerModel.getAll();
  return res.status(status).json(result);
});

talkerRouter.get('/search',
  indexMiddlewares.auth,
  talkerMiddleware.validateQueries,
  async (req, res) => {
    const { status, result } = await talkerModel.search(req.query);
    return res.status(status).json(result);
  });

talkerRouter.get('/:id', talkerMiddleware.validateId, async (req, res) => {
  const { id } = req.params;
  const { status, result } = await talkerModel.getById(id);
  return res.status(status).json(result);
});

talkerRouter.post('/', indexMiddlewares.talkerAuth, async (req, res) => {
  const newTalker = await talkerModel.create(req.body);
  return res.status(201).json(newTalker);
});

talkerRouter.put('/:id',
  talkerMiddleware.validateId,
  indexMiddlewares.talkerAuth,
  async (req, res) => {
    const { id } = req.params;
    const { status, result } = await talkerModel.uptade(id, req.body);
    return res.status(status).json(result);
  });

talkerRouter.patch('/rate/:id',
talkerMiddleware.validateId,
indexMiddlewares.auth,
 async ({ params, body }, res) => {
  const isInvalid = rateIsvalid(body.rate);
  if (!isInvalid) {
    const { status, message } = await talkerModel.patch(params.id, body.rate);
    return res.status(status).json({ message });
  }
  return res.status(isInvalid.status).json({ message: isInvalid.message });
});

talkerRouter.delete('/:id',
  talkerMiddleware.validateId,
  indexMiddlewares.auth,
  async (req, res) => {
    const { id } = req.params;
    const { status, result } = await talkerModel.deleteTalker(id);
    return res.status(status).json(result);
  });

module.exports = talkerRouter;
