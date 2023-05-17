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

module.exports = { handleError, auth };
