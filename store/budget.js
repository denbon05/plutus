export const state = () => ({
  cashflowId: localStorage.getItem('cashflowId'),
});

export const getters = {
  isNewCashflow({ cashflowId }) {
    return !cashflowId;
  },
  cashflowId({ cashflowId }) {
    return cashflowId;
  },
};

export const mutations = {
  setCashflowId(state, { cashflowId }) {
    state.cashflowId = cashflowId;
    localStorage.setItem('cashflowId', JSON.stringify(cashflowId));
  },
};
