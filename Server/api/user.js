const bcrypt = require('bcrypt-nodejs');
const { response } = require('express');

module.exports = app => {
    const obeterHash = (password, callback) => {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(password, salt, null, (error, hash) => callback(hash));
        });
    };

    const save = (request, response) => {
        obeterHash(request.body.password, hash => {
            const password = hash;

            app.db('users')
                .insert({
                    name: request.body.name,
                    email: request.body.email,
                    password
                })
                .then(_ => response.status(204).send())
                .catch(error => response.status(500).json(error));
        });
    };

    return { save }
};