
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        { task_description: 'find a dog', task_notes: 'name it Marta', task_completed: true, project_id: 1},
        { task_description: 'feed it alphabet noodle soup', task_completed: false, project_id: 1},
        { task_description: 'give boyfriend nicknames', task_notes: 'NASTUS', task_completed: true, project_id: 2},
        { task_description: 'watch BuddyChannel for zoom link', task_completed: true, project_id: 3},
        { task_description: 'hop on in!', task_notes: ' turn on camera and mic', task_completed: false, project_id: 3}
      ]);
    });
};
