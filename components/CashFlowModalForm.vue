<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ $t('cashFlow.title') }}</p>
    </header>
    <section id="grid-container" class="modal-card-body">
      <section id="income" class="is-flex is-flex-wrap-nowrap">
        <b-field :label="$t('cashFlow.income')">
          <b-numberinput
            controls-alignment="right"
            controls-position="compact"
            controls-rounded
          ></b-numberinput>
        </b-field>
        <b-field>
          <b-switch size="is-small" :value="true" type="is-info">
            {{ $t('cashFlow.monthly') }}
          </b-switch>
        </b-field>
      </section>

      <section id="costs">
        <b-field :label="$t('cashFlow.costs')">
          <b-taginput v-model="costs" type="is-dark" close-type="is-warning">
          </b-taginput>
        </b-field>
      </section>
    </section>
    <footer class="modal-card-foot">
      <b-button :label="$t('cashFlow.save')" @click="$parent.close()" />
      <b-button :label="$t('cashFlow.close')" type="is-primary" />
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      costs: [
        'mortgage',
        'credit card',
        'food',
        'internet',
        'public service',
        'fuel',
      ],
    };
  },
};
</script>

<style lang="scss">
@import '~/assets/css/_variables';

// #income {
//   grid-area: income;
// }

// #costs {
//   grid-area: costs;
// }

#grid-contanier {
  display: grid;
  background: $color-helper-1;
}

@include from($tablet) {
  #grid-contanier {
    // grid-template-areas: 'income costs';
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(100px, auto);
    grid-gap: 10px;

    #income {
      grid-column: 1 / 2;
      grid-row: 1;
    }

    #costs {
      grid-column: 2 / 3;
      grid-row: 1;
    }
  }
}

// @include until($tablet) {
// }
</style>
