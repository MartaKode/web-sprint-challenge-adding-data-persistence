
exports.up = function(knex) {
    return knex.schema
    .createTable('projects', tbl => {
       tbl.increments()
   
       tbl.string('project_name').notNullable() //read me doesn't mention unique
       tbl.text('project_description', 'longtext')
       tbl.boolean('project_completed').defaultTo(false)
    })
   
    //--one project many tasks
    .createTable('tasks', tbl => {
       tbl.increments()
   
       tbl.text('task_description', 'mediumtext').notNullable()
       tbl.text('task_notes')
       tbl.boolean('task_completed').defaultTo(false)
   
       tbl.integer('project_id')
       .unsigned()
       .notNullable()
       .references('projects.id')
       .onUpdate('CASCADE') //--> for foregin keys
       .onDelete('CASCADE') //--> for foregin keys
    })
   
    //--many projects many resources --> third table!
    .createTable('resource', tbl => {
       tbl.increments()
   
       tbl.string('resource_name', 128).unique().notNullable()
       tbl.text('resource_description')
    })
    .createTable('projects_resource', tbl => {
        
        tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('projects.id')
        .onUpdate('CASCADE') //--> for foregin keys
        .onDelete('CASCADE') //--> for foregin keys
   
        tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resource.id')
        .onUpdate('CASCADE') //--> for foregin keys
        .onDelete('CASCADE') //--> for foregin keys
    })
   
   };
   
   exports.down = function(knex) {
     return knex.schema
     .dropTableIfExists('projects_resource')
     .dropTableIfExists('resource')
     .dropTableIfExists('tasks')
     .dropTableIfExists('projects')
   };
   