function getVisitorFromBusuanzi () {
  const busuanzi = document.getElementById('busuanzi_value_page_pv')
  let count = '0'
  if (busuanzi) {
    count = busuanzi.innerText || '0'
  }

  return ('0000000' + count).substr(-8)
}

function createVisitor () {
  const cnt = getVisitorFromBusuanzi()
  const visitor = document.getElementById('visitor-container')
  visitor.innerHTML = ''
  visitor.style = ''
  for (let i = 0; i < 8; i++) {
    const digit = document.createElement('span')
    digit.className = 'bg-zinc-200/5 p-1 font-mono'
    digit.innerText = cnt[i]
    visitor.appendChild(digit)
  }

  const busuanzi = document.getElementById('busuanzi_container_site_pv')
  busuanzi.style = ''
  return visitor
}
