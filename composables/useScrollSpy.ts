import type { TocLink } from '@nuxt/content'

export function useScrollSpy(links: MaybeRef<TocLink[]>) {
  const activeId = ref<string | null>(null)
  let observer: IntersectionObserver | null = null
  let scrollTimeoutId: number | null = null
  let watchStopHandle: (() => void) | null = null
  const headingElements = ref<Map<string, HTMLElement>>(new Map())

  // Throttle scroll events for performance
  const SCROLL_THROTTLE = 150
  let lastScrollTime = 0

  const isAtBottom = () => {
    const scrolled = window.scrollY + window.innerHeight
    const total = document.documentElement.scrollHeight
    return total - scrolled <= 1
  }

  const calculateVisibility = (rect: DOMRect): number => {
    const viewportHeight = window.innerHeight
    const viewableHeight = Math.min(viewportHeight, rect.bottom) - Math.max(0, rect.top)

    // Prioritize fully visible sections
    if (rect.top > 0 && rect.bottom <= viewportHeight)
      return 1000 + viewableHeight

    // Score based on visible height and distance from top
    return viewableHeight - Math.abs(rect.top - 100)
  }

  const updateActiveHeading = () => {
    const elements = Array.from(headingElements.value.values())
    if (!elements.length)
      return

    // Handle bottom of page
    if (isAtBottom()) {
      const lastLink = unref(links).at(-1)
      if (lastLink) {
        activeId.value = lastLink.id
        return
      }
    }

    // Find most visible heading
    let bestElement = elements[0]
    let bestVisibility = -Infinity

    elements.forEach((element) => {
      if (!element.isConnected)
        return
      const visibility = calculateVisibility(element.getBoundingClientRect())
      if (visibility > bestVisibility) {
        bestElement = element
        bestVisibility = visibility
      }
    })

    if (bestElement?.isConnected)
      activeId.value = bestElement.id
  }

  const handleScroll = () => {
    const now = Date.now()
    if (now - lastScrollTime < SCROLL_THROTTLE)
      return

    lastScrollTime = now
    if (scrollTimeoutId)
      window.cancelAnimationFrame(scrollTimeoutId)

    scrollTimeoutId = window.requestAnimationFrame(updateActiveHeading)
  }

  onMounted(() => {
    // Setup intersection observer
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some(e => e.isIntersecting))
          updateActiveHeading()
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: [0, 1] },
    )

    // Watch for heading changes
    watchStopHandle = watch(() => unref(links), (newLinks) => {
      headingElements.value.clear()
      observer?.disconnect()

      newLinks.forEach((link) => {
        const element = document.getElementById(link.id)
        if (element?.isConnected) {
          headingElements.value.set(link.id, element)
          observer?.observe(element)
        }
      })

      updateActiveHeading()
    }, { immediate: true })

    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    if (scrollTimeoutId) {
      window.cancelAnimationFrame(scrollTimeoutId)
    }
    observer?.disconnect()
    watchStopHandle?.()
    window.removeEventListener('scroll', handleScroll)
  })

  return { activeId }
}
