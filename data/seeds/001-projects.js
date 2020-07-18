
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        { project_name: 'Marta Speaks', project_description: 'a yellow dog with my name', project_completed: true},
        { project_name: 'Francus', project_description: 'boyfriend', project_completed: true},
        { project_name: 'Standup', project_completed: false}
      ]);
    });
};
