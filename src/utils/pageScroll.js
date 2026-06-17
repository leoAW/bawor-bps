export function setDocumentScroll(mode) {
  const value = mode === 'locked' ? 'hidden' : 'auto'
  document.documentElement.style.overflow = value
  document.body.style.overflow = value
  document.body.style.overflowX = 'hidden'
}
