<template>
  <section>
    <navbar />
    <budget-table />
  </section>
</template>

<script>
import budgetTable from './budget-table.vue';
import navbar from './navbar.vue';

export default {
  name: 'MainLayout',
  components: {
    budgetTable,
    navbar,
  },
};
</script>
