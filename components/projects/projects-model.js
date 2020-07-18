const db = require('../../data/db-config')

module.exports = {
    getProjects,
    addProject,
    getProjectTasks,
    getProjectResources,
    getProjectByID
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
        .then(([id]) => {
            return db('projects')
                .where({ id })
                .first()
        })
}

function getProjectTasks(project_id) {
    return db('tasks')
        // .select('tasks.*', 'projects.project_name', 'projects.project_description') //.....stretch!?
        .select('projects.project_name', 'tasks.*')
        .join('projects', 'projects.id', 'tasks.project_id')
        .where('project_id', '=', project_id)
}

function getProjectResources(project_id) {
    return db('resource')
        .select('projects.project_name', 'resource.*')
        .join('projects_resource as pr', 'pr.resource_id', 'resource.id')
        .join('projects', 'projects.id', 'pr.project_id')
        .where('project_id', '=', project_id)
}

function getProjectByID(project_id) {

    const project = new Promise(resolve => {
        resolve( 
            db('projects')
            .where('projects.id', '=', project_id)
            .first()   )
    })

    const projectResources = new Promise(resolve => {
        resolve(
        db('resource')
        .select('resource.*')
        .join('projects_resource as pr', 'pr.resource_id', 'resource.id')
        .join('projects', 'projects.id', 'pr.project_id')
        .where('project_id', '=', project_id)
            )
    })

    const projectTasks = new Promise(resolve => {
        resolve(
        db('tasks')
        .select('tasks.*')
        .join('projects', 'projects.id', 'tasks.project_id')
        .where('project_id', '=', project_id)
           )
    })
    
    console.log(project)
    return Promise.all([project, projectResources, projectTasks])
        .then(results => {
          console.log(results)
        const organized = {project_info: results[0], project_resources: results[1], project_tasks: results[2]}
          return organized
        })

}

