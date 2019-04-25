window.addEventListener('DOMContentLoaded', () => {
  const width = window.innerWidth
  const html = document.querySelector('html')
  const fontSize = width / 10
  html.style.fontSize = fontSize > 50 ? 50 : fontSize + 'px'
})