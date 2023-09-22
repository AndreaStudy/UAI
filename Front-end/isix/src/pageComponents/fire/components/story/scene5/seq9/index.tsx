import ImageComponent from "@/commonComponents/story/imageComponent"
import TextComponent from "@/commonComponents/story/textComponent"
import { StyledStoryShow } from "../../Story.styled"

const Seq9 = () => {
  const text: string = `다 함께 불을 피해서 밖으로 이동하던 중,
    계단과 엘리베이터가 있다는 것을 알게 되었어요.`

  return (
    <>
      <StyledStoryShow>
        <ImageComponent src='./resources/wonder_stair.png'/>
      </StyledStoryShow>
      <TextComponent text={text}/>
    </>
  )
}

export default Seq9