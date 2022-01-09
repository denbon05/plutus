<template>
  <div>
    <b-navbar
      role="navigation"
      aria-label="main navigation"
      class="navbar-main-color"
      shadow
    >
      <template #brand>
        <b-navbar-item>
          <nuxt-link :to="localePath('index')">
            <img
              src="~assets/moneybox_icon.svg"
              alt="Moneybox pig with coin"
            />
          </nuxt-link>
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button navbar-btn-second-color">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light"> Log in </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <section class="main-content columns">
      <div class="container column is-10">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' },
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/variables.scss';

.navbar-main-color {
  background: $main-color;

  .navbar-btn-second-color {
    background: $second-color;
  }
}
</style>
