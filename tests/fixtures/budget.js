export default {
  cashflow: {
    new: {
      profit: 1000,
      income: 2000,
      currency: {
        name: 'Polish Zloty',
        symbol_native: 'zł',
        symbol: 'zł',
        code: 'PLN',
        name_plural: 'Polish zlotys',
        rounding: 0,
        decimal_digits: 2,
      },
      monthAndYear: '2022-03-19T18:12:40.605Z',
      costs: [
        {
          name: 'Mortgage',
          limit: 700,
        },
        {
          name: 'Credit card',
          limit: 300,
        },
        {
          name: 'Public service',
          limit: 100,
        },
      ],
    },

    existing: [
      {
        id: 10,
        profit: 100,
        income: 300,
        currency: {
          name: 'Euro',
          symbol_native: '€',
          symbol: '€',
          code: 'EUR',
          name_plural: 'euros',
          rounding: 0,
          decimal_digits: 2,
        },
        costs: [
          {
            name: 'Toys',
            limit: 100,
          },
          {
            name: 'Plants',
            limit: 100,
          },
        ],
        for_date: '2022-02-01T18:12:40.605Z',
      },
    ],
  },
};
