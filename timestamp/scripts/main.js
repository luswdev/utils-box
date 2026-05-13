const { createApp } = Vue

createApp({
  data: function () {
    return {
      inputTimestamp: `${Date.now()}`,
      inputDatetime: undefined,
      inputDatetimeTemp: undefined,
      inputDatetimeModel: {
        year: undefined,
        month: undefined,
        day: undefined,
        hour: undefined,
        minute: undefined,
        second: undefined,
      },
      showFullString: false,
    }
  },
  methods: {
    directInputDatetime: function () {
      this.inputDatetime = new Date(this.inputDatetimeTemp)
      this.showFullString = false
    },
    convert2Datetime: function () {
      this.inputDatetime = new Date(parseInt(this.inputTimestamp))
    },
    convert2Timestamp: function () {
      this.inputDatetime = this.inputDatetimeTemp
      this.inputTimestamp = `${this.inputDatetime.getTime()}`
    },
    copy2clipboard: function (text) {
      navigator.clipboard.writeText(text).then(() => {
        pushNotification("Copied to clipboard!")
      }).catch(err => {
        pushNotification("Failed to copy!", "error")
      })
    },
  },
  created: function () {
    this.inputDatetime = new Date(parseInt(this.inputTimestamp))

    this.inputDatetimeModel.year = this.inputDatetime.getUTCFullYear()
    this.inputDatetimeModel.month = this.inputDatetime.getUTCMonth() + 1
    this.inputDatetimeModel.day = this.inputDatetime.getUTCDate()
    this.inputDatetimeModel.hour = this.inputDatetime.getUTCHours()
    this.inputDatetimeModel.minute = this.inputDatetime.getUTCMinutes()
    this.inputDatetimeModel.second = this.inputDatetime.getUTCSeconds()
  },
  mounted: function () {
    initNotification()

    const updateVisitorCount = setInterval(() => {
      const visitors = getVisitorFromBusuanzi()
      if (visitors !== '000000-1') {  // busuanzi has loaded the count
        createVisitor()
        clearInterval(updateVisitorCount)
      }
    }, 100)
  },
  watch: {
    inputDatetime: function (newVal) {
      this.inputDatetimeTemp = newVal
    },
    inputDatetimeModel: {
      handler: function (newVal) {
        console.log(newVal)
        this.inputDatetimeTemp = new Date(
          newVal.year,
          newVal.month - 1,
          newVal.day,
          newVal.hour,
          newVal.minute,
          newVal.second
        )
      },
      deep: true,
    }
  }
}).mount('#app')

createApp({
  data: function () {
    return {
      version: 'v1.0.0',
    }
  },
}).mount('#footer')
