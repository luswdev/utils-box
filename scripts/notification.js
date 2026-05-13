const NOTIFICATIONS_CONTAINER_ID = "notifications-container"

function initNotification () {
  if (!document.getElementById(NOTIFICATIONS_CONTAINER_ID)) {
    const container = document.createElement("div")
    container.id = NOTIFICATIONS_CONTAINER_ID
    container.className = "absolute top-20 sm:right-10 right-0 w-full sm:w-auto flex flex-col gap-4 z-50"
    document.body.appendChild(container)
  }
}

function pushNotification (message, type = "success") {
  const FADE_OUT_DURATION = 300

  const notification = document.createElement("div")
  notification.className = `relative rounded-xl border border-white/10 bg-zinc-900 p-4 sm:w-80 w-[90%] mx-auto sm:mx-0 shadow-[0_0_20px] shadow-zinc-700/50 animate-[tilt-shaking_0.15s] transition-opacity duration-${FADE_OUT_DURATION} ease-out`

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
      notification.classList += " opacity-0"
      setTimeout(() => {
        notification.remove()
      }, 300)
    clearInterval(progressInterval)
  })

  notificationContent.appendChild(messageSpan)
  notificationContent.appendChild(closeIcon)
  notification.appendChild(notificationContent)

  const progressBar = document.createElement("div")
  progressBar.className = "absolute bottom-0 left-0 h-1 bg-rose-300/50 w-full animate-progress"
  notification.appendChild(progressBar)

  const container = document.getElementById(NOTIFICATIONS_CONTAINER_ID)

  const notificationAliveTime = 3000
  container.appendChild(notification)

  let currentProg = 0
  const step = 10
  const progressInterval = setInterval(() => {
    currentProg += step
    progressBar.style.width = (parseFloat(1 - (currentProg / notificationAliveTime)) * 100) + "%"

    if (currentProg >= notificationAliveTime) {
      notification.classList += " opacity-0"
      setTimeout(() => {
        notification.remove()
      }, 300)
      clearInterval(progressInterval)
    }
  }, step)
}
