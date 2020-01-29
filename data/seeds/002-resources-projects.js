
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources-projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources-projects').insert([
        { project_id: 1, resource_id: 1 },
        { project_id: 1, resource_id: 2 },
        { project_id: 1, resource_id: 3 },
        { project_id: 2, resource_id: 2 },
        { project_id: 2, resource_id: 3 }
      ]);
    });
};
