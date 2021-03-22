import { useEffect } from 'react'

function useKeyPress(fn) {
  useEffect(() => {
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [fn])
}

export default useKeyPress