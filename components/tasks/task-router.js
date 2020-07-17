const router = require('express').Router()

const TaskModel = require('./task-model')
const ResourceModel = require('../resources/resource-model')

router.use('/:id', validateTaskId)
//`````````GET`````````
//get tasks
router.get('/', (req, res) => {
    TaskModel.getTasks()
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

//``````````POST````````
//post resource by task id
// router.post('/:id/resources', (req, res) => {
//     ResourceModel.addResource({ ...req.body, task_id: req.params.id })
//         .then(newResource => {
//             res.json(newResource)
//         })
//         .catch(err => {
//             res.status(500).json({ error: err.message })
//         })
// })


//custom Middleware:

function validateTaskId(req, res, next) {
    TaskModel.getTasks().where('tasks.id', '=', req.params.id).first()
        .then(task => {
            // console.log('validatetaskID task:', task)
            if (!task) {
                res.status(404).json({ message: 'invalid task id' })
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
}
module.exports = router