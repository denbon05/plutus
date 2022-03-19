<template>
  <div class="hero">
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
        <b>{{ profit }}</b>
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
      <nuxt-link to="/">
        <button type="button" class="delete" />
      </nuxt-link>
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
              :controls="false"
              class="mr-2"
              min="0"
            ></b-numberinput>
          </b-field>
        </section>
      </section>
    </section>
    <footer class="modal-card-foot">
      <section style="gap: 10px">
        <nuxt-link to="/">
          <b-button :label="$t('cashFlow.close')" />
        </nuxt-link>
        <b-button
          :label="$t('cashFlow.save')"
          type="is-primary"
          :disabled="queryState.isLoading"
          @click="sendData"
        />
      </section>
    </footer>
  </div>
</template>

<script>
import currencyList from 'currency-list';

export default {
  inject: ['showToast', 'logError'],
  data() {
    return {
      screen: { width: window.innerWidth, height: window.innerHeight },
      queryState: {
        isSuccess: true,
        isLoading: false,
        message: '',
      },

      profit: 0,
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
      if (!this.queryState.isSuccess) {
        this.showToast(this.queryState);
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
  beforeMount() {
    if (!this.$store.state.auth.user.isGuest()) {
      this.fetchBudgetData();
    }
  },
  mounted() {
    this.currencyData = currencyList.get('PLN'); // todo depends on user location
    this.countCashFlow();
    window.addEventListener('resize', this.onResize);
    this.costs.forEach(this.addEventListenerFocusNextCostInput);
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    formatCashflowData(data) {
      const formatKeys = ['profit', 'income', 'costs'];
      formatKeys.forEach((key) => this.$set(this, key, data[key]));
    },
    async fetchBudgetData(date = new Date()) {
      this.queryState.isLoading = true;
      try {
        const { data, message, isSuccess } = await this.$api('budget', 'fetchBudget', { date });
        console.log('fetchBudgetData data:', data);
        if (data) {
          this.formatCashflowData(data);
        }
        this.queryState = { isLoading: false, message, isSuccess };
      } catch (err) {
        logError(err);
        this.queryState = { isLoading: false, message: err.message, isSuccess: false };
      }
    },
    beforeAdding(tag) {
      const validTag = tag.length < 15;
      if (!validTag) {
        this.showToast({ message: this.$t('error.maxLength', { count: 15 }) });
      }
      return validTag;
    },
    countCashFlow() {
      this.profit = this.income - _.sumBy(this.costs, 'limit');
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
    async sendData() {
      const { profit, income, currencyData: currency, monthAndYear: forDate, costs } = this;
      const action = this.$store.getters['budget/isNewCashflow'] ? 'create' : 'update';
      try {
        const { isSuccess, message = '' } = await this.$api('budget', 'cashflow', {
          profit,
          income,
          currency,
          monthAndYear: forDate,
          costs,
          action,
          cashflowId: this.$store.getters['budget/cashflowId'],
        });
        console.log('sendData res:', { isSuccess, message });
        this.queryState = { isSuccess, message, isLoading: false };
        if (isSuccess) this.$router.push('/');
      } catch (err) {
        this.logError(err);
        this.queryState = { isSuccess: false, message: err.message, isLoading: false };
      }
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

.hero {
  height: 100vh;
  min-height: fit-content;
}

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
    width: 150px;
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
