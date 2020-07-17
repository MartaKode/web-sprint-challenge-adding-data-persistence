const db = require('../../data/db-config')

module.exports = {
    getTasks,
    addTask,
}

function getTasks () {
    return db('tasks')
    .select('tasks.*', 'projects.project_name', 'projects.project_description')
    .join('projects', 'projects.id', 'tasks.project_id')
}

function addTask (newTask) {
    return db('tasks')
    .insert(newTask, 'id')
    .then(([id]) => {
        return db('tasks')
        .where({id})
        .first()
    })
}