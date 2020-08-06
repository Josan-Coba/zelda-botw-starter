import { MutableRefObject, useCallback, useEffect, useRef } from 'react'

export default function useClickOutside<T extends Node>(
  callback: () => void,
): MutableRefObject<T | null> {
  const ref = useRef<T>(null)
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      ) {
        callback()
      }
    },
    [callback],
  )
  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [handleClick])

  return ref
}
