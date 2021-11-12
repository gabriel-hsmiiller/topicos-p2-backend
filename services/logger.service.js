const fs = require('fs');

class LoggerService {
    constructor(){ };

    info(msg) {
        const time = new Date();

        const date =
            time.getFullYear() +
            "-" +
            (time.getMonth() + 1).toLocaleString('pt-Br', {minimumIntegerDigits: 2}) +
            "-" +
            time.getDate();

        const moment =
            time.getFullYear() +
            "-" +
            (time.getMonth() + 1).toLocaleString('pt-Br', {minimumIntegerDigits: 2}) +
            "-" +
            time.getDate().toLocaleString('pt-Br', {minimumIntegerDigits: 2}) +
            " " +
            time.getHours().toLocaleString('pt-Br', {minimumIntegerDigits: 2}) +
            ":" +
            time.getMinutes().toLocaleString('pt-Br', {minimumIntegerDigits: 2}) +
            ":" +
            time.getSeconds().toLocaleString('pt-Br', {minimumIntegerDigits: 2});

        console.log(`[${moment}] ${msg}`);

        fs.appendFile(`./logs/${date}_info_logs.txt`, `[${moment}]: ${msg}` + "\n", err => {
            if (err) {
                console.error(err);
            }
        });
    }

    warn(msg) {
        const time = new Date();

        const date =
            time.getFullYear() +
            "-" +
            (time.getMonth() + 1).toLocaleString('pt-Br', {minimumIntegerDigits: 2}) +
            "-" +
            time.getDate();

        const moment =
            time.getFullYear() +
            "-" +
            (time.getMonth() + 1).toLocaleString('pt-Br', {minimumIntegerDigits: 2}) +
            "-" +
            time.getDate().toLocaleString('pt-Br', {minimumIntegerDigits: 2}) +
            " " +
            time.getHours().toLocaleString('pt-Br', {minimumIntegerDigits: 2}) +
            ":" +
            time.getMinutes().toLocaleString('pt-Br', {minimumIntegerDigits: 2}) +
            ":" +
            time.getSeconds().toLocaleString('pt-Br', {minimumIntegerDigits: 2});

        console.warn(`[${moment}] ${msg}`);

        fs.appendFile(`./logs/${date}_warn_logs.txt`, `[${moment}]: ${msg}` + "\n", err => {
            if (err) {
                console.error(err);
            }
        });
    }

    error(msg) {
        const time = new Date();

        const date =
            time.getFullYear() +
            "-" +
            (time.getMonth() + 1).toLocaleString('pt-Br', {minimumIntegerDigits: 2}) +
            "-" +
            time.getDate();

        const moment =
            time.getFullYear() +
            "-" +
            (time.getMonth() + 1).toLocaleString('pt-Br', {minimumIntegerDigits: 2}) +
            "-" +
            time.getDate().toLocaleString('pt-Br', {minimumIntegerDigits: 2}) +
            " " +
            time.getHours().toLocaleString('pt-Br', {minimumIntegerDigits: 2}) +
            ":" +
            time.getMinutes().toLocaleString('pt-Br', {minimumIntegerDigits: 2}) +
            ":" +
            time.getSeconds().toLocaleString('pt-Br', {minimumIntegerDigits: 2});

        console.error(`[${moment}] ${msg}`);

        fs.appendFile(`./logs/${date}_error_logs.txt`, `[${moment}]: ${msg}` + "\n", err => {
            if (err) {
                console.error(err);
            }
        });
    }
}

module.exports = new LoggerService();