import ImageComponent from "@/commonComponents/story/imageComponent"
import TextComponent from "@/commonComponents/story/textComponent"
import Image from "next/image"
import { StyledQuizBox, StyledStoryContainer } from "../../Story.styled"
import AudioPlayer from "@/commonComponents/story/audioComponent"
import HomeButton from "@/commonComponents/story/homeButtonComponent"

const Seq8Incorrect = () => {
  const text: string = '다시 한번 크게 외쳐주세요!'
  const audioUrl: string = '/resources/audioFile/seq8_incorrect.mp3'
  return (
    <>
      <StyledStoryContainer>
        <ImageComponent src='/resources/images/speak_fire.png'/>
      </StyledStoryContainer>
      <TextComponent text={text}/>
      <StyledQuizBox>
        <Image src='/resources/assets/volume_icon.png' width={80} height={60} alt="volume_icon"/>
      </StyledQuizBox>
      <AudioPlayer file={audioUrl} />
      <HomeButton />
    </>
  )
}

export default Seq8Incorrect