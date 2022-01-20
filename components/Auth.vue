<template>
  <section>
    <div class="buttons is-flex-wrap-nowrap is-justify-content-center">
      <a class="button second-color" @click="openSignUpModal">
        <strong>{{ $t('user.auth.signUp.title') }}</strong>
      </a>
      <a class="button is-light" @click="openLogInModal">{{ $t('user.auth.logIn.title') }}</a>
    </div>
  </section>
</template>

<script>
import SignUpModal from '~/components/SignUpModal.vue';
import LogInModal from '~/components/LogInModal.vue';

export default {
  methods: {
    imageModal() {
      const h = this.$createElement;
      const vnode = h('p', { class: 'image is-4by3' }, [
        h('img', { attrs: { src: 'https://buefy.org/static/img/placeholder-1280x960.png' } }),
      ]);
      this.$buefy.modal.open({
        content: [vnode],
      });
    },
    openSignUpModal() {
      this.$buefy.modal.open({
        parent: this,
        component: SignUpModal,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        events: {},
      });
    },
    openLogInModal() {
      this.$buefy.modal.open({
        parent: this,
        component: LogInModal,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      });
    },
  },
};
</script>
