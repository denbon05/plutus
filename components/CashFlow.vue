<template>
  <section>
    <img
      id="coin"
      class="nav-icon"
      :class="{ pulse: !isCanStartUser() }"
      src="~/static/lucky_coin.png"
      :alt="$t('alt.luckyCoin')"
      @click="isComponentModalActive = true"
    />

    <b-modal v-model="isComponentModalActive" has-modal-card full-screen :can-cancel="false">
      <cash-flow-modal-form></cash-flow-modal-form>
    </b-modal>
  </section>
</template>

<script>
import CashFlowModalForm from '~/components/CashFlowModalForm.vue';

export default {
  components: {
    CashFlowModalForm,
  },
  props: {
    isCanStartUser: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isComponentModalActive: false,
      formProps: {
        email: 'evan@you.com',
        password: 'testing',
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/_variables';

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
