<template>
  <section id="logInModal">
    <form action="">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ $t('user.auth.logIn.title') }}</p>
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
                isEmailFormat()
                  ? $t('user.auth.error.required')
                  : $t('user.auth.error.format', { name: $t('user.auth.common.email') })
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
                  : $t('user.auth.error.length', {
                      name: $t('user.auth.common.password'),
                      count: minPasswordLength,
                    })
              "
            >
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button :label="$t('user.auth.common.cancel')" @click="$emit('close')" />
          <b-button :label="$t('user.auth.logIn.ok')" type="is-primary" />
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
    minPasswordLength: {
      type: Number,
      default: 8,
    },
  },
  data() {
    return {};
  },
  methods: {
    isEmailFormat() {
      return this.email.match(/.+@.+\..+/i);
    },
    passwordIsCorrectLength() {
      return this.password.length <= this.minPasswordLength;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/_variables';

@include from($tablet) {
  #logInModal {
    width: 600px;
  }
}

@include until($tablet) {
  #logInModal {
    width: 85%;
    min-width: 360px;
    margin: 0 auto;
  }
}
</style>
