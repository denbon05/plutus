<template>
  <div>
    <nav
      id="navbar"
      class="main-color is-flex is-justify-content-space-between is-align-items-center"
      role="navigation"
      aria-label="main navigation"
    >
      <section
        id="start"
        class="is-flex is-justify-content-flex-start is-align-items-center"
      >
        <div id="brand" class="is-flex">
          <nuxt-link :to="localePath('index')">
            <img
              class="nav-icon"
              src="~assets/moneybox_icon.svg"
              :alt="$t('alt.pigCoin')"
            />
          </nuxt-link>
        </div>

        <div>
          <b-field id="date-picker">
            <b-datepicker
              v-model="currentMonthAndYear"
              type="month"
              :placeholder="$t('date.month.select')"
              icon="calendar-today"
              trap-focus
              :mobile-native="false"
            >
            </b-datepicker>
          </b-field>
        </div>
        <div>
          <b-tooltip
            type="is-warning"
            :label="!isCanStartUser() ? $t('tips.getStart') : $t('tips.title')"
            position="is-right"
            :always="!isCanStartUser()"
          >
            <CashFlowModal :isCanStartUser="isCanStartUser" />
          </b-tooltip>
        </div>
      </section>

      <section
        id="end"
        class="is-flex is-justify-content-end is-align-items-center"
      >
        <div class="buttons is-flex-wrap-nowrap">
          <a class="button second-color">
            <strong>{{ $t('user.session.signUp') }}</strong>
          </a>
          <a class="button is-light">{{ $t('user.session.signIn') }}</a>
        </div>
      </section>
      <div class="burger">
        <img src="~assets/nav_menu_icon.png" :alt="$t('alt.menuIcon')" />
      </div>
    </nav>

    <section class="main-content columns">
      <div class="container column is-10">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import CashFlowModal from '~/components/CashFlowModal.vue';

export default {
  name: 'MainLayout',
  components: {
    CashFlowModal,
  },
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' },
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' },
        },
      ],
    };
  },
  computed: {
    currentMonthAndYear() {
      return new Date();
    },
  },
  methods: {
    isCanStartUser() {
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/_variables';

#navbar {
  min-height: 62px;
  min-width: 100%;
  padding: 5px 20px;

  #start {
    gap: 20px;

    #date-picker {
      width: 120px;
    }
  }

  @include from($tablet) {
    .burger {
      display: none;
    }
  }

  @include until($tablet) {
    .buttons {
      display: none !important;
    }
    .burger {
      width: calc($nav-icon-size + 10px);
      &:hover {
        cursor: pointer;
        animation: click 1s linear 0.5s;
      }

      @keyframes click {
        from {
          transform: scale(1, 1);
        }
        to {
          transform: scale(1.02, 1.02);
        }
      }
    }
  }
}

.main-color {
  background: $main-color;
}
.second-color {
  background: $second-color;
}
.nav-icon {
  width: calc($nav-icon-size + 7px);
}
</style>
