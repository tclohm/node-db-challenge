
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        { name: "Hammer", description: "tool that hammers things" },
        { name: "Duct tape", description: "keeping things together" },
        { name: "Wallet", description: "makes the world go round and round" }
      ]);
    });
};
