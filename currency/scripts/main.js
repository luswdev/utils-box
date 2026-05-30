const { createApp } = Vue

createApp({
  data: function () {
    return {
      isPWA: IS_PWA,
      currencies: CURRENCIES_LIST,
      displayCurrenciesLists: [
        CURRENCIES_LIST,
        CURRENCIES_LIST,
        CURRENCIES_LIST,
        CURRENCIES_LIST,
        CURRENCIES_LIST,
        CURRENCIES_LIST,
        CURRENCIES_LIST,
        CURRENCIES_LIST,
        CURRENCIES_LIST,
        CURRENCIES_LIST,
      ],
      selectedCurrencies: [
        { key: 'TWD', val: '1000' },
        { key: 'JPY', val: '0' },
        { key: 'KRW', val: '0' },
        { key: 'USD', val: '0' },
        { key: 'EUR', val: '0' },
        { key: 'GBP', val: '0' },
        { key: 'THB', val: '0' },
        { key: 'VND', val: '0' },
        { key: 'HKD', val: '0' },
        { key: 'CNY', val: '0' },
      ],
      showCnt: 5,
      currentOpenIdx: 0,
      currencyKeyword: '',
      currenciesTable: undefined,
      pwaCalculatorBtn: [
        { key: 'C', 'icon': '' },
        { key: 'B', 'icon': 'fa-solid fa-delete-left' },
        { key: 'P', 'icon': 'fa-solid fa-percent' },
        { key: '/', 'icon': 'fa-solid fa-divide' },
        { key: '7', 'icon': '' },
        { key: '8', 'icon': '' },
        { key: '9', 'icon': '' },
        { key: '*', 'icon': 'fa-solid fa-xmark' },
        { key: '4', 'icon': '' },
        { key: '5', 'icon': '' },
        { key: '6', 'icon': '' },
        { key: '-', 'icon': 'fa-solid fa-minus' },
        { key: '1', 'icon': '' },
        { key: '2', 'icon': '' },
        { key: '3', 'icon': '' },
        { key: '+', 'icon': 'fa-solid fa-plus' },
        { key: '0', 'icon': '' },
        { key: '.', 'icon': '' },
        { key: 'E', 'icon': 'fa-solid fa-equals' }
      ],
      pwaCurFocus: 0,
    }
  },
  watch: {
    currencyKeyword: function (newVal) {
      if (!newVal) {
        this.displayCurrenciesLists[this.currentOpenIdx] = this.currencies
        return
      }
      const byLabel = fuzzysort.go(newVal, this.currencies, { key: 'name' }).map((res) => res.obj)
      const byKey = fuzzysort.go(newVal, this.currencies, { key: 'key' }).map((res) => res.obj)

      this.displayCurrenciesLists[this.currentOpenIdx] = [...new Set(byLabel.concat(byKey))]
    },
  },
  computed: {
    lastUpdated: function () {
      if (!this.currenciesTable) {
        return ''
      }

      const updateTime = new Date(this.currenciesTable.timestamp * 1000)
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false }
      return updateTime.toLocaleDateString("en-US", options)
    }
  },
  methods: {
    getCurrencyByKey: function (key) {
      return this.currencies.find((currency) => currency.key === key)
    },
    getCurrencyByFlag: function (flag) {
      return this.currencies.find((currency) => currency.flag === flag)
    },
    getCurrencyByLabel: function (label) {
      return this.currencies.find((currency) => currency.name === label)
    },
    getNodeIndex: function (parent, target) {
      return [...parent.children].indexOf(target)
    },
    evalVal: function (str) {
      try {
        return eval(str.replace(/[^\*\\(\)/\.0-9+-]*/g, ''))
      } catch {
        return 1000
      }
    },
    updateSelectCurrencies: function (triggered) {
      const triggeredItem = this.selectedCurrencies.find((elem) => elem.key === triggered)
      const triggered2Base = this.currenciesTable.rates[triggeredItem.key]
      const triggeredVal = this.evalVal(triggeredItem.val)

      this.selectedCurrencies[this.selectedCurrencies.indexOf(triggeredItem)].val = triggeredVal

      this.selectedCurrencies.forEach((elem) => {
        if (elem.key !== triggered) {
          const this2Base = this.currenciesTable.rates[elem.key]
          const rate = this2Base * (1 / triggered2Base)
          elem.val = Math.floor(triggeredVal * rate * 1000) / 1000
        }

        elem.val = elem.val.toLocaleString('en')
      })
    },
    isSelected: function (key) {
      return this.selectedCurrencies.slice(0, this.showCnt).some((elem) => elem.key === key)
    },
    changeCurrency: function (currency, idx) {
      if (this.isSelected(currency.key)) {
        return
      }

      this.selectedCurrencies[idx].key = currency.key
      this.updateSelectCurrencies(this.selectedCurrencies[0].key)
      this.closeList()

      Cookies.set('selectCurrency', this.selectedCurrencies.map((res) => res.key))
    },
    sortShowList: function (list) {
      list.sort((a, b) => a.key.localeCompare(b.key))

      let selectedList = []
      this.selectedCurrencies.slice(0, this.showCnt).forEach((selected) => {
        selectedList.push(list.find((elem) => elem.key === selected.key))
      })

      return [...new Set(selectedList.concat(list))]
    },
    onShowList: function (idx) {
      this.currencyKeyword = ''
      this.displayCurrenciesLists[idx] = this.sortShowList(this.displayCurrenciesLists[idx])

      window.setTimeout(() => {
        this.currentOpenIdx = idx
        document.getElementById(`currencyKeyword-${idx}`).focus()

        // scroll to current
        const currenciesListDropdown = document.getElementById(`true-currencies-list-${idx}`)
        const currentCurrencyItem = document.getElementById(`selected-currency-${idx}`)
        const curIdx = this.getNodeIndex(currenciesListDropdown, currentCurrencyItem)
        currenciesListDropdown.scrollTop = currentCurrencyItem.offsetHeight * curIdx
      }, 0)
    },
    closeList: function () {
      document.body.click()
    },
    addRow: function () {
      ++this.showCnt
      if (this.showCnt > this.selectedCurrencies.length) {
        this.showCnt = this.selectedCurrencies.length
      }
      window.setTimeout(() => {
        initFlowbite()
      }, 0)
    },
    reduceRow: function () {
      --this.showCnt
      if (this.showCnt < 3) {
        this.showCnt = 3
      }
      window.setTimeout(() => {
        initFlowbite()
      }, 0)
    },
    setFocusPWA: function (idx) {
      [...document.getElementsByClassName('currency-val')].forEach((elem) => {
        elem.classList.remove('pwa-focus')
      })

      document.getElementById(`select-currency-val-${idx}`).classList.add('pwa-focus')

      this.pwaCurFocus = idx
    },
    calculatorClick: function (key) {
      let needUpdate = false
      switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '+':
        case '-':
        case '*':
        case '/':
        case '.':
        case '.':
          this.selectedCurrencies[this.pwaCurFocus].val += key
          break
        case 'C':
          this.selectedCurrencies[this.pwaCurFocus].val = '1000'
          needUpdate = true
          break
        case 'B':
          this.selectedCurrencies[this.pwaCurFocus].val = this.selectedCurrencies[this.pwaCurFocus].val.slice(0, -1)
          needUpdate = true
          break
        case 'P':
          this.selectedCurrencies[this.pwaCurFocus].val = (this.evalVal(this.selectedCurrencies[this.pwaCurFocus].val) / 10).toString()
          needUpdate = true
          break
        case 'E':
          needUpdate = true
          break
      }

      if (needUpdate) {
        this.updateSelectCurrencies(this.selectedCurrencies[this.pwaCurFocus].key)
      }
    },
  },
  created: function () {
    const selected = Cookies.get('selectCurrency')
    if (selected) {
      this.selectedCurrencies = selected.split(',').map((item) => ({ key: item, val: '0' }))
      this.selectedCurrencies[0].val = '1000'
    }

    axios.get('/assets/data/currencies-latest.json').then((res) => {
      this.currenciesTable = res.data
      this.updateSelectCurrencies(this.selectedCurrencies[0].key)
    })
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

    document.addEventListener('keydown', (e) => {
      const target = event.target;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault()
        this.addRow()
      } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        this.reduceRow()
      }
    })

    this.setFocusPWA(0)
  },
}).mount('#app')

createApp({
  data: function () {
    return {
      isPWA: IS_PWA,
    }
  },
}).mount('#header')

createApp({
  data: function () {
    return {
      isPWA: IS_PWA,
      version: 'v1.0.0',
    }
  },
}).mount('#footer')
