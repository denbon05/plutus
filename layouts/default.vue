<template>
  <div>
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
            <CashFlowModal :isCanStartUser="isCanStartUser" />
          </b-tooltip>
        </div>
        <div id="date-picker" class="w-120">
          <b-field>
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
      </section>

      <section id="end" class="is-flex is-justify-content-end is-align-items-center">
        <auth />
      </section>

      <b-dropdown id="menu" :mobile-modal="false" position="is-bottom-left" aria-role="list">
        <template #trigger>
          <b-button icon-left="cog" />
        </template>

        <b-dropdown-item aria-role="listitem" class="menu-item"><auth /></b-dropdown-item>
      </b-dropdown>
    </nav>

    <section class="main-content columns">
      <div class="container column is-10">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import CashFlowModal from '~/components/CashFlow.vue';
import Auth from '~/components/Auth.vue';

export default {
  name: 'MainLayout',
  components: {
    Auth,
    CashFlowModal,
  },
  data() {
    return {
      menuIsVisible: false,
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
  width: calc($nav-icon-size + 7px);
}

.w-120 {
  width: 120px;
}
</style>
