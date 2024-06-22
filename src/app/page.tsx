"use client"

import React, {useState} from "react"
import styled from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';

import AppFeed from "@/components/AppFeed";
import LeftNavBar from "@/components/LeftNav";
import RightNavBar from "@/components/RightNav";
import { responsive } from '@/utils/data.json';
import { QUESTION_TYPE } from "@/types";


interface ContentContainerProps {
    midPoint: boolean;
    lastPoint: boolean;
}

// Styled Components ===============================================================================

const ContentContainer = styled.div<ContentContainerProps>`
  display: grid;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  grid-template-columns: ${({midPoint, lastPoint})=>lastPoint? "0 1fr 0": midPoint? "250px 1fr": "1fr 800px 1fr"};
  min-height: 100vh;
  height: fit-content;
`;

// ==================================================================================================

export default function LandingPage() {
  const [ selectedCategories, setSelectedCategories ] = useState<string[]>([]);
  const [ type, setType ] = useState<QUESTION_TYPE|null>(null);

  let midPoint = useMediaQuery(`(min-width: ${responsive.small}) and (max-width: ${responsive.medium})`);
  let lastPoint = useMediaQuery(`(max-width: ${responsive.small})`);

  return (
      <ContentContainer midPoint={midPoint} lastPoint={lastPoint}>
        <LeftNavBar 
          setSelectedCategories={setSelectedCategories} 
          selectedCategories={selectedCategories} />
        <AppFeed setType={setType} type={type}
          selectedCategories={selectedCategories} />
        <RightNavBar />
      </ContentContainer>
    );
};
