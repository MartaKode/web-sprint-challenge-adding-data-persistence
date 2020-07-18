const express = require('express')
const helmet = require('helmet')

const ProjectRouter = require('./components/projects/projects-router')
const ResourceRouter = require('./components/resources/resource-router')
const TaskRouter = require('./components/tasks/task-router')

const server = express()

server.use(helmet())
server.use(express.json())

server.get('/', (req, res) => {
    res.send('<h1>Api up and Running</h1>')
})

server.use('/api/projects', ProjectRouter)
server.use('/api/resources', ResourceRouter)
server.use('/api/tasks', TaskRouter)

module.exports = server