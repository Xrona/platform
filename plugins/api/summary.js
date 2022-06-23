export default (instance) => {
  return {
    dashboard(chartPeriod) {
      return instance.post('/statistics/dashboard', {
        charts_period: chartPeriod,
      })
    },

    getChart(payload) {
      return instance.post('/statistics/charts', payload)
    },
  }
}
