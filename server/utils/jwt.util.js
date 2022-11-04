const jsonwebtoken = require("jsonwebtoken");

const tokenConstants = require("../constants").tokens;

const ACCESS_TOKEN_SECRET = JSON.parse(process.env.ACCESS_TOKEN_SECRET);

const ACCESS_TOKEN = tokenConstants.ACCESS_TOKEN;
const REFRESH_TOKEN = tokenConstants.REFRESH_TOKEN;

function generateToken(payload = {}, tokenType = ACCESS_TOKEN) {
  return new Promise(function (resolve, reject) {
    const secretKey = getTokenSecretKey(tokenType);
    const expirationTime = getTokenExpirationTime(tokenType);
    if (
      secretKey === "Invalid token type" ||
      expirationTime === "Invalid token type"
    )
      return reject("Invalid token type");

    jsonwebtoken.sign(
      payload,
      secretKey,
      { expiresIn: `${expirationTime}m` },
      function (err, token) {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
}

function verifyToken(token, tokenType = ACCESS_TOKEN) {
  return new Promise(function (resolve, reject) {
    const secretKey = getTokenSecretKey(tokenType);
    if (secretKey === "Invalid token type") return reject("Invalid token type");

    jsonwebtoken.verify(token, secretKey, function (err, decoded) {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}

function getTokenExpirationTime(tokenType) {
  if (tokenType === ACCESS_TOKEN) return ACCESS_TOKEN_SECRET.expiresIn;
  else if (tokenType === REFRESH_TOKEN) return REFRESH_TOKEN_SECRET.expiresIn;
  else return "Invalid token type";
}

function getTokenSecretKey(tokenType) {
  if (tokenType === ACCESS_TOKEN) return ACCESS_TOKEN_SECRET.key;
  else if (tokenType === REFRESH_TOKEN) return REFRESH_TOKEN_SECRET.key;
  else return "Invalid token type";
}

module.exports = {
  generateToken,
  verifyToken,
};
