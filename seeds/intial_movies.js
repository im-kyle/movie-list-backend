/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movie_data').del()
  await knex('movie_data').insert([
    {title: 'Mean Girls', description: '...', watched: true},
    {title: 'Hackers', description: '...', watched: false},
    {title: 'The Grey', description: '...', watched: true},
    {title: 'Sunshine', description: '...', watched: false},
    {title: 'Ex Machina', description: '...', watched: false}
  ]);
};