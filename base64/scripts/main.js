const { createApp } = Vue

createApp({
  data: function () {
    return {
      base64String: '',
      normalString: '',
      fileSelected: '',
      fileTemp: undefined,
    }
  },
  methods: {
    convertToBase64: function () {
      const bytes = this.fileTemp ?? new TextEncoder().encode(this.normalString)
      const binString = Array.from(bytes, (byte) =>
        String.fromCodePoint(byte),
      ).join('')
      this.base64String = btoa(binString)
    },
    convertToString: function () {
      const binString = atob(this.base64String)
      const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
      this.normalString = new TextDecoder().decode(bytes);
    },
    fileChanged: function (event) {
      const file = event.target.files[0]
      if (file) {
        this.fileSelected = file.name
        const reader = new FileReader()
        reader.onload = (e) => {
          this.fileTemp = new Uint8Array(e.target.result)
        }
        reader.readAsArrayBuffer(file)
      } else {
        this.fileSelected = ''
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
