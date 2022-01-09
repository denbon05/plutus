<template>
  <div>
    <b-navbar
      role="navigation"
      aria-label="main navigation"
      class="main-color"
      shadow
    >
      <template #brand>
        <b-navbar-item>
          <nuxt-link :to="localePath('index')">
            <img src="~assets/moneybox_icon.svg" :alt="$t('alt.pigCoin')" />
          </nuxt-link>
        </b-navbar-item>
      </template>

      <template #start>
        <b-navbar-item tag="div">
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
        </b-navbar-item>
        <b-navbar-item tag="div">
          <b-tooltip
            type="is-warning"
            :label="!isCanStartUser() ? $t('tips.getStart') : $t('tips.title')"
            position="is-right"
            :always="!isCanStartUser()"
          >
            <CashFlowModal :isCanStartUser="isCanStartUser" />
          </b-tooltip>
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button second-color">
              <strong>{{ $t('user.session.signUp') }}</strong>
            </a>
            <a class="button is-light">{{ $t('user.session.signIn') }}</a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

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
@import '~/assets/css/_variables.scss';

.main-color {
  background: $main-color;

  .second-color {
    background: $second-color;
  }

  .tooltip-content {
    margin-left: 20px;
  }
}
</style>
