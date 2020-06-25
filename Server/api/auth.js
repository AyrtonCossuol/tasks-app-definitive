const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const signin = async (request, response) => {
        if(!request.body.email || !request.body.password) {
            return response.status(400).send('Dados incompletos.');
        }

        const user = await app.db('users')
            .where({ email: request.body.email })
            .first();

        if(user) {
            bcrypt.compare(request.body.password, user.password, (error, isMatch) => {
                if(error || !isMatch) {
                    return response.status(401).send();
                }

                const payload = { id: user.id }
                response.json({
                    name: user.name,
                    email: user.email,
                    token: jwt.encode(payload, authSecret),
                });
            });
        } else {
            response.status(400).send('Usuario nao encontrado!');
        }
    };

    return { signin };
};