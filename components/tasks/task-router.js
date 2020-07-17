const router = require('express').Router()

const TaskModel = require('./task-model')

//`````````GET`````````
//get tasks
router.get('/', (req, res) => {
    TaskModel.getTasks()
    .then(tasks => {
        res.json(tasks)
    })
    .catch( err => {
        res.status(500).json({error: err.message})
    })
})


module.exports = router