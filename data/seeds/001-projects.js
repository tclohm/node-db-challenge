
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        { 
          name: "The Miller Project", 
          description: "Beer distributor wants an advertisement", 
          completed: false,
        },
        { 
          name: "Supermarket", 
          description: "Trader Joes wants more revenue", 
          completed: true 
        },
      ]);
    });
};
