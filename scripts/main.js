const { createApp } = Vue

createApp({
  data: function () {
    return {
      links: LINKS,
      newIndicatorDuration: 7, // days
    }
  },
  methods: {
    gotoLink: function (url) {
      if (!url) {
        pushNotification("This feature is coming soon!", "error")
        return
      }
      window.location.href = url
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
  }
}).mount('#app')
