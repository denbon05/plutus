<template>
  <section>
    <div class="buttons is-flex-wrap-nowrap is-justify-content-center">
      <template v-if="userIsGuest">
        <a class="button second-color" @click="openSignUpModal">
          <strong>{{ $t('user.auth.signUp.title') }}</strong>
        </a>
        <a class="button is-light" @click="openLogInModal">{{ $t('user.auth.logIn.title') }}</a>
      </template>

      <template v-else>
        <b-button icon-right="exit-to-app" @click="logOut">
          {{ userName }}
        </b-button>
      </template>
    </div>
  </section>
</template>

<script>
import SignUpModal from '~/components/SignUpModal.vue';
import LogInModal from '~/components/LogInModal.vue';

export default {
  data() {
    return {
      minPasswordLength: 8,
    };
  },
  computed: {
    userName() {
      return this.$store.state.auth.user.getName();
    },
    userIsGuest() {
      return this.$store.state.auth.user.isGuest();
    },
  },
  methods: {
    logOut() {
      this.$store.commit('auth/logOut');
    },
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
        props: {
          minPasswordLength: this.minPasswordLength,
        },
        component: SignUpModal,
        hasModalCard: true,
        trapFocus: true,
        events: { showToast: (args = {}) => this.$emit('showToast', args) },
      });
    },
    openLogInModal() {
      this.$buefy.modal.open({
        parent: this,
        props: {
          minPasswordLength: this.minPasswordLength,
        },
        component: LogInModal,
        hasModalCard: true,
        trapFocus: true,
        events: {
          showToast: (args = {}) => {
            console.log('auth showTOasts', args);
            this.$emit('showToast', args);
          },
        },
      });
    },
  },
};
</script>
