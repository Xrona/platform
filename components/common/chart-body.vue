<template>
  <div class="chart-body">
    <canvas
      :ref="refName"
      class="chart-body"
      @mousemove="mousemove"
      @mouseleave="mouseleave"
    ></canvas>
    <div :ref="tooltipRefName" class="chart-body__tooltip">
      <span class="tooltip-date">{{ tooltipDate }}</span>
      <span class="tooltip-value">{{ tooltipValue }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartBody',

  props: {
    showLegends: {
      type: Boolean,
      default: true,
    },
    refName: {
      type: String,
      required: true,
    },
    tooltipRefName: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: 349,
    },
    paddingTopProperty: {
      type: Number,
      default: 51,
    },
    paddingBottomProperty: {
      type: Number,
      default: 71,
    },
    paddingLeftProperty: {
      type: Number,
      default: 125,
    },
    paddingRightProperty: {
      type: Number,
      default: 45,
    },
    options: {
      type: Object,
      default: Object,
    },
  },

  data() {
    return {
      tooltipDate: '',
      tooltipValue: '',
      mouse: null,
      raf: null,
      ctx: null,
      windowWidth: 0,
    }
  },

  computed: {
    dpiWidth() {
      const canvasWidth =
        this.$refs[this.refName]?.getBoundingClientRect().width ?? 0

      return canvasWidth * 2
    },
    dpiHeight() {
      const canvasHeight =
        this.$refs[this.refName]?.getBoundingClientRect().height ?? 0

      return canvasHeight * 2
    },
    viewHeight() {
      return this.dpiHeight - this.paddingTop - this.paddingBottom
    },
    viewWidth() {
      return this.dpiWidth - this.paddingLeft - this.paddingRight
    },
    rowsCount() {
      if (this.options.pointsCount) {
        return this.options.pointsCount - 1
      }

      return 0
    },
    paddingTop() {
      if (this.windowWidth <= 768) {
        return 20
      }

      return this.paddingTopProperty
    },
    paddingBottom() {
      if (this.windowWidth <= 768) {
        return 20
      }

      return this.paddingBottomProperty
    },
    paddingLeft() {
      if (this.windowWidth <= 768) {
        return 20
      }

      return this.paddingLeftProperty
    },
    paddingRight() {
      if (this.windowWidth <= 768) {
        return 20
      }

      return this.paddingRightProperty
    },
  },

  watch: {
    mouse(value) {
      this.raf = requestAnimationFrame(this.paint)
    },

    windowWidth(value) {
      this.paint()
    },
  },

  mounted() {
    const canvas = this.$refs[this.refName]
    canvas.style.width = this.width + 'px'
    canvas.style.height = this.height + 'px'
    canvas.width = this.dpiWidth
    canvas.height = this.dpiHeight
    this.ctx = canvas.getContext('2d')
    this.paint()
    this.getWidth()
    window.addEventListener('resize', this.getWidth)
  },

  beforeDestroy() {
    cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.getWidth)
  },

  methods: {
    getWidth() {
      this.windowWidth = window.screen.width
      // this.paint()
    },

    clear() {
      this.ctx.clearRect(0, 0, this.dpiWidth, this.dpiHeight)
    },

    paint() {
      if (this.options === null || Object.keys(this.options).length < 1) {
        return
      }

      this.clear()
      const data = this.options
      const yMax = data.maxValue
      const yMin = data.minValue > 0 ? 0 : data.minValue
      const yRatio = this.viewHeight / (yMax - yMin)
      const xRatio = this.viewWidth / (data.values.length - 1)

      if (this.windowWidth > 768 && this.showLegends) {
        this.yAxis(this.ctx, yMin, yMax)
        this.xAxis(this.ctx, data.values, xRatio)
      }

      const coords = data.values.map((item, i) => {
        let y

        if (yMin < 0) {
          y = (item.y + Math.abs(yMin)) * yRatio
        } else {
          y = item.y * yRatio
        }

        return {
          x: Math.round(i * xRatio + this.paddingLeft),
          y: Math.round(this.dpiHeight - this.paddingBottom - y),
        }
      })

      this.line(this.ctx, coords, yMin, yMax)

      if (this.showLegends) {
        for (let i = 0; i < coords.length; i++) {
          const x = coords[i].x
          const y = coords[i].y

          if (this.isOver(x, coords.length)) {
            this.tooltipShow(data.values[i])
            this.verticalLine(x)
            this.circle(x, y)
            break
          }
        }
      }
    },

    circle(x, y, color) {
      this.ctx.beginPath()
      this.ctx.fillStyle = '#00b1b9'
      this.ctx.arc(x, y, 10, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.lineWidth = 2
      this.ctx.strokeStyle = 'white'
      this.ctx.stroke()
      this.ctx.closePath()
    },

    verticalLine(x) {
      this.ctx.beginPath()
      this.ctx.strokeStyle = '#9eafbc'
      this.ctx.moveTo(x, this.paddingTop)
      this.ctx.lineTo(x, this.dpiHeight - this.paddingBottom)
      this.ctx.stroke()
      this.ctx.closePath()
    },

    tooltipShow(data) {
      this.tooltipDate = this.toDate(data.x)
      this.tooltipValue = data.y
      const tooltip = this.$refs[this.tooltipRefName]
      const { height, width } = tooltip.getBoundingClientRect()
      const { left, top } = this.mouse.tooltip

      let tooltipLeft = left
      if (tooltipLeft > this.dpiWidth / 2 - 150) {
        tooltipLeft -= width * 2
      } else {
        tooltipLeft += width
      }

      this.$refs[this.tooltipRefName].style.top = `${top - height}px`
      this.$refs[this.tooltipRefName].style.left = `${tooltipLeft}px`
      this.$refs[this.tooltipRefName].style.display = 'block'
    },

    tooltipHide(data) {
      this.tooltipDate = ''
      this.tooltipValue = ''
      if (this.$refs[this.tooltipRefName]) {
        this.$refs[this.tooltipRefName].style.display = 'none'
      }
    },

    mousemove({ clientX, clientY }) {
      const { left, top } = this.$refs[this.refName].getBoundingClientRect()
      this.mouse = {
        x: (clientX - left) * 2,
        y: clientY,
        tooltip: {
          left: clientX - left,
          top: clientY - top,
        },
      }
    },

    mouseleave() {
      this.mouse = null
      this.tooltipHide()
    },

    line(ctx, coords) {
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = '#00b1b9'

      let xLast = 0
      let yLast = 0

      for (let i = 0; i < coords.length; i++) {
        const currentItem = coords[i]

        if (i === 0) {
          ctx.moveTo(currentItem.x, currentItem.y)
        } else {
          ctx.bezierCurveTo(
            xLast + this.dpiHeight / 15,
            yLast,
            currentItem.x - this.dpiHeight / 15,
            currentItem.y,
            currentItem.x,
            currentItem.y
          )
        }

        xLast = currentItem.x
        yLast = currentItem.y
      }

      ctx.stroke()
      ctx.closePath()
    },

    yAxis(ctx, yMin, yMax) {
      const step = this.viewHeight / this.rowsCount
      const textStep = (yMax - yMin) / this.rowsCount

      ctx.beginPath()
      ctx.font = 'normal 20px Montserrat'
      ctx.fillStyle = '#73819C'
      for (let i = 0; i <= this.rowsCount; i++) {
        const y = step * i
        const text = Math.round(yMax - textStep * i)
        ctx.fillText(text.toString(), 0, y + this.paddingTop - 10)
        // ctx.moveTo(0, y + this.paddingTop)
        // ctx.lineTo(this.dpiWidth, y + this.paddingTop)
      }
      ctx.stroke()
      ctx.closePath()
    },

    xAxis(ctx, data, xRatio) {
      const colsCount = 12
      const step = Math.round(data.length / colsCount)

      ctx.beginPath()
      ctx.strokeStyle = '#9eafbc'
      for (let i = 0; i < data.length; i++) {
        const x = i * xRatio + this.paddingLeft / 2

        if (i % step === 0) {
          const text = this.toDate(data[i].x)
          ctx.fillText(text.toString(), x, this.dpiHeight - 10)
        }
      }
      ctx.stroke()
      ctx.closePath()
    },

    toDate(timestamp) {
      const shortMonths = [
        'Янв,',
        'Фев,',
        'Мар,',
        'Апр,',
        'Май,',
        'Июн,',
        'Июл,',
        'Авг,',
        'Сен,',
        'Окт,',
        'Ноя,',
        'Дек,',
      ]
      const date = this.$moment.unix(timestamp).toDate()

      return `${shortMonths[date.getMonth()]} ${date.getFullYear()}`
    },

    isOver(x, length) {
      if (!this.mouse) {
        return false
      }

      const width = this.viewWidth / length

      return Math.abs(x - this.mouse.x) < width / 2
    },
  },
}
</script>
