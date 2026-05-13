const { createApp } = Vue

createApp({
  data: function () {
    return {
      asciiString: '',
      asciiCode: '',
      isHex: true,
      asciiTable: ASCII_TABLE,
    }
  },
  methods: {
    convertToASCII: function () {
      if (this.isHex) {
        this.asciiCode = this.asciiString.split('').map(char => char.charCodeAt(0).toString(16).toUpperCase()).join(' ')
      } else {
        this.asciiCode = this.asciiString.split('').map(char => char.charCodeAt(0)).join(' ')
      }
    },
    convertToString: function () {
      let separator = ' '
      if (this.asciiCode.indexOf(',') !== -1) {
        separator = ','
      }

      if (this.isHex) {
        this.asciiString = this.asciiCode.split(separator).map(code => String.fromCharCode(parseInt(code, 16))).join('')
      } else {
        this.asciiString = this.asciiCode.split(separator).map(code => String.fromCharCode(code)).join('')
      }
    },
    isHexChange: function (isHex) {
      if (this.isHex === isHex) return
      this.isHex = isHex

      if (this.asciiString) {
        if (this.isHex) {
          this.asciiCode = this.asciiCode.split(' ').map(code => parseInt(code).toString(16).toUpperCase()).join(' ')
        } else {
          this.asciiCode = this.asciiCode.split(' ').map(code => parseInt(code, 16)).join(' ')
        }
      }
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
