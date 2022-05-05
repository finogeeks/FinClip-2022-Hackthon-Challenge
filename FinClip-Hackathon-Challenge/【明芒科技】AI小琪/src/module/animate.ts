import { useEffect, useState } from "react"

export const useAniDelay = (show: boolean, time = 300) => {
  const [delay, setDelay] = useState(false)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setDelay(show)
      },
      show ? 0 : time
    )
    return () => clearTimeout(timer)
  }, [show, time])

  return { show: delay || show, aniShow: delay && show }
}
