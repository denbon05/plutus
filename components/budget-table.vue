<template>
  <section class="hero">
    <nav
      id="navbar"
      class="main-color is-flex is-justify-content-space-between is-align-items-center"
      role="navigation"
      aria-label="main navigation"
    >
      <section id="start" class="is-flex is-justify-content-flex-start is-align-items-center">
        <div>
          <b-tooltip
            :delay="1500"
            multilined
            size="is-small"
            :label="$t('cashFlow.title')"
            type="is-light"
            position="is-right"
          >
            <NuxtLink :to="'/cashflow'">
              <img
                id="coin"
                class="nav-icon"
                :class="{ pulse: !isCanStartUser() }"
                src="~/static/lucky_coin.png"
                :alt="$t('alt.luckyCoin')"
              />
            </NuxtLink>
          </b-tooltip>
        </div>
        <div id="date-picker" class="w-120">
          <b-field>
            <b-datepicker
              v-model="monthAndYear"
              type="month"
              :placeholder="$t('date.month.select')"
              icon="calendar-today"
              trap-focus
              :mobile-native="false"
            >
            </b-datepicker>
          </b-field>
        </div>
      </section>

      <section id="end" class="is-flex is-justify-content-end is-align-items-center">
        <authorization />
      </section>

      <b-dropdown id="menu" :mobile-modal="false" position="is-bottom-left" aria-role="list">
        <template #trigger>
          <b-button icon-left="cog" />
        </template>

        <b-dropdown-item aria-role="listitem" class="menu-item"><authorization /></b-dropdown-item>
      </b-dropdown>
    </nav>
  </section>
</template>

<script>
import authorization from '~/components/authorization.vue';

export default {
  name: 'MainLayout',
  components: {
    authorization,
  },
  data() {
    return {
      menuIsVisible: false,

      monthAndYear: new Date(),
    };
  },
  beforeMount() {
    this.$store.dispatch('auth/initUser');
    console.log('this=>', this);
  },
  methods: {
    isCanStartUser() {
      return !this.$store.state.auth.user.isGuest();
    },
  },
};
</script>

<style lang="scss">
@import '~/assets/css/_variables';

$nav-height: 56px;
$default-paddings: 0 20px;

#navbar {
  height: $nav-height;
  min-width: 100%;
  padding: $default-paddings;
  position: relative;

  #start {
    gap: 20px;
  }

  .menu-item {
    padding: 10px;
  }

  @include from($tablet) {
    #menu {
      display: none !important;
    }
  }

  @include until($tablet) {
    #end {
      display: none !important;
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
  width: calc($nav-icon-size + 27px);
}

.w-120 {
  width: 120px;
}

#coin {
  &:hover {
    cursor: pointer;
    transform: scale(1.07, 1.07);
  }
}

.nav-icon {
  width: $nav-icon-size;
}

.pulse {
  animation: pulse 2s linear 0.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1.1, 1.1);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  75% {
    transform: scale(1.1, 1.1);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>
