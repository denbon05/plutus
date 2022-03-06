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
import signUpModal from '~/components/signup-dialog.vue';
import logInModal from '~/components/login-dialog.vue';

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
    openSignUpModal() {
      this.$buefy.modal.open({
        parent: this,
        props: {
          minPasswordLength: this.minPasswordLength,
        },
        component: signUpModal,
        hasModalCard: true,
        trapFocus: true,
      });
    },
    openLogInModal() {
      this.$buefy.modal.open({
        parent: this,
        props: {
          minPasswordLength: this.minPasswordLength,
        },
        component: logInModal,
        hasModalCard: true,
        trapFocus: true,
      });
    },
  },
};
</script>
