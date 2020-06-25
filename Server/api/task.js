const moment = require('moment');

module.exports = app => {
    const getTasks = (request, response) => {
        const date = request.query.date 
            ? request.query.date
            : moment().endOf('day').toDate(0);

        app.db('tasks')
            .where({ userId: request.user.id })
            .where('estimateAt', '<=', date)
            .orderBy('estimateAt')
            .then(tasks => response.json(tasks))
            .catch(error => response.status(400).json(error))
    };

    const save = (request, response) => {
        if(!request.body.desc.trim()){
            return response.status(400).send('Descrição é um campo obrigatorio!');
        }

        request.body.userId = request.user.id;

        app.db('tasks')
            .insert(request.body)
            .then(_ => response.status(204).send())
            .catch(error => response.status(400).json(error));
    };

    const remove = (request, response) => {
        app.db('tasks')
            .where({ id: request.params.id, userId: request.user.id })
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0){
                    response.status(204).send()
                } else {
                    const msg = `Não foi encontrado task com id ${request.params.id}.`;
                    response.status(400).send(msg);
                }
            }) 
            .catch(error => response.status(400).json(error));
    };

    const updateTaskDoneAt = (request, response, doneAt) => {
        app.db('tasks')
            .where({ id: request.params.id, userId: request.user.id })
            .update({ doneAt })
            .then(_ => response.status(204).send())
            .catch(error => response.status(400).json(error));
    };

    const toggleTask = (request, response) => {
        app.db('tasks')
            .where({ id: request.params.id, userId: request.user.id })
            .first()
            .then(task => {
                if(!task){
                    const msg = `Task com o id ${request.params.id} nao encontrada.`;

                    return response.status(400).send(msg);
                }

                const doneAt = task.doneAt ? null : new Date();

                updateTaskDoneAt(request, response, doneAt);
            })
            .catch(error => response.status(400).json(error));
    };

    return { getTasks, save, remove, toggleTask };
};