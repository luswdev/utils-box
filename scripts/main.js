const { createApp } = Vue

createApp({
  data: function () {
    return {
      links: LINKS,
    }
  },
}).mount('#app')
