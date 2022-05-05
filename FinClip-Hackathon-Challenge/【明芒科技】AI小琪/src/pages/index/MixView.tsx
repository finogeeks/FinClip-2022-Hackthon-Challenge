import { CoverImage, CoverView, Image, View } from "@tarojs/components"
import { ReactNode } from "react"
import { isFinclipAndroid } from "~/module/system"

export const MixView: FC<{
  children?: ReactNode
  [k: string]: unknown
}> = props => {
  if (isFinclipAndroid)
    return (
      <CoverView className='preset-cover' {...props}>
        {props.children}
      </CoverView>
    )

  return <View {...props}>{props.children} </View>
}

export const MixImage: FC<{ src: string; [k: string]: unknown }> = props => {
  if (isFinclipAndroid) return <CoverImage {...props} />
  return <Image {...props} />
}
