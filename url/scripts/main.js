const { createApp } = Vue

createApp({
  data: function () {
    return {
      urlString: '',
      normalString: '',
      fileSelected: '',
      fileTemp: undefined,
    }
  },
  methods: {
    convertToURL: function () {
      this.urlString = encodeURIComponent(this.normalString)
    },
    convertToString: function () {
      this.normalString = decodeURIComponent(this.urlString)
    },
    copy2clipboard: function (text) {
      navigator.clipboard.writeText(text).then(() => {
        pushNotification('Copied to clipboard!')
      }).catch(err => {
        pushNotification('Failed to copy!', 'error')
      })
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
  }
}).mount('#app')

createApp({
  data: function () {
    return {
      version: 'v1.0.0',
    }
  },
}).mount('#footer')
