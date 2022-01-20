<template>
  <section id="sginUpModal">
    <form action="">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ $t('user.auth.signUp.title') }}</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field :label="$t('user.auth.common.email')">
            <b-input
              type="email"
              :value="email"
              :placeholder="$t('user.auth.common.placeholder.email')"
              required
              :validation-message="
                isEmailFormat() ? $t('user.auth.error.required') : $t('user.auth.error.email')
              "
            >
            </b-input>
          </b-field>

          <b-field :label="$t('user.auth.common.password')">
            <b-input
              type="password"
              :value="password"
              password-reveal
              :placeholder="$t('user.auth.common.placeholder.password')"
              required
              :validation-message="
                passwordIsCorrectLength()
                  ? $t('user.auth.error.required')
                  : $t('user.auth.error.passwordLength')
              "
            >
            </b-input>
          </b-field>

          <b-field :label="$t('user.auth.signUp.repeatPassword')">
            <b-input
              type="password"
              :value="password"
              password-reveal
              required
              :validation-message="
                passwordsAreEqual()
                  ? $t('user.auth.error.required')
                  : $t('user.auth.error.repeatPassword')
              "
            >
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button :label="$t('user.auth.common.cancel')" @click="$emit('close')" />
          <b-button :label="$t('user.auth.signUp.ok')" type="is-primary" @click="signUp" />
        </footer>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      repeatPassword: '',
    };
  },
  methods: {
    isEmailFormat() {
      return this.email.match(/.+@.+\..+/i);
    },
    passwordIsCorrectLength() {
      return this.password.length < 8;
    },
    passwordsAreEqual() {
      return this.password === this.repeatPassword;
    },
    signUp() {
      console.log('this=>', this);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/_variables';

@include from($tablet) {
  #sginUpModal {
    width: 600px;
  }
}

@include until($tablet) {
  #sginUpModal {
    width: 85%;
    min-width: 360px;
    margin: 0 auto;
  }
}
</style>
