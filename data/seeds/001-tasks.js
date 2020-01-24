
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        { description: "bill client", notes: "walk invoice in", completed: false, project_id: 1 },
        { description: "rent a scooter", notes: "use to hands", completed: true, project_id: 1 },
        { description: "pay contractor", notes: "wait til 2021", completed: false, project_id: 1 },
        { description: "buy a toe knife", notes: "", completed: false, project_id: 2 }
      ]);
    });
};
