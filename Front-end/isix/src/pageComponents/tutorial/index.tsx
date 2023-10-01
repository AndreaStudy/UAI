'use client'
import React, {useState} from 'react'
import ImageComponent from "@/commonComponents/story/imageComponent";
import { StyledContainer,StyledPaperContainer,StyledTitleContainer,StyledText} from "./Tutorial.styled";
import OX from './components/ox';
import Sound from './components/sound';
import OCR from './components/ocr';

const Tutorial = () => {
  const [state,setState] = useState<number>(0);
  const incrementState = () => {
    setState(state + 1);
  };
  const textByState = () => {
    switch (state) {
      case 0:
        return "OX퀴즈";
      case 1:
        return "소리내보기";
      case 2:
        return "따라 써보기";
      default:
        return "";
    }
  };

  return (
    <>
      <StyledContainer>
        <StyledTitleContainer>
          <StyledText>
            {textByState()}
          </StyledText>
          {/* text 부분 추후에 state로 관리 */}
        </StyledTitleContainer>
        <StyledPaperContainer>
          {state === 0 && <OX />}
          {state === 1 && <Sound />}
          {state === 2 && <OCR />}
        </StyledPaperContainer>
      </StyledContainer>
    </>
  );
};

export default Tutorial;
