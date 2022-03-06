<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'MainLayout',
  provide() {
    return {
      showToast: this.showToast,
      logError: this.logError,
    };
  },
  data() {
    return {
      mode: process.env.NODE_ENV,
    };
  },
  methods: {
    showToast({ message = this.queryState.message, type, isSuccess = false }) {
      this.$buefy.toast.open({
        duration: type === 'is-success' || isSuccess ? 2500 : 7000,
        message,
        position: 'is-top',
        type: type || isSuccess ? 'is-success' : 'is-danger',
        'pause-on-hover': true,
      });
    },
    logError(err) {
      if (this.mode === 'production') this.$rollbar.debug(err);
      else console.error(err);
    },
  },
};
</script>
