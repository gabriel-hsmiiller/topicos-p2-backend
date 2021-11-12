const { getRepository } = require('typeorm')

class LoginService {
    constructor() { }

    async login(username, password) {
        const repository = getRepository('user');

        try {

            const user = await repository.findOne({
                where: {
                    username,
                    password
                }
            });

            if (!user) return null;

            return user;

        } catch (error) {
            throw error;
        }
    }

    async register(username, password) {
        const repository = getRepository('user');

        try {

            const existingUser =  await repository.findOne({
                where: {
                    username
                }
            });

            if (existingUser) {
                return { error: 'Confliting username' };
            }

            const partial = repository.create({
                username,
                password
            });

            const user = await repository.save(partial);
            return user;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = LoginService;