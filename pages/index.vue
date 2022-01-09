<template>
  <div>
    <h1 class="title">NUXT as API Server</h1>
    <h2 class="subtitle">Users</h2>
    <button type="button" @click="$fetch">Refresh</button>
    <ol>
      <li
        v-for="user in users"
        :key="user.id"
        :class="{ highlight: user.highlight }"
        @click="getUserInfo(user.id)"
      >
        {{ user.full_name }}
      </li>
    </ol>
    <div v-if="userInfo">
      <hr />
      <h3>{{ userInfo.first_name }} {{ userInfo.last_name }}</h3>
      <div>Email: {{ userInfo.email }}</div>
      <img :src="userInfo.avatar" alt="avatar" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BudgetTable',
  data() {
    return {
      users: [],
      userInfo: null,
    };
  },
  async fetch() {
    this.users = await this.$api('users', 'index');
  },
  // created() {
  //   async function loadMonthlyData() {}
  // },
  methods: {
    async getUserInfo(id) {
      this.userInfo = await this.$api('users', 'show', { id });
    },
  },
};
</script>

<style scoped>
li {
  cursor: pointer;
}
.highlight {
  color: green;
  font-weight: bold;
}
</style>
