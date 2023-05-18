const isDefined = require('./isDefined');

const watchedAtIsValid = (watchedAt) => {
  const regex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!regex.test(watchedAt)) {
    return { status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
};

const rateIsvalid = (rate) => {
  if (!isDefined(rate)) {
    return { status: 400, message: 'O campo "rate" é obrigatório' };
  }
  if (!Number.isInteger(rate) || !(rate >= 1 && rate <= 5)) {
    return { status: 400, message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' };
  }
};

const checkTalkProperties = ({ watchedAt, rate }) => {
  if (!watchedAt) return { status: 400, message: 'O campo "watchedAt" é obrigatório' };
  const watchedIsValid = watchedAtIsValid(watchedAt);
  if (watchedIsValid) return watchedIsValid;
  const rateValid = rateIsvalid(rate);
  if (rateValid) return rateValid;
};

module.exports = { checkTalkProperties, rateIsvalid };
