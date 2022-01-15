<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <div
        id="modal-header"
        class="modal-card-title is-flex is-justify-content-flex-start is-align-items-center"
      >
        <img class="nav-icon" src="~/assets/moneybox_icon.svg" :alt="$t('alt.moneyboxPig')" />
        <span>{{ $t('cashFlow.title') }}</span>
        <b>{{ income }}</b>
        <b-select
          v-model="currencyData"
          :loading="queryState.isLoading"
          :disabled="queryState.isLoading"
        >
          <option
            v-for="currencyDataOpt in currencies"
            :key="currencyDataOpt.name"
            :value="currencyDataOpt"
          >
            {{ currencyDataOpt.symbol }}
          </option>
        </b-select>
      </div>
      <button type="button" class="delete" @click="$parent.close()" />
    </header>
    <section id="grid-container" class="modal-card-body">
      <section id="income" class="is-flex is-flex-wrap-nowrap">
        <b-field :label="$t('cashFlow.income')">
          <b-numberinput
            controls-alignment="right"
            controls-position="compact"
            controls-rounded
            :value="income"
            :exponential="1.5"
            :disabled="queryState.isLoading"
          ></b-numberinput>
        </b-field>
        <b-field>
          <b-switch :disabled="true" size="is-small" :value="isMonthlyIncome" type="is-info">
            {{ $t('cashFlow.monthly') }}
          </b-switch>
        </b-field>
      </section>

      <section id="costs">
        <b-field :label="$t('cashFlow.costs')">
          <b-taginput
            v-model="costs"
            field="name"
            size="is-medium"
            type="is-dark"
            close-type="is-warning"
            :disabled="queryState.isLoading"
            @add="capitalize"
          >
          </b-taginput>
        </b-field>
      </section>

      <section id="limits">
        <h1 class="title">{{ $t('cashFlow.limits') }}</h1>
        <b-field group-multiline>
          <b-field
            v-for="costData in costs"
            :key="costData.name"
            class="limit-item"
            :label="costData.name"
            :label-for="costData.name"
            :disabled="queryState.isLoading"
          >
            <b-numberinput
              :id="costData.name"
              controls-alignment="right"
              controls-position="compact"
              class="mx-2"
              :value="costData.limit"
              :exponential="1.5"
            ></b-numberinput>
          </b-field>
        </b-field>
      </section>
    </section>
    <footer class="modal-card-foot">
      <b-button :label="$t('cashFlow.close')" @click="$parent.close()" />
      <b-button
        :label="$t('cashFlow.save')"
        type="is-primary"
        :disabled="!queryState.isSuccess || queryState.isLoading"
        @click="sendData"
      />
    </footer>
  </div>
</template>

<script>
import currencyList from 'currency-list';

export default {
  data() {
    return {
      queryState: {
        isSuccess: true,
        isLoading: false,
        message: '',
      },

      income: 3000,
      currencies: _.values(currencyList.getAll('en_US')),
      currencyData: {},
      isMonthlyIncome: true,
      costs: [
        { name: 'Mortgage', limit: 0 },
        { name: 'Credit card', limit: 0 },
        { name: 'Food', limit: 0 },
        { name: 'Internet', limit: 0 },
        { name: 'Public service', limit: 0 },
        { name: 'Fuel', limit: 0 },
      ],
    };
  },
  watch: {
    queryState() {
      if (this.queryState.message && !this.queryState.isSuccess) {
        this.showToast();
      }
    },
  },
  mounted() {
    this.currencyData = currencyList.get('PLN');
  },
  methods: {
    sendData() {
      console.log('this=>', this);
    },
    capitalize(value) {
      this.costs[this.costs.length - 1] = {
        name: _.capitalize(value),
        limit: 0,
      };
    },
    showToast(message = this.queryState.message, type = 'is-danger') {
      this.$buefy.toast.open({
        duration: 7000,
        message,
        position: 'is-top',
        type,
        'pause-on-hover': true,
      });
    },
  },
};
</script>

<style lang="scss">
@import '~/assets/css/_variables';

#income {
  grid-area: income;
}
#costs {
  grid-area: costs;
}
#limits {
  grid-area: limits;
}

#grid-container {
  display: grid;
  background: $color-helper-1;
  align-content: start;
}

#modal-header {
  gap: 10px;
}

#limits {
  .limit-item {
    width: 160px;
  }
}

@include from($tablet) {
  #grid-container {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(100px, auto);
    grid-template-areas:
      'income costs costs'
      'limits limits limits';
    grid-gap: 10px;
    padding: 15px 25px;
  }
}

@include until($tablet) {
  #grid-container {
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: minmax(100px, auto);
    grid-template-areas:
      'income'
      'costs'
      'limits';
    grid-gap: 10px;
    padding: 15px 25px;
  }
}
</style>
