import { useEffect, useState } from 'react'

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(() => {
    if (typeof navigator !== 'undefined' && 'maxTouchPoints' in navigator) {
      return navigator.maxTouchPoints > 0
    }
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(pointer: coarse)')?.matches ?? false
    }
    return false
  })

  useEffect(() => {
    const media = window.matchMedia?.('(pointer: coarse)')
    if (!media) return

    const onChange = () => {
      const hasTouch =
        typeof navigator !== 'undefined' &&
        ('maxTouchPoints' in navigator ? navigator.maxTouchPoints > 0 : false)
      setIsTouch(Boolean(hasTouch || media.matches))
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return isTouch
}
