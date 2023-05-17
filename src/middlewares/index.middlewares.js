const { Router } = require('express');

const addTalkerAuth = Router();
const handleError = (error, _req, res, _next) => {
  const { status, message } = error;
  return res.status(status).json({ message });
};

const auth = ({ headers }, _res, next) => {
  const { authorization } = headers;
  const authToken = JSON.parse(authorization);
  console.log(authToken);
  if (!authToken) return next({ status: 401, message: 'Token não encontrado' });
  if (typeof authToken !== 'string' && authToken.length !== 16) {
    return next({ status: 401, message: 'Token inválido' });
  }
  return next();
};

const validateName = ({ body }, _res, next) => {
  const { name } = body;
  if (!name) return next({ status: 400, message: 'O campo "name" é orbigatório' });
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

addTalkerAuth.use(auth, validateName, validateAge);

module.exports = { addTalkerAuth, handleError, auth, validateName, validateAge };
