import UserRoleEnum from '@/enums/user-role'
import ChartTypeEnum from '@/enums/chart-type'

const defaultChart = {
  aggregatedValue: '_',
  combineType: '_',
  endDate: '_',
  maxValue: '_',
  minValue: '_',
  period: '_',
  pointsCount: '_',
  realType: '_',
  roleType: '_',
  startDate: '_',
  type: '_',
  typeLabel: '_',
  values: [],
}

function chartHandler(chart) {
  return {
    aggregatedValue: chart?.aggregated_value ?? '_',
    combineType: chart?.combine_type ?? '_',
    endDate: chart?.end_date ?? '_',
    maxValue: chart?.max_value ?? '_',
    minValue: chart?.min_value ?? '_',
    period: chart?.period ?? '_',
    pointsCount: chart?.points_count ?? '_',
    realType: chart?.real_type ?? '_',
    roleType: chart?.role_type ?? '_',
    startDate: chart?.start_date ?? '_',
    type: chart?.type ?? '_',
    typeLabel: chart?.type_label ?? '_',
    values: chart?.values ?? [],
  }
}

export default {
  state() {
    return {
      totalBalanceSum: 0,
      freeBalanceSum: 0,
      reservedBalanceSum: 0,
      dealsInProgress: 0,
      successfulDeals: 0,
      failedDeals: 0,
      charts: {},
      currentChart: 'first',
      chartsPeriod: 'all-time',
    }
  },

  getters: {
    charts(state) {
      return state.charts ?? []
    },

    currentChart(state) {
      return state.currentChart
    },

    chartPeriod(state) {
      return state.chartsPeriod
    },

    balance(state) {
      return {
        sum: state.freeBalanceSum,
        sumReserved: state.reservedBalanceSum,
      }
    },

    deals(state) {
      return {
        dealsInProgress: state.dealsInProgress,
        successfulDeals: state.successfulDeals,
        failedDeals: state.failedDeals,
      }
    },
  },

  mutations: {
    setSummary(state, payload) {
      state.period = payload?.period ?? ''
      state.totalBalanceSum = payload?.total_balance_sum ?? 0
      state.freeBalanceSum = payload?.free_balance_sum ?? 0
      state.reservedBalanceSum = payload?.reserved_balance_sum ?? 0
      state.dealsInProgress = payload?.deals_in_progress ?? 0
      state.successfulDeals = payload?.successful_deals ?? 0
      state.failedDeals = payload?.failed_deals ?? 0

      const role = this.$auth?.user?.role?.id ?? UserRoleEnum.GUEST
      const charts = {
        first: defaultChart,
        second: defaultChart,
        third: defaultChart,
      }

      if (role === UserRoleEnum.BORROWER) {
        payload.charts.forEach((chart) => {
          if (chart.type === ChartTypeEnum.RAISED_FUNDS) {
            charts.first = chartHandler(chart)
          }
          if (chart.type === ChartTypeEnum.COMMITMENTS) {
            charts.second = chartHandler(chart)
          }
          if (chart.type === ChartTypeEnum.PAYMENTS) {
            charts.third = chartHandler(chart)
          }
        })
      }

      if (role === UserRoleEnum.INVESTOR) {
        payload.charts.forEach((chart) => {
          if (chart.type === ChartTypeEnum.INVESTMENTS) {
            charts.first = chartHandler(chart)
          }
          if (chart.type === ChartTypeEnum.INCOME) {
            charts.second = chartHandler(chart)
          }
          if (chart.type === ChartTypeEnum.PROFITABILITY) {
            charts.third = chartHandler(chart)
          }
        })
      }

      state.charts = charts
    },

    setChart(state, payload) {
      state.charts[state.currentChart] = chartHandler(payload)
    },

    setCurrentChart(state, payload) {
      state.currentChart = payload
    },

    setPeriod(state, payload) {
      state.chartsPeriod = payload
    },
  },

  actions: {
    async getSummary({ commit, state }) {
      let response = {}

      await this.$load(
        async () =>
          (response = (
            await this.$api.summary.dashboard(state.chartsPeriod)
          ).data.data),
        (error) => console.log(error.response)
      )

      commit('setSummary', response)
    },

    async getChart({ commit, state }, period) {
      commit('setPeriod', period)

      let response = {}
      const payload = {
        charts: [
          {
            period: state.chartsPeriod,
            type: state.charts[state.currentChart].type,
          },
        ],
      }

      await this.$load(
        async () =>
          (response = (await this.$api.summary.getChart(payload)).data.data),
        (error) => console.log(error.response)
      )

      if (response?.[0] !== null) {
        commit('setChart', response[0])
      }
    },

    async filterCharts({ commit, state }) {},
  },
}
