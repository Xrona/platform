<template>
  <v-col cols="12" sm="8" md="12" class="summary-tickers">
    <div class="summary-tickers__head">
      <h3>Показатели</h3>
      <period-buttons />
    </div>
    <div class="summary-tickers__content">
      <div class="tickers-graphic" @click="selectChart('first')">
        <span>{{ firstTitle }}</span>
        <div>
          <chart-body
            :key="componentKey"
            :show-legends="false"
            :options="firstChart"
            tooltip-ref-name="tickerInvestmentsTooltip"
            ref-name="tickerInvestments"
          />
        </div>
        <p>{{ firstAggregatedValue }}</p>
      </div>
      <div class="tickers-graphic" @click="selectChart('second')">
        <span>{{ secondTitle }}</span>
        <div>
          <chart-body
            :key="componentKey"
            :show-legends="false"
            :options="secondChart"
            tooltip-ref-name="tickerIncomeTooltip"
            ref-name="tickerIncome"
          />
        </div>
        <p>{{ secondAggregatedValue }}</p>
      </div>
      <div class="tickers-graphic" @click="selectChart('third')">
        <span>{{ thirdTitle }}, %</span>
        <div>
          <chart-body
            :key="componentKey"
            :show-legends="false"
            :options="thirdChart"
            ref-name="tickerProfitability"
            tooltip-ref-name="tickerProfitabilityTooltip"
          />
        </div>
        <p>{{ thirdAggregatedValue }}</p>
      </div>
    </div>
  </v-col>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ChartBody from '@/components/common/chart-body'
import PeriodButtons from '@/components/common/period-buttons'
export default {
  name: 'SummaryTickers',

  components: { PeriodButtons, ChartBody },

  data() {
    return {
      componentKey: 0,
    }
  },

  computed: {
    ...mapGetters('summary', ['charts']),

    firstChart() {
      return this.charts.first
    },

    secondChart() {
      return this.charts.second
    },

    thirdChart() {
      return this.charts.third
    },

    firstTitle() {
      return this.charts?.first?.typeLabel ?? '_'
    },
    secondTitle() {
      return this.charts?.second?.typeLabel ?? '_'
    },
    thirdTitle() {
      return this.charts?.third?.typeLabel ?? '_'
    },

    firstAggregatedValue() {
      return this.charts?.first?.aggregatedValue ?? '_'
    },
    secondAggregatedValue() {
      return this.charts?.second?.aggregatedValue ?? '_'
    },
    thirdAggregatedValue() {
      return this.charts?.third?.aggregatedValue ?? '_'
    },
  },

  mounted() {
    window.addEventListener('resize', this.resize)
  },

  methods: {
    ...mapMutations('summary', ['setCurrentChart']),

    resize() {
      this.componentKey += 1
    },

    selectChart(value) {
      this.setCurrentChart(value)
    },
  },
}
</script>
