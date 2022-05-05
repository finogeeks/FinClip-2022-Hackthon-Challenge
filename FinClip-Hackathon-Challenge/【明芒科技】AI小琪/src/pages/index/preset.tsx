import imgPreset from "~/assets/mingmang_tips_ico@2x.png"
import { useAniDelay } from "~/module/animate"
import { isFinclipAndroid } from "~/module/system"
import { MixImage, MixView } from "./MixView"

const presetQuestion = [
  "开户失败怎么办？",
  "身份证照片怎么处理？",
  "证券账户未开出怎么办？",
  "场内基金是什么？",
  "场外基金是什么？",
  "股票交易时间？",
  "国债逆回购交易时间？",
  "怎么继续完成回访流程？",
  "债券佣金有最低收费吗？",
  "国债逆回购交易时间？"
]

const questions = isFinclipAndroid ? presetQuestion.slice(0, 5) : presetQuestion

export const Preset: FC<{
  show: boolean
  onSelect: (question: string) => void
}> = props => {
  const { show, aniShow } = useAniDelay(props.show)

  if (!show) return null

  return (
    <MixView
      className={["preset", "animate", aniShow ? "" : "fade-up"].join(" ")}
    >
      <MixView className='preset-title'>
        <MixImage src={imgPreset} className='preset-icon' />
        <MixView className='preset-title-text'>您可以尝试这样提问：</MixView>
      </MixView>
      <MixView className='preset-content'>
        {questions.map(item => (
          <MixView
            key={item}
            className='preset-item'
            onClick={() => aniShow && props.onSelect(item)}
          >
            {item}
          </MixView>
        ))}
      </MixView>
    </MixView>
  )
}
