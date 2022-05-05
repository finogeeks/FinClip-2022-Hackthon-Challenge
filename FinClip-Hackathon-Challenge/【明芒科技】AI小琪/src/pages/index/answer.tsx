import imgLoading from "~/assets/mingmang_loading_ico@2x.png"
import { MixImage, MixView } from "./MixView"

export const Answer: FC<{
  loading: boolean
  show: boolean
  message: string
  answer: string
}> = props => {
  if (!props.show) return null
  if (props.loading)
    return (
      <MixView className='text-box loading'>
        <MixImage className='img-loading' src={imgLoading} />
      </MixView>
    )
  if (!props.answer && !props.message) return null
  return (
    <MixView className='text-box'>
      <MixView>{props.message}</MixView>
      {/* <View className="mt-4"> {props.answer} </View> */}
    </MixView>
  )
}
