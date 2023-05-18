const { Router } = require('express');
const { checkTalkProperties } = require('../utils/validateTalk');

const talkerAuth = Router();

const handleError = (error, _req, res, _next) => {
  const { status, message } = error;
  return res.status(status).json({ message });
};

const auth = ({ headers }, _res, next) => {
  const { authorization } = headers;
  const authString = `${authorization}`;
  if (!authorization) {
    return next({ status: 401, message: 'Token não encontrado' });
  }
  if (authString.length !== 16) {
    return next({ status: 401, message: 'Token inválido' });
  }
  return next();
};

const validateName = ({ body }, _res, next) => {
  const { name } = body;
  if (!name) return next({ status: 400, message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return next({ status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

const validateAge = ({ body }, _res, next) => {
  const { age } = body;
  if (!age) return next({ status: 400, message: 'O campo "age" é obrigatório' });
  if (Number.isNaN(age) || !Number.isInteger(age) || age < 18) {
    return next({ 
      status: 400,
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  return next();
};

const validateTalk = ({ body }, _res, next) => {
  const { talk } = body;
  if (!talk) return next({ status: 400, message: 'O campo "talk" é obrigatório' });
  if (typeof talk !== 'object') {
    return next({
      status: 400,
      message: 'O campo "talk" deve ser um objeto com as chaves "watchedAt" e "rate"',
    });
  }
  const talkIsValid = checkTalkProperties(talk);
  if (talkIsValid) return next(talkIsValid);
  return next();
};

talkerAuth.use(auth, validateName, validateAge, validateTalk);

module.exports = {
  talkerAuth,
  handleError,
  auth,
  validateName,
  validateAge,
  validateTalk,
};
