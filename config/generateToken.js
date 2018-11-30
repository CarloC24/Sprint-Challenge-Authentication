const jwt = require('jsonwebtoken');
const secret = require('../_secrets/keys');

module.exports = user => {
  const jwtPayload = {
    ...user
  };
  const jwtSecret = secret;
  const jwtOptions = {
    expiresIn: '60m'
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};
