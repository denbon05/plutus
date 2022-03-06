export default {
  date: {
    month: {
      select: 'Выберите месяц',
    },
  },

  user: {
    auth: {
      logIn: {
        title: 'Авторизоваться',
        ok: 'Войти',
      },
      signUp: {
        title: 'Создать профиль',
        ok: 'Зарегистрироваться',
        repeatPassword: 'Повторите пароль',
        name: 'Имя',
      },
      signOut: {
        title: 'Выход',
      },
      common: {
        email: 'e-mail',
        password: 'Пароль',
        cancel: 'Отмена',
        close: 'Закрыть',
        placeholder: {
          password: 'Пароль',
          email: 'Адрес электронной почты',
        },
      },

      error: {
        format: 'Должен быть в формате {name}',
        length: 'Длина {name} минимум {count} символов',
        notEqual: '{name} не одинаковый',
        required: 'Обязательное поле',
      },

      message: {
        success: 'Удачно получилось {name}',
      },
    },
  },

  cashFlow: {
    title: 'Денежный поток',
    income: 'Доход',
    monthly: 'Ежемесячно',
    costs: 'Расходы',
    limits: 'Лимиты',
    save: 'Сохранить',
    close: 'Закрыть',
    defaultValue: {
      mortgage: 'Ипотека',
      creditCard: 'Кредитная карта',
      food: 'Еда',
      internet: 'Интернет',
      publicService: 'Гос. служба',
      fuel: 'Топливо',
    },
  },

  alt: {
    luckyCoin: 'Счастливая монета значок',
    scroogeIcon: 'Иконка Скруджа Макдака',
  },

  error: {
    server: 'Ошибка сервера',
    maxLength: 'Максимальная позволенная длина {count} символов',
    uniqEmail: 'Пользователь уже существует с таким e-mail',
    action: {
      retry: 'Делаю все что в моих силах',
    },
  },
};
