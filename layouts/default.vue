<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'MainLayout',
  provide() {
    return {
      showToast: this.showToast,
    };
  },
  methods: {
    showToast({ message = this.queryState.message, type = 'is-danger' }) {
      this.$buefy.toast.open({
        duration: type === 'is-success' ? 2500 : 7000,
        message,
        position: 'is-top',
        type,
        'pause-on-hover': true,
      });
    },
  },
};
</script>
