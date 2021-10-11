const jwt = require("jsonwebtoken");

const middleware = {
  authToken(req, res, next) {
    const token = req.headers["auth-token"];
    console.log(token);
    if (token) {
      try {
        req.user = jwt.verify(token, "rahul@1");
        console.log(req.user);
        next();
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }
    } else {
      console.log("token not in");
      res.sendStatus(500);
    }
  },

  logging(req, res, next) {
    console.log(`${new Date()}--${req.user.userId}--${req.method}--${req.url}`);
    next();
  },
};

module.exports = middleware;
