"use strict";

var express = require('express');
var jwt = require('jsonwebtoken'),
    user = require('../model/user'),
    winston = require('winston'),
    SHARED_SECRET = 'open_sesame';

var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ]
});

var router = express.Router();

router.post('/', function (req, res) {
    var username = req.body.username,
        password = req.body.password;

    logger.info("Attempting to validate " + username);
    user.validate(username, password, function(err, user, reason) {
      if (user) {
          logger.info(username + " authenticated as " + user.firstName + " " + user.lastName);
          // We are sending the profile inside the token
          var token = jwt.sign(user, SHARED_SECRET, { expiresInMinutes: 60*5 });

          res.json({ token: token });
          return;
      }

      logger.error(username + " Failed authentication");
      res.send(401, {'message': 'Wrong user or password', reasonCode: reason});
    });


});

module.exports = router;