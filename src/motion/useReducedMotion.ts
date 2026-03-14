import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    return Boolean(media?.matches)
  })

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!media) return

    const update = () => setReduced(Boolean(media.matches))
    update()

    media.addEventListener('change', update)

    return () => {
      media.removeEventListener('change', update)
    }
  }, [])

  return reduced
}
