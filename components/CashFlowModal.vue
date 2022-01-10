<template>
  <section>
    <img
      id="coin"
      class="nav-icon"
      :class="{ pulse: !isCanStartUser() }"
      src="~/static/lucky_coin.png"
      :alt="$t('alt.luckyCoin')"
      @click="openModal"
    />

    <b-modal :destroy-on-hide="false">
      <form action="">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Login</p>
            <button type="button" class="delete" @click="$emit('close')" />
          </header>
          <footer class="modal-card-foot">
            <b-button label="Close" @click="$emit('close')" />
            <b-button label="Login" type="is-primary" />
          </footer>
        </div>
      </form>
    </b-modal>
  </section>
</template>

<script>
const ModalForm = {
  props: ['email', 'password'],
  template: `
    <div>
      <form action="">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Login</p>
            <button
              type="button"
              class="delete"
              @click="$emit('close')"/>
          </header>
          <section class="modal-card-body">
            <b-field label="Email">
              <b-input
                type="email"
                :value="email"
                placeholder="Your email"
                required>
              </b-input>
            </b-field>

            <b-field label="Password">
              <b-input
                type="password"
                :value="password"
                password-reveal
                placeholder="Your password"
                required>
              </b-input>
            </b-field>

            <b-checkbox>Remember me</b-checkbox>
          </section>
          <footer class="modal-card-foot">
            <b-button
                label="Close"
                @click="$emit('close')" />
            <b-button
                label="Login"
                type="is-primary" />
          </footer>
        </div>
      </form>
    </div>
  `,
};

export default {
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
  methods: {
    openModal() {
      this.$buefy.modal.open({
        parent: this,
        component: ModalForm,
        hasModalCard: true,
        customClass: 'w-50',
        trapFocus: true,
      });
    },
  },
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
