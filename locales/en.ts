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
        username: 'Name',
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
        username: 'Name must be at least {count} characters',
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
  },

  tips: {},

  alt: {
    luckyCoin: 'Lucky coin icon',
    moneyboxPig: 'Moneybox pig icon',
  },

  error: {
    server: 'Server error',
    action: {
      retry: 'Do my best',
    },
  },
};
