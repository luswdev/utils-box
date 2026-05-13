const { createApp } = Vue

const vueapp = createApp({
  data: function () {
    return {
      links: LINKS,
      newIndicatorDuration: 7, // days
    }
  },
  methods: {
    checkLink: function (url) {
      if (!url) {
        pushNotification("This feature is coming soon!", "error")
      }
    },
    isNew: function (update) {
      if (!update) return false
      const today = new Date()
      const updateDate = new Date(update)
      const diffTime = Math.abs(today - updateDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= this.newIndicatorDuration
    }
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
  }
}).mount('#app')

createApp({
  data: function () {
    return {
      version: 'v1.0.1',
    }
  },
}).mount('#footer')
