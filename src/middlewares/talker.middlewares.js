const validateId = ({ params: { id } }, _res, next) => {
  const numberId = Number(id);
  if (Number.isInteger(numberId) && !Number.isNaN(numberId)) return next();
  return next({ status: 400, message: 'Id inválido' });
};

module.exports = { validateId };
