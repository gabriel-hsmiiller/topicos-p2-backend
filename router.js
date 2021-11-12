const express = require('express');
const router = express();

class Router {

    constructor() {
        this._setupControllers();
    }

    _setupControllers() {
        router.use('/login', require('./webcontrollers/login.controller'));
    }
}

new Router();

module.exports = router;