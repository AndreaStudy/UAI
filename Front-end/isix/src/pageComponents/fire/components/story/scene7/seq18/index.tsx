import { StyledCamText, StyledQuizBox, StyledStoryCam } from "../../Story.styled"
import CamComponent from "@/commonComponents/story/camComponent"
import Image from "next/image"

interface WebcamProps {
  videoElm: JSX.Element;
  hiddenCanvasElm: JSX.Element; 
  startStream: () => void;
  stopStream: () => void;
}

const Seq18: React.FC<WebcamProps> = ({ startStream, stopStream, videoElm, hiddenCanvasElm }) => {
  const text: string = '판다를 따라 몸을 굴러주세요'

  return (
    <>
      <StyledCamText>{text}</StyledCamText>
      <StyledStoryCam>
        <CamComponent videoElm={videoElm} hiddenCanvasElm = { hiddenCanvasElm } startStream = {startStream} stopStream={stopStream} />
        <StyledQuizBox>
          <Image src='/resources/clothes_fire.png' width={300} height={250} alt="clothes"  style={{ marginTop: '2.5rem' }}/>
        </StyledQuizBox>
      {/* <TextComponent text={text}/> */}
      </StyledStoryCam>
    </>
  )
}

export default Seq18