
exports.up = function (knex) {
    // knex.schema.table('resource', tbl => { // --> if one to many relationship
    //     tbl.integer('task_id')
    //         .unsigned()
    //         .notNullable()
    //         .references('tasks.id')
    //         .onUpdate('CASCADE') //--> for foregin keys
    //         .onDelete('CASCADE') //--> for foregin keys
    // })
return    knex.schema.createTable('tasks_resource', tbl => {
        tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resource.id')
        .onUpdate('CASCADE') //--> for foregin keys
        .onDelete('CASCADE') //--> for foregin keys

        tbl.integer('task_id')
        .unsigned()
        .notNullable()
        .references('tasks.id')
        .onUpdate('CASCADE') //--> for foregin keys
        .onDelete('CASCADE') //--> for foregin keys
    })
};

exports.down = function (knex) {
    // knex.schema.table('resource', tbl => {
    //     tbl.dropColumn('task_id')
    // })

return    knex.schema.dropTableIfExists('tasks_resource')
};
