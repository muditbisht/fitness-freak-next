
import React, {useState, useEffect} from 'react';
import { Divider, useMediaQuery } from '@mui/material';

import InfiniteScroll from '@/components/InfiniteScroll';
import styled from 'styled-components';
import CONFIG from '@/config';
import { responsive } from '@/utils/data.json';
import PlusSignSVG from '@/icons/plus_sign';

import ajaxRequest from '@/utils/api-call';
import BottomNav from '@/components/BottomNav';
import { QUESTION_TYPE } from '@/types';
import { useRouter } from 'next/navigation';


interface TypeProps {
    selected: boolean;
}

interface AppFeedProps {
    type: QUESTION_TYPE | null;
    setType: (s: QUESTION_TYPE|null) => void;
    selectedCategories: string[];
}

// Styled Components ==================================================================================

const Content = styled.div`
    grid-column: 2 / 3;
    padding: 30px 5px 0 5px;
    scrollbar-width: 0;
    width: 100%;
    box-sizing: border-box;
    max-height: 100%;

    display: flex;

    .divider{
        height: 80vh;
        top: 10vh;
        position: -webkit-sticky;
        position: sticky;
    }

    .content{
        margin: 0 20px 0 20px;
        width: 100%;
        @media(max-width: ${responsive.small}){
            margin: 0;
        }
    }

    @media(max-width: ${responsive.small}){
        padding: 20px 0 0 0;
    }

`;

const Margin = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;

    >* {
        flex: 1 1 160px;
        margin: 10px;
    }
`;

const TypeContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-sizing: border-box;
`;

const Type = styled.div<TypeProps>`
    margin: 0 10px 0 10px;
    border-radius: 5px;
    padding: 4px;
    box-sizing: border-box;

    display: flex;
    flex-wrap: wrap;

    color: ${({selected}) => selected ? "#065BFB": "inherit"};

    /* background-color: ${({selected}) => selected ? "#5ac8d6": "inherit"}; */
    :hover{
        color: ${({selected}) => selected ? "#065BFB": "inherit"};
        cursor: pointer;
    }

    .ques-count{
        margin-left: 6px;
        font-family: SF Pro;
        font-style: normal;
        font-weight: 500;
        font-size: 21px;
        line-height: 25px;    
        color: #065BFB;
    }
`;

const PostQuestionBtn = styled.div`
    width: 224px;
    height: 52px;
    background: #065BFB;
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;

    .icon{
        width: 20px;
        height: 20px;
    }
    .txt{
        width: 136px;
        height: 24px;
        font-family: SF Pro;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        color: #FFFFFF;
    }
`;

// =======================================================================================================

export default function AppFeed({ type, selectedCategories, setType }: AppFeedProps) {
    const [url, setUrl] = useState(`${CONFIG.API_DOMAIN}/feed/get-feed?`);
    const [unansweredQuestionCount, setUnansweredQuestionCount] = useState(null);
    const router = useRouter();

    let midPoint = useMediaQuery(`(min-width: ${responsive.medium})`);
    let lastPoint = useMediaQuery(`(min-width: ${responsive.small})`);
    let mobileScreen = useMediaQuery(`(max-width: ${responsive.small})`);

    useEffect(loadUnansweredQuestionCount, []);
    useEffect(loadData, [type, selectedCategories]);


    return (
        <Content>
            {lastPoint && <Divider className="divider" orientation="vertical" flexItem />}
            <div className="content">
            <Margin>
                {!mobileScreen && <div>
                    <PostQuestionBtn
                        onClick={()=>router.push("/post-question")}
                    >
                        <PlusSignSVG className="icon" />
                        <div className="txt" >Post a question</div>
                    </PostQuestionBtn>
                </div>}
                <TypeContainer>
                    <Type selected={type==QUESTION_TYPE.NEWEST} onClick={()=>handleTypeChange(QUESTION_TYPE.NEWEST)}>New</Type>
                    <Divider orientation="vertical" flexItem />
                    <Type selected={type==QUESTION_TYPE.HOT} onClick={()=>handleTypeChange(QUESTION_TYPE.HOT)}>Hot</Type>
                    <Divider orientation="vertical" />
                    <Type selected={type==QUESTION_TYPE.UNANSWERED} onClick={()=>handleTypeChange(QUESTION_TYPE.UNANSWERED)}>
                        Unanswered 
                        {unansweredQuestionCount && 
                            <span className="ques-count">( {unansweredQuestionCount} )</span>}
                    </Type>
                </TypeContainer>
            </Margin>
            <InfiniteScroll type={type} selectedCategories={selectedCategories} url={url}/>
            </div>
            {midPoint && <Divider className="divider" orientation="vertical" flexItem />}
            {mobileScreen &&  <BottomNav />}
        </Content>);


    async function handleTypeChange(tp: QUESTION_TYPE) {
        // console.log("Changing type:", type);
        if (type === tp) {
            setType(null);
        } else {
            setType(tp);
        }
    }

    function loadData(){
        
        if (type === QUESTION_TYPE.HOT) {
            setUrl(`${CONFIG.API_DOMAIN}/question/get-type/hot-questions?${selectedCategories ? "selectedCategories=" + selectedCategories+"&" : ""}`);
        } else if (type === QUESTION_TYPE.NEWEST) {
            setUrl(`${CONFIG.API_DOMAIN}/question/get-type/latest-questions?${selectedCategories ? "selectedCategories=" + selectedCategories+"&" : ""}`);
        } else if (type === QUESTION_TYPE.UNANSWERED) {
            setUrl(`${CONFIG.API_DOMAIN}/question/get-type/unanswered-questions?${selectedCategories ? "selectedCategories=" + selectedCategories+"&" : ""}`);
        } else {
            if(selectedCategories)
                setUrl(`${CONFIG.API_DOMAIN}/question/getQuestionsCategoryWise/${selectedCategories}?`)
            else
                setUrl(`${CONFIG.API_DOMAIN}/feed/get-feed?`)
        }
    }

    function loadUnansweredQuestionCount(){
        if(unansweredQuestionCount===null){
            ajaxRequest('GET', 
                `${CONFIG.API_DOMAIN}/question/get-unanswered-question-count`)
                .then(({data})=>{
                    if(data.success){
                        setUnansweredQuestionCount(data.unanswered_question_count);
                    }else{
                        console.log(data.error);
                    }
                })
                .catch(err=>{
                    console.error('ERROR:', err);
                });
        }
    }
}