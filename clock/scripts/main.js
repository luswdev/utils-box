const { createApp } = Vue

createApp({
  data: function () {
    return {
      displayTime: new Date,
      displayTimezone: '',
      displayTimezoneFlag: '',
      displayTimezoneLong: '',
      displayTimezoneShort: '',
      displayYear: 0,
      displayMonth: 0,
      displayDay: 0,
      displayHour: 0,
      displayMinute: 0,
      displaySecond: 0,
      isFull: false,
      timezoneList: Intl.supportedValuesOf('timeZone'),
      timezoneListKeyword: '',
      timezoneFocusTmr: undefined,
      displayTimezoneList: Intl.supportedValuesOf('timeZone'),
    }
  },
  watch: {
    displayTime: function (newVal) {
      this.displayHour = this.leading0(this.getHoursWithTimezone(), 2)
      this.displayMinute = this.leading0(this.displayTime.getMinutes(), 2)
      this.displaySecond = this.leading0(this.displayTime.getSeconds(), 2)
      this.displayYear = this.displayTime.getFullYear()
      this.displayMonth = this.displayTime.toLocaleString('default', { month: 'long' })
      this.displayDay = this.leading0(this.getDayWithTimezone(), 2)
      this.displayTimezoneLong = this.getTimeZoneName(this.displayTime, [], 'long')
      this.displayTimezoneShort = this.getTimeZoneName(this.displayTime, [], 'short')
    },
    displayTimezone: function (newVal) {
      this.displayTimezoneFlag = ct.getTimezone(newVal).countries[0].toLowerCase()
    },
    timezoneListKeyword: function (newVal) {
      if (!newVal) {
        this.displayTimezoneList = this.timezoneList
        return
      }
      this.displayTimezoneList = fuzzysort.go(newVal, this.timezoneList).map((res) => res.target)
    },
  },
  methods: {
    getTimeZoneName: function (date, locales, type) {
      return new Intl.DateTimeFormat([], {
        timeZone: this.displayTimezone,
        timeZoneName: type,
      })
        .formatToParts(date)
        .find(part => part.type == "timeZoneName")
        .value
    },
    getHoursWithTimezone: function () {
      return new Intl.DateTimeFormat([], {
        hour: 'numeric',
        hour12: false,
        timeZone: this.displayTimezone,
      })
        .formatToParts(this.displayTime)
        .find(p => p.type === 'hour')
        .value
    },
    getDayWithTimezone: function () {
      return new Intl.DateTimeFormat([], {
        day: 'numeric',
        timeZone: this.displayTimezone,
      })
        .formatToParts(this.displayTime)
        .find(p => p.type === 'day')
        .value
    },
    leading0: function (num, width) {
      return ('0'.repeat(width - 1) + num).substr(-width)
    },
    toggleFullscreen: function () {
      if (this.isFull) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          this.isFull = false
        }
      } else {
        const elem = document.getElementById('clock-block')
        if (elem.requestFullscreen) {
          elem.requestFullscreen()
          this.isFull = true
        }
      }
    },
    exitHandler: function () {
      if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        this.isFull = false
      }
    },
    changeTimezone: function (tz) {
      this.displayTimezone = tz
      this.closeList()
    },
    getNodeIndex: function (parent, target) {
      return [...parent.children].indexOf(target)
    },
    nextTimezone: function (dir) {
      const timezoneListDropdown = document.getElementById('trueTimezoneList')
      const currentTimezoneItem = document.getElementById('currentTimezoneSelect')
      const currentFocus = document.querySelector('.focus-tz')

      if (!currentFocus) {
        if (!currentTimezoneItem) {
          timezoneListDropdown.scrollTop = 0
          timezoneListDropdown.children[0].classList.add('focus-tz')
        }

        const curIdx = this.getNodeIndex(timezoneListDropdown, currentTimezoneItem)
        timezoneListDropdown.scrollTop = currentTimezoneItem.offsetHeight * curIdx
        currentTimezoneItem.classList.add('focus-tz')
        return
      }

      currentFocus.classList.remove('focus-tz')

      let nextFocus = undefined
      if (dir === 'up') {
        nextFocus = currentFocus.previousSibling
      } else {
        nextFocus = currentFocus.nextSibling
      }

      nextFocus.classList.add('focus-tz')

      const newIdx = this.getNodeIndex(timezoneListDropdown, nextFocus)
      if (nextFocus.offsetHeight * (newIdx + 1) > timezoneListDropdown.scrollTop + timezoneListDropdown.offsetHeight) {
        timezoneListDropdown.scrollTop += nextFocus.offsetHeight
      } else if (nextFocus.offsetHeight * newIdx < timezoneListDropdown.scrollTop) {
        timezoneListDropdown.scrollTop -= nextFocus.offsetHeight
      }
    },
    nextTimezoneTmr: function (dir) {
      if (this.timezoneFocusTmr) {
        return
      }

      this.nextTimezone(dir)
      this.timezoneFocusTmr = setInterval(() => {
        this.nextTimezone(dir)
      }, 150)
    },
    clearNextTimezoneTmr: function () {
      clearInterval(this.timezoneFocusTmr)
      this.timezoneFocusTmr = undefined
    },
    selectTimezone: function () {
      const currentFocus = document.querySelector('.focus-tz')
      this.displayTimezone = currentFocus.children[0].innerHTML
      this.closeList()
    },
    onShowList: function (dir) {
      window.setTimeout(() => {
        document.getElementById('timezoneListKeyword').focus()
        console.log(document.activeElement)
      }, 0);
    },
    closeList: function () {
      document.body.click()
    },
  },
  mounted: function () {
    initNotification()

    const updateVisitorCount = setInterval(() => {
      const visitors = getVisitorFromVercount()
      if (visitors !== '000000-1') {  // busuanzi has loaded the count
        createVisitor()
        clearInterval(updateVisitorCount)
      }
    }, 100)

    setInterval(() => {
      this.displayTime = new Date
    }, 100)

    document.addEventListener('fullscreenchange', this.exitHandler)
    document.addEventListener('webkitfullscreenchange', this.exitHandler)
    document.addEventListener('mozfullscreenchange', this.exitHandler)
    document.addEventListener('MSFullscreenChange', this.exitHandler)

    document.addEventListener('keydown', (e) => {
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        this.toggleFullscreen()
      }
    })

    this.displayTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  }
}).mount('#app')

createApp({
  data: function () {
    return {
      version: 'v1.0.0',
    }
  },
}).mount('#footer')
