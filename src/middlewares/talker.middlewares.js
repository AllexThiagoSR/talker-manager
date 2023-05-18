const { Route } = require('express');

const validateQueries = Route();
const validateId = ({ params: { id } }, _res, next) => {
  const numberId = Number(id);
  if (Number.isInteger(numberId) && !Number.isNaN(numberId)) return next();
  return next({ status: 400, message: 'Id inválido' });
};

const validateSearchTermRate = ({ query: { rate } }, _res, next) => {
  if (rate === undefined || (rate >= 1 && rate <= 5)) return next();
  return next({ status: 400, message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
};

validateQueries.use(validateSearchTermRate);

module.exports = { validateId, validateQueries };
