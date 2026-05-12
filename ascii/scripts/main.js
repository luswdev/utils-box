const { createApp } = Vue

createApp({
  data: function () {
    return {
      asciiString: "",
      asciiCode: "",
      isHex: true,
    }
  },
  methods: {
    convertToASCII: function () {
      if (this.isHex) {
        this.asciiCode = this.asciiString.split("").map(char => char.charCodeAt(0).toString(16).toUpperCase()).join(" ")
      } else {
        this.asciiCode = this.asciiString.split("").map(char => char.charCodeAt(0)).join(" ")
      }
    },
    convertToString: function () {
      let separator = " "
      if (this.asciiCode.indexOf(",") !== -1) {
        separator = ","
      }

      if (this.isHex) {
        this.asciiString = this.asciiCode.split(separator).map(code => String.fromCharCode(parseInt(code, 16))).join("")
      } else {
        this.asciiString = this.asciiCode.split(separator).map(code => String.fromCharCode(code)).join("")
      }
    },
    isHexChange: function () {
      if (this.asciiString) {
        if (this.isHex) {
          this.asciiCode = this.asciiCode.split(" ").map(code => parseInt(code).toString(16).toUpperCase()).join(" ")
        } else {
          this.asciiCode = this.asciiCode.split(" ").map(code => parseInt(code, 16)).join(" ")
        }
      }
    },
    copy2clipboard: function (text) {
      navigator.clipboard.writeText(text).then(() => {
        this.pushNotification("Copied to clipboard!")
      }).catch(err => {
        this.pushNotification("Failed to copy!", "error")
      })
    },
    pushNotification: function (message, type = "success") {
      const notification = document.createElement("div")
      notification.className = `relative rounded-md bg-neutral-800 border border-neutral-700 p-4 sm:w-80 w-[90%] mx-auto sm:mx-0 shadow-md shadow-neutral-700/50`

      const notificationContent = document.createElement("div")
      notificationContent.className = "flex justify-between text-sm"

      const messageSpan = document.createElement("span")

      const icon = document.createElement("i")
      icon.className = "fa-solid fa-circle-info me-2"
      if (type === "success") {
        icon.className = "fa-solid fa-circle-check text-green-500 me-2"
      } else if (type === "error") {
        icon.className = "fa-solid fa-circle-exclamation text-red-500 me-2"
      }
      messageSpan.appendChild(icon)
      messageSpan.appendChild(document.createTextNode(message))

      const closeIcon = document.createElement("i")
      closeIcon.className = "fa-solid fa-x text-neutral-500 hover:text-rose-300 cursor-pointer"
      closeIcon.addEventListener("click", () => {
        notification.remove()
        clearInterval(progressInterval)
      })

      notificationContent.appendChild(messageSpan)
      notificationContent.appendChild(closeIcon)
      notification.appendChild(notificationContent)

      const progressBar = document.createElement("div")
      progressBar.className = "absolute bottom-0 left-0 h-1 bg-rose-300 w-full animate-progress"
      notification.appendChild(progressBar)

      const container = document.getElementById("notifications-container")

      const notificationAliveTime = 3000
      container.appendChild(notification)

      let currentProg = 0
      const step = 10
      const progressInterval = setInterval(() => {
        currentProg += step
        progressBar.style.width = (parseFloat(1 - (currentProg / notificationAliveTime)) * 100) + "%"

        if (currentProg >= notificationAliveTime) {
          notification.remove()
          clearInterval(progressInterval)
        }
      }, step)
    },
  },
}).mount('#app')
