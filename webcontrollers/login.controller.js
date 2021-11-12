const HttpStatus = require('http-status-codes');
const express = require('express');
const router = express.Router();

const LoginService = require('../services/login.service');
const LoggerService = require('../services/logger.service');

class LoginController {
    constructor() {
        this.loginService = new LoginService();

        router.post('/', this._handleLoginRequest);
        router.post('/register', this._handleRegisterRequest);
    }

    _handleLoginRequest = async (req, res) => {
        const payload = req.body;

        LoggerService.info(`Login request : payload : ${JSON.stringify(payload)}`);

        try {
            const response = await this.loginService.login(payload.username, payload.password);

            if (!response) {
                LoggerService.warn(`Error in login request : payload : ${JSON.stringify(payload)} : Error : User not found`);
                res.status(HttpStatus.NOT_FOUND).send({ error: 'User not found' });
                return;
            }

            res.status(HttpStatus.OK).send(response);
            LoggerService.info(`Completing login request : response : ${JSON.stringify(response)}`);
        } catch (error) {
            console.log(error);
            LoggerService.error(`Error in login request : payload : ${JSON.stringify(payload)} : Error : ${error}`);
            res.status(HttpStatus.BAD_REQUEST).send({ error });
        }
    }

    _handleRegisterRequest = async (req, res) => {
        const payload = req.body;

        LoggerService.info(`Register request : payload : ${JSON.stringify(payload)}`);

        try {
            const response = await this.loginService.register(payload.username, payload.password);

            if (Object.keys(response).includes('error') && response['error'] === 'Confliting username') {
                LoggerService.warn(`Error in register request : payload : ${JSON.stringify(payload)} : Error : Username already in use`);
                res.status(HttpStatus.CONFLICT).send({ error: 'Username already in user' });
                return;
            }

            res.status(HttpStatus.CREATED).send(response);
            LoggerService.info(`Completing register request : response : ${JSON.stringify(response)}`);
        } catch (error) {
            LoggerService.error(`Error in register request : payload : ${JSON.stringify(payload)} : Error : ${JSON.stringify(error)}`);
            res.status(HttpStatus.BAD_REQUEST).send({ error });
        }
    }
}

new LoginController();

module.exports = router;