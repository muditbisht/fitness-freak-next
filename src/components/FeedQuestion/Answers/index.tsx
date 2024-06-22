import React,{useEffect, useState} from 'react';
import styled from 'styled-components';

import Answer from './answer';
import ajaxRequest from '@/utils/api-call';
import {API_DOMAIN} from '@/config';
import { AnswerData } from '@/types';

// Styled Components ====================================================

const AnswersDiv = styled.div`
    margin: 20px 10px 20px 10x;
    width: 100%;
    box-sizing: border-box;
`;

const AnswerInput = styled.div`
    display: flex;
    justify-items: space-around;
    margin-top: 20px;
    margin-bottom: 10px;

    .cmmnt-text{
        flex: 1;
    }
    .post-btn{
        margin-left: auto;
    }
`;

const StyledAnswer = styled(Answer)`
    width: 100%;
    box-sizing: border-box;
`;

const MainDiv = styled.div`
    width: 100%;
    box-sizing: border-box;
`;



// ======================================================================

interface AnswersProps {
    quesId: string;
}


export default function Answers({ quesId }: AnswersProps){
    let [answers, setAnswers] = useState<AnswerData[]>([]);    

    useEffect(()=>{
        fetchAnswers();
    }, [quesId]);

    


    return (
        <MainDiv>            
            <AnswersDiv>
                {answers.map(answer=>
                        <StyledAnswer key={`answer-${answer._id}`} answer={answer} />
                )}
            </AnswersDiv>
        </MainDiv>
    );

    async function fetchAnswers(){
        let res = await ajaxRequest('GET', `${API_DOMAIN}/answer/get-answers-of-question?quesId=${quesId}`);

        if(res.data.success){
            setAnswers(res.data.answers);
        }
    }
}