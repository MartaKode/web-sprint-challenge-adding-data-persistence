
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resource').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resource').insert([
        { resource_name: 'dog', resource_description: 'animal'},
        { resource_name: 'boyfriend', resource_description: 'a boy'},
        { resource_name: 'mic', resource_description: 'microphone'},
        { resource_name: 'camera'}
      ]);
    });
};
