exports.seed = function (knex) {
  return knex('currencies')
    .del()
    .then(function () {
      return knex('currencies').insert([
        { id: 1, symbol: 'zł', currency: 'PLN' },
        { id: 2, symbol: '€', currency: 'EUR' },
        { id: 3, symbol: '$', currency: 'USD' },
      ]);
    });
};
