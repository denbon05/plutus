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
    title: 'Мой денежный поток',
    income: 'Доход',
    monthly: 'Ежемесячно',
    costs: 'Расходы',
    limits: 'Пределы',
    save: 'Сохранять',
    close: 'Закрывать',
    defaultValue: {
      mortgage: 'Ипотека',
      creditCard: 'Кредитная карта',
      food: 'Еда',
      internet: 'Интернет',
      publicService: 'Гос. служба',
      fuel: 'Топливо',
    },
  },

  error: {
    server: 'Server error',
    action: {
      retry: 'Do my best',
    },
  },
};
