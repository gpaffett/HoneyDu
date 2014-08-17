"use strict";

var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();

router.post('/', function (req, res) {
    //TODO validate req.body.username and req.body.password
    //if is invalid, return 401
    if (!(req.body.email === 'gbpaffett@gmail.com' && req.body.password === 'password')) {
        res.send(401, {'message': 'Wrong user or password'});
        return;
    }

    var profile = {
        first_name: 'Geoff',
        last_name: 'Paffett',
        email: 'gbpaffett@gmail.com',
        id: 123
    };

    // We are sending the profile inside the token
    var token = jwt.sign(profile, 'secret', { expiresInMinutes: 60*5 });

    res.json({ token: token });
});

module.exports = router;