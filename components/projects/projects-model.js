const db = require('../../data/db-config')

module.exports = {
    getProjects,
    addProject,
    getProjectTasks,
    getProjectResources
}

//getProject by ID --> return tasks, resources as well
//promise.all --> look it up ^

function getProjects() {
   return db('projects')
}

function addProject(newProject) {
    console.log(newProject.project_completed)
    return db('projects')
    .insert(newProject, 'id')
    .then( ([id]) => {
        return db('projects')
        .where({id})
        .first()
    })
}

function getProjectTasks ( project_id) {
    return db('tasks')
    // .select('tasks.*', 'projects.project_name', 'projects.project_description') //.....stretch!?
    .select( 'projects.project_name', 'tasks.*')
    .join('projects','projects.id', 'tasks.project_id')
    .where('project_id', '=', project_id)
}

function getProjectResources (project_id) {
    return db('resource')
    .select('projects.project_name','resource.*')
    .join('projects_resource as pr', 'pr.resource_id', 'resource.id')
    .join('projects', 'projects.id', 'pr.project_id')
    .where('project_id', '=', project_id)
}



