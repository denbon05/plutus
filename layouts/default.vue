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
        <div>
          <b-tooltip
            multilined
            type="is-warning"
            :label="
              !isCanStartUser() ? $t('tips.getStart') : $t('cashFlow.title')
            "
            position="is-right"
            :always="!isCanStartUser()"
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

      <section
        id="end"
        class="is-flex is-justify-content-end is-align-items-center"
      >
        <nav-end-content />
      </section>

      <b-dropdown
        id="menu"
        :mobile-modal="false"
        position="is-bottom-left"
        aria-role="list"
      >
        <template #trigger>
          <b-button icon-left="cog" />
        </template>

        <b-dropdown-item aria-role="listitem" class="menu-item"
          ><nav-end-content
        /></b-dropdown-item>
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

const NavEndContent = {
  template: `
    <div class="buttons is-flex-wrap-nowrap is-justify-content-center">
      <a class="button second-color">
        <strong>{{ $t('user.session.signUp') }}</strong>
      </a>
      <a class="button is-light">{{ $t('user.session.signIn') }}</a>
    </div>
  `,
};

export default {
  name: 'MainLayout',
  components: {
    NavEndContent,
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

$nav-height: 62px;
$default-paddings: 5px 20px;

#navbar {
  min-height: $nav-height;
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
