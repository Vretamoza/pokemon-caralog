import { useState, useEffect, RefObject } from "react"

export function useIntersectionObserver(ref: RefObject<HTMLElement>) {
  const [isOnScreen, setIsOnScreen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref])

  return isOnScreen
}