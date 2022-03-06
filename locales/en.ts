export default {
  date: {
    month: {
      select: 'Choose a month',
    },
  },

  user: {
    auth: {
      logIn: {
        title: 'Log In',
        ok: 'Sign In',
      },
      signUp: {
        title: 'Sign Up',
        ok: 'Create account',
        repeatPassword: 'Repeat password',
        name: 'Name',
      },
      signOut: {
        title: 'Sign Out',
      },
      common: {
        email: 'Email',
        password: 'Password',
        cancel: 'Cancel',
        close: 'Close',
        placeholder: {
          password: 'Your password',
          email: 'Your email',
        },
      },

      error: {
        format: 'Must be in {name} format',
        length: '{name} be at least {count} characters',
        notEqual: '{name} is not equal',
        required: 'Required field',
        name: 'Name must be at least {count} characters',
      },

      message: {
        success: '{name} successed',
      },
    },
  },

  cashFlow: {
    title: 'My Cashflow',
    income: 'Income',
    monthly: 'Monthly',
    costs: 'Costs',
    limits: 'Limits',

    save: 'Save',
    close: 'Close',

    defaultValue: {
      mortgage: 'Mortgage',
      creditCard: 'Credit card',
      food: 'Food',
      internet: 'Internet',
      publicService: 'Public service',
      fuel: 'Fuel',
    },
  },

  tips: {},

  alt: {
    luckyCoin: 'Lucky coin icon',
    scroogeIcon: 'Scrooge Mcduck icon',
  },

  error: {
    server: 'Server error',
    maxLength: 'Max length allowed {count} characters',
    uniqEmail: 'User is already exist with this email',
    action: {
      retry: 'Do my best',
    },
  },
};
