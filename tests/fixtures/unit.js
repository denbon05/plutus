export default {
  allKeysToCamelcase: {
    actual: [
      {
        FirstName: 'John',
        'last-name': 'Smith',
        ArrayTest: ['one', 'TWO', 3],
        ThisKey: {
          'This-Sub-Key': 42,
          'nested-again': {
            'long-long-key': 'val',
          },
        },
      },
    ],
    expected: [
      {
        firstName: 'John',
        lastName: 'Smith',
        arrayTest: ['one', 'TWO', 3],
        thisKey: {
          thisSubKey: 42,
          nestedAgain: {
            longLongKey: 'val',
          },
        },
      },
    ],
  },
};
