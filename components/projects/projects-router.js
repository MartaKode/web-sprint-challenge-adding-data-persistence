const router = require('express').Router()

const ProjectsModel = require('./projects-model')
const TaskModel = require('../tasks/task-model')
const ResourceModel = require('../resources/resource-model')

router.use('/:id', validateProjectId)
//````````GET```````
//get projects
router.get('/', (req, res) => {
    ProjectsModel.getProjects()
        .then(projects => {
            res.json(projects)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

//get tasks by project id
router.get('/:id/tasks', (req, res) => {
    ProjectsModel.getProjectTasks(req.params.id)
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

//get resources by project id
router.get('/:id/resources', (req, res) => {
    ProjectsModel.getProjectResources(req.params.id)
    .then(resources => {
        res.json(resources)
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})


//`````````POST`````````
//post project
router.post('/', (req, res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).json({ message: 'nothing to post!' })
    } else if (!req.body.project_name) {
        res.status(400).json({ message: 'missing required field project_name' })
    }

    ProjectsModel.addProject(req.body)
        .then(newProject => {
            res.json(newProject)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

//post task by project id
router.post('/:id/tasks', (req, res) => {
    // const upgradedReqBody = { ...req.body, project_id: req.params.id }
    if (!Object.keys(req.body).length) {
        res.status(400).json({ message: 'nothing to post!' })
    } else if (!req.body.task_description) {
        res.status(400).json({ message: 'missing required field task_description' })
    }

    TaskModel.addTask({ ...req.body, project_id: req.params.id })
        .then(newTask => {
            res.json(newTask)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })

})

//post resource by project id
router.post('/:id/resources', (req, res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).json({ message: 'nothing to post!' })
    } else if (!req.body.resource_name) {
        res.status(400).json({ message: 'missing required field resource_name' })
    }

    ResourceModel.addResourceToProject(req.body, req.params.id)
    .then(newResource => {
        console.log('newResource', newResource)
        res.json(newResource)
    })
    .catch(err => {
        ResourceModel.getResources()
        .then( resources => {
            if( resources.filter(resource => resource.resource_name === req.body.resource_name)){
                res.status(400).json({message: "resource_name must be unique"})
            }else {
                res.status(500).json({error: err.message})
            }
        }) 
    })

})

//custom Middleware:

function validateProjectId(req, res, next) {
    ProjectsModel.getProjects().where('id', '=', req.params.id).first()
        .then(project => {
            // console.log('validateProjectID project:', project)
            if (!project) {
                res.status(404).json({ message: 'invalid project id' })
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
}

module.exports = router