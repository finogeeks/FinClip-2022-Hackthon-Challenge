import { useEffect, useRef } from "react"
import Taro from "@tarojs/taro"

export const checkRecordScope = async () => {
  try {
    const auth = await Taro.getSetting()
    if (!auth.authSetting["scope.record"]) {
      try {
        await Taro.authorize({ scope: "scope.record" })
      } catch (error) {
        console.log("authorize", error)
        return error
      }
    }
  } catch (error) {
    console.log("getSetting", error)
  }
}

export const startRecord = async () => {
  const err = await checkRecordScope()
  if (err) {
    Taro.openSetting()
    return err
  }

  const recordManager = Taro.getRecorderManager()
  recordManager.start({
    duration: 60000,
    numberOfChannels: 1,
    sampleRate: 16000,
    format: "PCM",
    frameSize: 4
  })
}

export const stopRecord = () => {
  const recordManager = Taro.getRecorderManager()
  recordManager.stop()
}

// 录音控制
export const useRecordManager = (opt: {
  loading: (loading: boolean) => void
  setMessage: (message: string | ((m: string) => string)) => void
}) => {
  const ref = useRef({ ...opt })
  useEffect(() => {
    const recordManager = Taro.getRecorderManager()

    recordManager.onStop(res => {
      const { loading, setMessage } = ref.current
      console.log("recorder stop", res)
      const { tempFilePath } = res

      loading(true)

      wx.uploadFile({
        url: "https://finogeeks-tools.finogeeks.club/mop-nls/upload",
        filePath: tempFilePath,
        name: "file",
        formData: { token: "finclip@nls" },
        success(nlsRes) {
          console.log("nlsRes", nlsRes.data)
          const json = JSON.parse(nlsRes.data)
          setMessage(json.result)
        },
        fail(e) {
          console.log(e)
          setMessage("")
        }
      })
    })

    return () => {
      recordManager.stop()
    }
  }, [])
}
