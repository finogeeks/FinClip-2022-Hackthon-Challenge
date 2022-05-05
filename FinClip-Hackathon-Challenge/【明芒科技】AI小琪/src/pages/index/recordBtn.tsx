import { Image, View } from "@tarojs/components"
import { useCallback, useEffect, useRef, useState } from "react"
import { useAniDelay } from "~/module/animate"

import imgBtnDefault from "~/assets/mingmang_btn_voice_default@x.png"
import imgBtnPress from "~/assets/mingmang_btn_voice_press@x.png"
import imgBtnStop from "~/assets/mingmang_btn_stop_default.png"
// import imgBtnStopPress from "~/assets/mingmang_btn_stop_press.png"
import imgRecordAnim_1 from "~/assets/mingmang_record_01@2x.png"
import imgRecordAnim_2 from "~/assets/mingmang_record_02@2x.png"
import imgRecordAnim_3 from "~/assets/mingmang_record_03@2x.png"
import { MixImage, MixView } from "./MixView"

const animImgs = [
  imgRecordAnim_1,
  imgRecordAnim_3,
  imgRecordAnim_2,
  imgRecordAnim_3
]

const RecordAnim: FC<{ playing: boolean }> = props => {
  const [idx, setIdx] = useState(0)
  const { show, aniShow } = useAniDelay(props.playing)

  useEffect(() => {
    let timer = 0
    const play = () => {
      if (!show) return
      timer = setTimeout(() => {
        setIdx(num => (num + 1) % 4)
        play()
      }, 200)
    }

    play()

    return () => {
      timer && clearTimeout(timer)
    }
  }, [show])

  if (!show) return null

  return (
    <MixView
      className={["relative z-index-10", aniShow ? "" : "fade-up"].join(" ")}
    >
      <MixView className='record-animate'>
        {animImgs.map((imgSrc, index) => {
          return (
            <MixImage
              key={imgSrc}
              src={imgSrc}
              mode='aspectFit'
              className={[
                "record-animate-img",
                "animate",
                idx === index ? "" : "opacity-0"
              ].join(" ")}
            />
          )
        })}
      </MixView>
      <MixView className='record-animate-after' />
    </MixView>
  )
}

export const RecordBtn: FC<{
  onPress: () => void
  onEnd: () => void
  onReset: () => void
  isRecording: boolean
  playing: boolean
  hide: boolean
}> = props => {
  const { playing, onPress, onEnd, onReset, hide, isRecording } = props
  const [isClick, setIsClick] = useState(false)

  const stateRef = useRef({
    isClick,
    playing,
    hide
  })

  stateRef.current = { isClick, playing, hide }
  const handlePress = useCallback(() => {
    setIsClick(false)
    if (stateRef.current.hide) return
    if (stateRef.current.playing) return
    setTimeout(() => {
      if (stateRef.current.isClick) return
      onPress()
    }, 50)
  }, [onPress])

  const handleClick = useCallback(() => {
    setTimeout(() => setIsClick(true))
    if (stateRef.current.hide) return
    if (!playing || isRecording) return
    onReset()
  }, [playing, isRecording, onReset])

  return (
    <View className='record-btn-and-animate'>
      <RecordAnim playing={isRecording} />

      <View
        className={["record-button", "animate", hide ? "fade-up" : ""].join(
          " "
        )}
        onClick={handleClick}
        onTouchStart={handlePress}
        onTouchCancel={onEnd}
        onTouchEnd={onEnd}
      >
        <Image
          className='record-button-img'
          src={isRecording ? imgBtnPress : playing ? imgBtnStop : imgBtnDefault}
        />
      </View>
    </View>
  )
}

export const Mask: FC<{ show: boolean }> = props => {
  const { show, aniShow } = useAniDelay(props.show)
  if (!show) return null
  return (
    <MixView
      className={["page-mask", "animate", aniShow ? "" : "opacity-0"].join(" ")}
    />
  )
}
