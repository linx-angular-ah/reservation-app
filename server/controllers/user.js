const jwt = require('jsonwebtoken');
const config = require("../config");

const User = require("../model/user");

function notAuthorized(res) {
  return res.status(401).send({errors: [{title: 'Not authorized', detail: 'You need to login to get access'}]});
}

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return notAuthorized(res);
  }

  jwt.verify(token.split(' ')[1], config.SECRET, async function(err, decodedToken) {
    if(err) {
      return res.status(401).send({
        errors: [{ title: "Not Authorized", detail: "Invalid token!"}],
      })
    }

    await User.findByID(decodedToken.userId, function(err, foundUser) {
      if(err) {
        return res.status(401).send({
          errors: [{ title: "Not Authorized", detail: "Invalid token!"}],
        })
      }
    });

    if(!foundUser) {
      if(err) {
        return res.status(401).send({
          errors: [{ title: "Not Authorized", detail: "Invalid token!"}],
        })
      }
    }

    next();
  });

}
