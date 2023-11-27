'use client';
import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

import styled from 'styled-components';

export function Slider({ images, gameName, gap = 10 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(images.length);
  const [innerWidth, setInnerWidth] = useState(null);

  useEffect(() => {
    const clientWidth = window.innerWidth;
    setInnerWidth(clientWidth);
  }, []);

  const handleRightClick = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleLeftClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const calculateImageWidth = () => {
    if (innerWidth < 400) return 375;
    if (innerWidth > 400 && innerWidth < 768) return 400;
    if (innerWidth > 767) return 768;
  };

  const imageWidth = calculateImageWidth();

  const imageElements = images.map((image) => {
    return (
      <Image
        key={image}
        src={image}
        alt={gameName}
        width={imageWidth || 375}
        height={(imageWidth * 3) / 4 || 220}
      />
    );
  });

  return (
    <_Slider>
      <_Container $width={imageWidth}>
        <_Wrapper>
          <_ArrowLeft onClick={handleLeftClick} $currentIndex={currentIndex}>
            <ChevronLeftIcon />
          </_ArrowLeft>

          <_ContentWrapper>
            <_Content
              $columnGap={gap}
              $index={currentIndex}
              $cardWidth={imageWidth}
            >
              {imageElements}
            </_Content>
          </_ContentWrapper>

          <_ArrowRight
            onClick={handleRightClick}
            $currentIndex={currentIndex}
            $length={length}
          >
            <ChevronRightIcon />
          </_ArrowRight>
        </_Wrapper>
      </_Container>
    </_Slider>
  );
}

const _Slider = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const _Container = styled.div`
  width: ${(props) => props.$width}px;
  display: flex;
  flex-direction: column;
`;

const _Wrapper = styled.div`
  width: 100%;

  position: relative;
  display: flex;
  gap: 1rem;
`;

const _ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const _Content = styled.div`
  display: flex;
  column-gap: ${(props) => props.$columnGap}px;

  transform: ${(props) =>
    `translateX(-${
      props.$index * props.$cardWidth + props.$index * props.$columnGap
    }px)`};
  transition: all 250ms linear;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const _ArrowLeft = styled.span`
  opacity: ${(props) => (props.$currentIndex <= 0 ? 0.5 : 1)};
  position: absolute;
  display: block;
  width: 30px;
  color: #e48f45;

  top: 50%;
  transform: translateY(-50%);
  left: 5px;
  z-index: 5;

  &:hover {
    cursor: pointer;

    svg {
      scale: 1.1;
    }
  }
`;

const _ArrowRight = styled.span`
  opacity: ${(props) => (props.$currentIndex >= props.$length - 1 ? 0.5 : 1)};
  position: absolute;
  display: block;
  width: 30px;
  color: #e48f45;

  top: 50%;
  transform: translateY(-50%);
  right: 5px;
  z-index: 5;

  &:hover {
    cursor: pointer;

    svg {
      scale: 1.1;
    }
  }
`;
