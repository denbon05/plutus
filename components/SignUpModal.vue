<template>
  <section id="sginUpModal">
    <form>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ $t('user.auth.signUp.title') }}</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field :type="!queryState.isSuccess && !isCorrectUsername() ? 'is-danger' : null">
            <template #label>
              <span
                v-if="!isCorrectUsername() && !queryState.isSuccess"
                class="has-text-danger-dark"
              >
                {{ $t('user.auth.error.length', { name: $t('user.auth.signUp.name'), count: 3 }) }}
              </span>
              <span v-else>
                {{ $t('user.auth.signUp.name') }}
              </span>
            </template>
            <b-input
              ref="name"
              type="text"
              :value="name"
              :placeholder="$t('user.auth.signUp.name')"
              @input="(value) => typing('name', value)"
            >
            </b-input>
          </b-field>

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

          <b-field :type="!queryState.isSuccess && !passwordsAreEqual() ? 'is-danger' : null">
            <template #label>
              <span
                v-if="!passwordsAreEqual() && !queryState.isSuccess"
                class="has-text-danger-dark"
              >
                {{
                  $t('user.auth.error.notEqual', {
                    name: $t('user.auth.common.password'),
                  })
                }}
              </span>
              <span v-else>
                {{ $t('user.auth.signUp.repeatPassword') }}
              </span>
            </template>
            <b-input
              type="password"
              :value="repeatPassword"
              password-reveal
              @input="(value) => typing('repeatPassword', value)"
            >
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button :label="$t('user.auth.common.cancel')" @click="$emit('close')" />
          <b-button
            :disabled="queryState.isLoading"
            :label="$t('user.auth.signUp.ok')"
            type="is-primary"
            @click="signUp"
          />
        </footer>
      </div>
    </form>
  </section>
</template>

<script>
export default {
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

      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    };
  },
  watch: {
    queryState: {
      handler() {
        const { isLoading, message, isSuccess } = this.queryState;
        if (!isLoading && message) {
          this.$emit('showToast', { message, type: isSuccess ? 'is-success' : 'is-danger' });
        }
      },
      deep: true,
      immediate: false,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.name.focus();
    });
  },
  methods: {
    isEmailFormat() {
      return this.email.match(/.+@.+\..+/i);
    },
    passwordIsAllowedLength() {
      return this.password.length >= 8;
    },
    passwordsAreEqual() {
      return this.password === this.repeatPassword;
    },
    isCorrectUsername() {
      return this.name.length >= 3;
    },
    canSendData() {
      return (
        this.isEmailFormat() &&
        this.passwordIsAllowedLength() &&
        this.passwordsAreEqual() &&
        this.isCorrectUsername()
      );
    },

    typing(inputname, value) {
      this.$set(this, inputname, value);
    },

    async signUp() {
      console.log('this=>', this);
      if (this.canSendData()) {
        this.queryState.isLoading = true;
        try {
          const {
            isSuccess,
            message = this.$t('user.auth.message.success', {
              name: this.$t('user.auth.signUp.title'),
            }),
          } = await this.$store.dispatch('auth/register', {
            name: this.name,
            password: this.password,
            email: this.email,
          });
          console.log('register res =>', { isSuccess, message });
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
