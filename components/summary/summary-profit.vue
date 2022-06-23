<template>
  <v-col cols="12" lg="9" class="summary-profit">
    <div class="summary-profit__head">
      <h3>{{ chartLabel }}</h3>
      <period-buttons v-model="period" :only-dropdown="true" />
    </div>
    <div class="summary-profit__content">
      <chart-body
        :key="componentKey"
        ref-name="summaryProfit"
        tooltip-ref-name="summaryProfitTooltip"
        :options="chart"
      />
    </div>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ChartBody from '@/components/common/chart-body'
import PeriodButtons from '@/components/common/period-buttons'
export default {
  name: 'SummaryProfit',

  components: { PeriodButtons, ChartBody },

  data() {
    return {
      componentKey: 0,
    }
  },

  computed: {
    ...mapGetters('summary', ['charts', 'currentChart', 'chartPeriod']),

    chart() {
      return this.charts[this.currentChart]
    },

    chartLabel() {
      return this.chart?.typeLabel
    },

    period: {
      get() {
        return this.chartPeriod
      },
      async set(value) {
        await this.getChart(value)
      },
    },
  },

  mounted() {
    window.addEventListener('resize', this.resize)
  },

  methods: {
    ...mapActions('summary', ['getChart']),

    resize() {
      this.componentKey += 1
    },
  },
}
</script>
