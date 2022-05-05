import { Image, Video, View } from "@tarojs/components"
import { useCallback, useEffect, useState } from "react"

import { defaultUrl, whoami } from "~/config/dict"
import Taro from "@tarojs/taro"

import imgPoster from "~/assets/poster.jpg"

const PosterVideo: FC<{ hide: boolean }> = () => {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = useCallback(
    () => setTimeout(() => setLoaded(true), 500),
    []
  )

  return (
    <Video
      id='video-idle'
      key='idle'
      autoplay
      loop
      muted
      className={[
        "video-box video-idle z-index-1",
        !loaded ? "video-hidden" : ""
      ].join(" ")}
      src={defaultUrl}
      objectFit='cover'
      onLoadedMetaData={handleLoad}
      controls={false}
      showCenterPlayBtn={false}
      enableProgressGesture={false}
    />
  )
}

export const AIVideo: FC<{
  src: string
  onPlay: () => void
  onEnded: () => void
}> = props => {
  const [hide, setHide] = useState(true)
  const { onEnded, onPlay } = props
  const [delaySrc, setSrc] = useState(whoami.URL)

  const isDefault = props.src === defaultUrl

  const handlePlay = useCallback(() => {
    setTimeout(() => {
      setHide(false)
      const ctx = Taro.createVideoContext("video-ai")
      ctx.seek(0)
      ctx.play()
      onPlay()
    }, 2000)
  }, [onPlay])

  useEffect(() => {
    setHide(true)
    setTimeout(() => setSrc(props.src), 50)
  }, [props.src, handlePlay])

  const handleEnded = useCallback(() => {
    if (isDefault) return
    setHide(true)
    onEnded()
  }, [onEnded, isDefault])

  return (
    <View className='video-wrapper'>
      <Image
        src={imgPoster}
        mode='aspectFill'
        className='video-box z-index-0'
      />
      <PosterVideo hide={!isDefault && !hide} />
      {delaySrc && !isDefault && (
        <Video
          id='video-ai'
          className={[
            "video-box z-index-2",
            isDefault || hide ? "video-hidden" : ""
          ].join(" ")}
          key={delaySrc}
          src={delaySrc}
          objectFit='cover'
          controls={false}
          showCenterPlayBtn={false}
          enableProgressGesture={false}
          onLoadedMetaData={handlePlay}
          onEnded={handleEnded}
        />
      )}
    </View>
  )
}
