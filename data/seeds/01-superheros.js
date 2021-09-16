exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('superheros')
    .truncate()
    .then(function() {
      return knex('superheros').insert([
        { name: 'spiderman' },
        { name: 'superman' },
        { name: 'batman' },
        { name: 'wonderwoman' },
      ]);
    });
};
