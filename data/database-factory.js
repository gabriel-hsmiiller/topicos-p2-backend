const typeorm = require('typeorm');
const config = require('../config/env.json');

class DatabaseFactory {

    connect() {
        this._setupConnection();
    }

    async _setupConnection() {
        try {
            await typeorm.createConnection({
                type: 'mysql',
                host: config.database.host,
                port: config.database.port,
                username: config.database.user,
                password: config.database.pass,
                database: config.database.database,
                synchronize: true,
                entities: [...require('./entity')]
            });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = DatabaseFactory;