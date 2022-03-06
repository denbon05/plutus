<template>
  <section id="logInModal">
    <form action="">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ $t('user.auth.logIn.title') }}</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field :type="!queryState.isSuccess && !isEmailFormat() ? 'is-danger' : null">
            <template #label>
              <span v-if="!isEmailFormat() && !queryState.isSuccess" class="has-text-danger-dark">
                {{ $t('user.auth.error.format', { name: $t('user.auth.common.email') }) }}
              </span>
              <span v-else>
                {{ $t('user.auth.common.email') }}
              </span>
            </template>
            <b-input
              ref="email"
              :value="email"
              type="email"
              :placeholder="$t('user.auth.common.placeholder.email')"
              @input="(value) => typing('email', value)"
            >
            </b-input>
          </b-field>

          <b-field :type="!queryState.isSuccess && !passwordIsAllowedLength() ? 'is-danger' : null">
            <template #label>
              <span v-if="!isEmailFormat() && !queryState.isSuccess" class="has-text-danger-dark">
                {{
                  $t('user.auth.error.length', {
                    name: $t('user.auth.common.password'),
                    count: minPasswordLength,
                  })
                }}
              </span>
              <span v-else>
                {{ $t('user.auth.common.password') }}
              </span>
            </template>
            <b-input
              type="password"
              :value="password"
              password-reveal
              :placeholder="$t('user.auth.common.placeholder.password')"
              @input="(value) => typing('password', value)"
            >
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button :label="$t('user.auth.common.cancel')" @click="$emit('close')" />
          <b-button :label="$t('user.auth.logIn.ok')" type="is-primary" @click="logIn" />
        </footer>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  inject: ['showToast'],
  props: {
    minPasswordLength: {
      type: Number,
      default: 8,
    },
  },
  data() {
    return {
      queryState: {
        isSuccess: true,
        isLoading: false,
        message: '',
      },

      email: '',
      password: '',
    };
  },
  watch: {
    queryState: {
      handler() {
        const { isLoading, message, isSuccess } = this.queryState;
        if (!isLoading && message) {
          this.showToast({ message, type: isSuccess ? 'is-success' : 'is-danger' });
        }
      },
      deep: true,
      immediate: false,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.email.focus();
    });
  },
  methods: {
    async logIn() {
      console.log('this=>', this);
      if (this.canSendData()) {
        this.queryState.isLoading = true;
        try {
          const {
            isSuccess,
            message = this.$t('user.auth.message.success', {
              name: this.$t('user.auth.logIn.title'),
            }),
          } = await this.$store.dispatch('auth/logIn', {
            password: this.password,
            email: this.email,
          });
          console.log('logIn res =>', { isSuccess, message });
          this.queryState = {
            isSuccess,
            message,
            isLoading: false,
          };
          this.$emit('close');
        } catch (err) {
          console.error(err);
          this.$rollbar.debug(err);
          this.queryState = { isSuccess: false, message: err.message, isLoading: false };
        }
      } else {
        this.$set(this.queryState, 'isSuccess', false);
      }
    },
    isEmailFormat() {
      return this.email.match(/.+@.+\..+/i);
    },
    passwordIsAllowedLength() {
      return this.password.length >= 8;
    },
    canSendData() {
      return this.isEmailFormat() && this.passwordIsAllowedLength();
    },
    typing(inputname, value) {
      this.$set(this, inputname, value);
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
