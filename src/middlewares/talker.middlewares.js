const { Router } = require('express');

const validateQueries = Router();

const validateId = ({ params: { id } }, _res, next) => {
  const numberId = Number(id);
  if (Number.isInteger(numberId) && !Number.isNaN(numberId)) return next();
  return next({ status: 400, message: 'Id inválido' });
};

const validateSearchTermRate = (req, _res, next) => {
  const { rate } = req.query;
  const rateInNumber = Number(rate);
  const isOutRange = rateInNumber < 1 || rateInNumber > 5;
  if (rate !== undefined && (!Number.isInteger(rateInNumber) || isOutRange)) {
    return next({ status: 400, message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  return next();
};

const validateSearchTermName = (req, _res, next) => {
  const { q } = req.query;
  req.query = { ...req.query, q: q || '' };
  next();
};

const validateSearchTermDate = (req, _res, next) => {
  const { date } = req.query;
  const regex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (date && !regex.test(date)) {
    return next({ status: 400, message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
  req.query = { ...req.query, date: date || '' };
  return next();
};

validateQueries.use(validateSearchTermRate, validateSearchTermName, validateSearchTermDate);

module.exports = {
  validateId,
  validateSearchTermRate,
  validateSearchTermName,
  validateSearchTermDate,
  validateQueries,
};
