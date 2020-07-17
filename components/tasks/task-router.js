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
router.post('/:id/resources', (req, res) => {

    // function addEXISTINGResourceToTask( resource_id, task_id) {

    //     //get task by id then add insert on intermediate table
    
    //     return db('tasks_resource')
    //         .insert({ task_id, resource_id })
    //         .then(() => {
    //           db('resource')
    //           .select('resource.*', 'tr.task_id')
    //           .join('tasks_resource as tr')
    //           .where('id', '=', resource_id)
    //           .first()
    //         })
    
    // }
    if(!req.body.resource_id){
        res.status(400).json({ message: 'please provide id of the resource you want to add to tasks as resource_id: idNumber'})
    }

    ResourceModel.addEXISTINGResourceToTask( req.body.resource_id, req.params.id, res )
        .then(existingResource => {
            res.json(existingResource)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})


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