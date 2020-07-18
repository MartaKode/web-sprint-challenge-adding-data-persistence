const db = require('../../data/db-config')
const { where } = require('../../data/db-config')


module.exports = {
    getResources,
    // addResource,
    getResourceProjects,
    addResourceToProject,
    addEXISTINGResourceToTask
}

function getResources() {
    return db('resource')
}

// function addResource(newResource) { // -->  delete later; not needed
//     return db('resource')
//         .insert(newResource, 'id')
//         .then(([id]) => {
//             return db('resource')
//                 .where({ id })
//                 .first()
//         })
// }

function addResourceToProject(newResource, project_id) {

    return db('resource')
        .insert(newResource, 'id')
        .then(([id]) => {

            return db('projects_resource')
                .insert({ resource_id: id, project_id }, 'id')
                .then(() => {
                    return db('resource')
                        .where({ id })
                        .first()
                })
            // .catch(err => {
            //     console.log(err.message)
            // })

        })
    // .catch(err => {
    //     console.log(err.message)
    // })

}

function getResourceProjects(resource_id) {

    return db('projects_resource as pr')
        .select('resource.id', 'resource.resource_name', 'projects.*')
        .join('resource', 'resource.id', 'pr.resource_id')
        .join('projects', 'projects.id', 'pr.project_id')
        .where('resource_id', '=', resource_id)
}


function addEXISTINGResourceToTask( resource_id, task_id , res) {

    //get task by id then add insert on intermediate table
    return db('tasks_resource')
    .where({resource_id, task_id})
    .then( rtObj => {
        // console.log(rtObj)
        if(!rtObj.length){
            return db('tasks_resource')
            .insert({ resource_id, task_id}, 'id')
            .then(() => {
            return  db('resource')
              .select('resource.*', 'tr.task_id')
              .join('tasks_resource as tr')
              .where('id', '=', resource_id)
              .first()
            }) 
        } else {
           res.status(400).json({ message: 'resource with that id already exists in the task' })
        }
    })

}

























// \\\\\\\\\\\\\\\\\Spaghetti code:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    // return db('tasks_resource')
    //     .insert({ resource_id, task_id}, 'id')
    //     .then(() => {
    //     return  db('resource')
    //       .select('resource.*', 'tr.task_id')
    //       .join('tasks_resource as tr')
    //       .where('id', '=', resource_id)
    //       .first()
    //     })

    // return db('resource')
    // .insert(newResource, 'id')
    // .then( ([id]) => {
    //   return  db('resource')
    //     .where({id})
    //     .first()
    // })



// function UpdateThirdTable(project_id, resource_id) {
    //     return db('projects_resource as pr')
    //         .insert(resource_id, 'id')
    //         .where('pr.project_id', '=', project_id)
    //     // .then( ([id]) => {
    //     //     return    db('projects_resource')
    //     //     .where({id})
    //     //     .first()

    //     // })
    // }

    // return db('resource')
    //     .select('resource.*', 'projects.project_name', 'pr.*')
    //     .join('projects_resource as pr', 'resource.id', 'pr.resource_id')
    //     .join('projects', 'projects.id', 'pr.project_id')
    //     .where('projects.id', '=', project_id)
    //     .insert(newResource, 'id')
    //     .then(([id]) => {

    //         return db('resource')
    //             .where({ id }).first()
    //             .then(() => {
    //                 return db('projects_resource')
    //                     .where('projects_resource.resource_id', '=', id)
    //                     .insert(project_id, 'id')
    //             })
    //             .catch( err => {
    //                 console.log(err.message)
    //             })

    //     })
    //     .catch( err => {
    //         console.log(err.message)
    //     })


// return db('resource')
// .insert(newResource, 'id')
// .then( ([id]) => { 
//    return UpdateThirdTable(project_id, id)
//     .then(() => {
//         return db('resource')
//         .where({id})
//         .first()
//     })

// })

    // return db('resource')
    // // .select('resource.*', 'pr.project_id')
    // // .join('projects_resource as pr', 'resource.id', 'pr.resource_id')
    // // .where('project_id', '=', project_id)
    // .insert(newResource, 'id')
    // .then( ([id]) => {
    //     return  db('resource')
    //     .select('resource.*', 'pr.project_id')
    //     .join('projects_resource as pr', 'resource.id', 'pr.resource_id')
    //     .where('project_id', '=', project_id)
    //     .where({id})
    //     .first()
    // })

    // return db('resource')
    // .insert(newResource, 'id')
    // .then( ([id]) => {
    //     return db('projects_resource as pr')
    //     .select('pr.*')
    //     .join('resource as r', 'r.id', 'pr.resource_id' )
    //     .join('projects as p', 'p.id', 'pr.project_id')
    //     .then((prStuff)  =>{
    //         console.log('something:',prStuff)
    //         if(!prStuff.filter(pr => pr.resource_id === id)){
    //         return    db('project_resource')
    //             .insert(id, 'id')
    //             .where('pr.resource_id', '=', id)
    //         }else{
    //             return  db('resource')
    //             .where({id})
    //             .first()
    //         }
    //     })
    // })



//    return db('resouce')
//    .insert(newResource).returning('id')
//    .then(([id]) => {
//        return db('projects_resource as pr')
//        .select('resource.*')
//        .join('resource', 'resource.id', 'pr.resource_id')
//        .insert(id, 'newid')
//        .then(([newid]) => {
//            return db('resource')
//            .where({id})

//        })

//    })