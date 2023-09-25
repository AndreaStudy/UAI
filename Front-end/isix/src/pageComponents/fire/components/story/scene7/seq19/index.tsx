import ImageComponent from "@/commonComponents/story/imageComponent"
import TextComponent from "@/commonComponents/story/textComponent"
import { StyledStoryContainer } from "../../Story.styled"
import AudioPlayer from "@/commonComponents/story/audioComponent"

const Seq19 = () => {
  const text: string = `옷에 불이 붙었을 때는 불이 더 커지기 전에
    땅에 몸을 굴러 불이 꺼질 수 있도록 합니다.`
  const audioUrl: string = '/resources/audioFile/seq19.mp3'
  return (
    <>
      <StyledStoryContainer>
        <ImageComponent src='./resources/clothes_fire_animation.gif'/>
      </StyledStoryContainer>
      <TextComponent text={text} />
      <AudioPlayer file={audioUrl} />
    </>
  )
}

export default Seq19