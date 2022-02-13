<template>
  <div class="modal-card" style="width: auto">
    <header id="modal-header-container" class="modal-card-head">
      <div
        id="modal-header"
        class="modal-card-title is-flex is-justify-content-flex-start is-align-items-center"
      >
        <img
          class="nav-icon"
          src="~/assets/personal-scrooge-mcduck-scrooge-mcduck-hat-png-transparent.svg"
          :alt="$t('alt.scroogeIcon')"
        />
        <span id="cashflowModalTitle">{{ $t('cashFlow.title') }}</span>
        <b>{{ cashflow }}</b>
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
        <template v-if="!isMonthlyIncome">
          <div id="date-picker" class="w-120">
            <b-field>
              <b-datepicker
                v-model="monthAndYear"
                type="month"
                :placeholder="$t('date.month.select')"
                icon="calendar-today"
                trap-focus
                :mobile-native="false"
              >
              </b-datepicker>
            </b-field>
          </div>
        </template>
      </div>
      <button type="button" class="delete" @click="$parent.close()" />
    </header>
    <section id="grid-container" class="modal-card-body">
      <section id="income" class="is-flex">
        <b-field :label="$t('cashFlow.income')">
          <b-numberinput
            v-model="income"
            controls-alignment="right"
            controls-position="compact"
            controls-rounded
            :exponential="1.5"
            :disabled="queryState.isLoading"
          ></b-numberinput>
        </b-field>
        <b-field>
          <b-switch disabled size="is-small" :value="isMonthlyIncome" type="is-info">
            {{ $t('cashFlow.monthly') }}
          </b-switch>
        </b-field>
      </section>

      <section id="costs" :style="{ 'max-width': `${screen.width - 30}px` }">
        <b-field :label="$t('cashFlow.costs')">
          <b-taginput
            v-model="costs"
            field="name"
            size="is-medium"
            close-type="is-warning"
            :disabled="queryState.isLoading"
            :before-adding="beforeAdding"
            @add="formatCosts"
          >
            >
          </b-taginput>
        </b-field>
      </section>

      <section id="limits">
        <h1 class="title">{{ $t('cashFlow.limits') }}</h1>
        <section class="is-flex is-flex-wrap-wrap">
          <b-field
            v-for="(cost, costIdx) in costs"
            :key="cost.name"
            class="limit-item"
            :label="cost.name"
            :label-for="cost.name"
            :disabled="queryState.isLoading"
          >
            <b-numberinput
              :id="cost.name"
              :ref="`cost_${costIdx}`"
              v-model="costs[costIdx].limit"
              :data-idx="costIdx"
              controls-alignment="right"
              controls-position="compact"
              class="mx-2"
              :exponential="1.5"
              min="0"
            ></b-numberinput>
          </b-field>
        </section>
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
      screen: { width: window.innerWidth, height: window.innerHeight },
      queryState: {
        isSuccess: true,
        isLoading: false,
        message: '',
      },

      cashflow: 0,
      income: 3000,
      currencies: _.values(currencyList.getAll('en_US')),
      currencyData: {},
      monthAndYear: new Date(),
      isMonthlyIncome: true,
      costs: [
        { name: this.$t('cashFlow.defaultValue.mortgage'), limit: 0 },
        { name: this.$t('cashFlow.defaultValue.creditCard'), limit: 0 },
        { name: this.$t('cashFlow.defaultValue.food'), limit: 0 },
        { name: this.$t('cashFlow.defaultValue.internet'), limit: 0 },
        { name: this.$t('cashFlow.defaultValue.publicService'), limit: 0 },
        { name: this.$t('cashFlow.defaultValue.fuel'), limit: 0 },
      ],
    };
  },
  watch: {
    queryState() {
      if (this.queryState.message && !this.queryState.isSuccess) {
        this.$emit('showToast', this.queryState.message);
      }
    },
    income: {
      handler() {
        this.countCashFlow();
      },
      deep: true,
      immediate: false,
    },
    costs: {
      handler() {
        this.countCashFlow();
      },
      deep: true,
      immediate: false,
    },
  },
  mounted() {
    this.currencyData = currencyList.get('PLN');
    this.countCashFlow();
    window.addEventListener('resize', this.onResize);
    this.costs.forEach(this.addEventListenerFocusNextCostInput);
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    beforeAdding(tag) {
      const validTag = tag.length < 15;
      if (!validTag)
        this.$emit('showToast', { message: this.$t('error.maxLength', { count: 15 }) });
      return validTag;
    },
    countCashFlow() {
      this.cashflow = this.income - _.sumBy(this.costs, 'limit');
    },
    addEventListenerFocusNextCostInput({ name }) {
      document.getElementById(name).addEventListener('keypress', (e) => {
        if (e.code === 'Enter') {
          this.pressEnterCostInput(e.target.dataset.idx);
        }
      });
    },
    pressEnterCostInput(costIdx) {
      if (this.costs.length - 1 > costIdx) {
        _.head(this.$refs[`cost_${Number(costIdx) + 1}`]).focus();
      }
    },
    onResize() {
      this.screen = { width: window.innerWidth, height: window.innerHeight };
    },
    sendData() {
      const { cashflow, income, currencyData: currency, monthAndYear: forDate, costs } = this;
      console.log('this=>', this);
      console.log('sendedData=>', {
        cashflow,
        income,
        currency,
        monthAndYear: forDate,
        costs,
      });
    },
    formatCosts(value) {
      const costIdx = this.costs.length - 1;
      const capitalizedName = _.capitalize(value);
      this.costs[costIdx] = {
        name: capitalizedName,
        limit: 0,
      };
      this.costs = _.uniqBy(this.costs, 'name');
      setTimeout(() => this.addEventListenerFocusNextCostInput({ name: capitalizedName }), 0);
    },
  },
};
</script>

<style lang="scss">
@import '~/assets/css/_variables';

#modal-header-container {
  padding: 7px 10px;
}
#cashflowModalTitle {
  display: none;
}

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
  #cashflowModalTitle {
    display: block;
  }

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
    padding: 5px 10px;
  }
}
</style>
