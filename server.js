const express = require('express');
const parser = require('body-parser');
const config = require('./config/env.json');
const http = require('http');
const DatabaseFactory = require('./data/database-factory');
const { logger, errorLog } = require('./middlewares/utils/logger.util');
const LoggerService = require('./services/logger.service');

const port = config.port;

class HttpServer {

    constructor(port) {
        this._port = port;
        this._app = express();
        this._setupServer();
        this._setupRoutes();
        this._server = {};
    }

    start() {
        this._server = http.createServer(this._app);
        this._server.listen(this._port, '127.0.0.1');
        this._server.on('error', this._onServerError);
        this._server.on('listening', this._onServerListening);
    }

    _setupServer() {
        this._app.set('port', this._port);
        this._app.use(parser.json());
        this._app.use(parser.urlencoded({ extended: true }));
        this._app.use(logger);
        this._app.use(errorLog);

        new DatabaseFactory().connect();
    }

    _setupRoutes() {
        this._app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
        this._app.get('/', (req, res) => res.send('/ => Server listening'));
        this._app.use('/api/v1', require('./router'));
    }

    _onServerListening() {
        LoggerService.info('Server is running');
    }

    _onServerError(error) {
        switch (error.code) {
            case 'EACCES':
                LoggerService.error(this._port + ' require elevated privileges.');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                LoggerService.error(this._port + ' is already in use.');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}

new HttpServer(port).start();