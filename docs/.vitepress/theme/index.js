import DefaultTheme from 'vitepress/theme'
import { onMounted, nextTick } from 'vue'

export default {
  ...DefaultTheme,
  setup() {
    onMounted(() => {
      if (window.location.hash) {
        const scrollToHash = () => {
          const id = decodeURIComponent(window.location.hash.substring(1))
          const el = document.getElementById(id)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
        const waitForMermaidStable = () => {
          let scrollTimeout = null
          let observer = null
          const scheduleScroll = () => {
            if (scrollTimeout) clearTimeout(scrollTimeout)
            scrollTimeout = setTimeout(() => {
              if (observer) observer.disconnect()
              scrollToHash()
            }, 500)
          }
          // Observer toutes les mutations sur le body
          observer = new MutationObserver(mutations => {
            let mermaidChanged = false
            for (const mutation of mutations) {
              if (
                mutation.target.classList && mutation.target.classList.contains('mermaid') ||
                (mutation.target.nodeName === 'svg' && mutation.target.parentElement && mutation.target.parentElement.classList && mutation.target.parentElement.classList.contains('mermaid'))
              ) {
                mermaidChanged = true
                break
              }
            }
            if (mermaidChanged) {
              scheduleScroll()
            }
          })
          observer.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: false })
          // Premier scroll si déjà tout est prêt
          scheduleScroll()
        }
        nextTick(waitForMermaidStable)
      }
    })
  }
}
