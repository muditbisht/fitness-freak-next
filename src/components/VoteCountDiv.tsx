import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import LikeBtn from '@/icons/like_btn';

import ajaxRequest from '@/utils/api-call';
import {API_DOMAIN} from '@/config';
import { PopupAgreementContext } from '@/context/PopupAgreementContext';
import { UserContext } from '@/context/UserContext';
import { VoteCount } from '@/types';
import { useRouter } from 'next/navigation';

interface VoteCountDivProps {
    count: number;
}

interface VoteDivProps {
    vote: VoteCount;
    quesId: string;
    type?: 0 | 1 | 2;
}

// Styled Components =============================================================================

// let VoteDiv = styled.div`
//     display: flex;
//     align-items: center;
//     justify-items: space-evenly;
    
//     .vote-btn{
//         cursor: pointer;
//     }
// `;

let VoteCountDiv = styled.div<VoteCountDivProps>`
    color: ${({count})=>count<0?"#ff8080":(count===0?"black":"#065BFB")};
    
    text-align: center;
    height: 1.4em;
    border-radius: 10px;
    margin: 0 15px 0 15px;
    
    font-family: SF Pro;
    font-style: normal;
    font-weight: 600;
    font-size: 23px;
    line-height: 27px;
`;

// ======================================================================================
/*
    Type: 
        0: Answer
        1: Question
        2: Comment
*/
export default function VoteDiv({vote, quesId, type=1}: VoteDivProps){

    const router = useRouter();

    const [votes, setVotes] = useState<VoteCount>(vote);
    const [up,setUp]= useState<boolean|null>(null);
    const [down,setDown]=useState<boolean|null>(null);
    const [user,] = useContext(UserContext);

    const showPopup = useContext(PopupAgreementContext);
    useEffect(()=>{
        setVotes(vote);
    }, [vote]);
    useEffect(() => {
        fetchUserStatus();
    }, []);

    return (
      <div className='flex items-center justify-evenly'>
        <LikeBtn
            type="like"
            active={up}
            onClick={upvote}
            className="cursor-pointer"/>
        <VoteCountDiv count={votes.up-votes.down}>{Math.abs(votes.up - votes.down)}</VoteCountDiv>
        <LikeBtn
            type="dislike"
            active={down}
            onClick={downvote}
            className="cursor-pointer"/>
      </div>
    );


    async function fetchUserStatus(){
        let res = await ajaxRequest('POST', `${API_DOMAIN}/question/votes/byUser`, {quesId  :quesId, isQues : type});
        if(res.data.success){
            // console.log('Response: ', res.data.upvote, res.data.downvote);
            setUp(res.data.upvote);
            setDown(res.data.downvote);
        }
    }

    async function upvote(){
        console.log('Upvote clicked.', up, vote);
        if(up!==null){
            let voted = !up;
            setUp(null);
            let res = await ajaxRequest('POST', `${API_DOMAIN}/question/votes/editVote`, 
                {
                    isQues: type,
                    quesId: quesId,
                    up: voted});
            if(res.data.success){
                if(res.data.is_saved){
                    setUp(voted);
                    setDown(false);
                }else{
                    setUp(!voted);
                }
                setVotes({
                    up: res.data.vote.upvote,
                    down: res.data.vote.downvote
                });
            }
        } else if(user===null || user.isAuthenticated === false){
            showPopup({
                content: { content: 'You need to login for vote', title: 'Login required' },
                agreeBtn: "Login",
                disagreeBtn: "Cancel",
                onAgree: async () => { router.push('/auth/login'); },
                onDisagree: async () => { }});
        }
    }

    async function downvote(){
        if(down!==null){
            let voted = !down;
            setDown(null);
            let res = await ajaxRequest('POST', `${API_DOMAIN}/question/votes/editVote`, 
                {
                    isQues: type, 
                    quesId: quesId, 
                    down: voted
                });
            if(res.data.success){
                if(res.data.is_saved){
                    setDown(voted);
                    setUp(false);
                }else{
                    setDown(!voted);
                }
                setVotes({
                    up: res.data.vote.upvote,
                    down: res.data.vote.downvote
                });
            }
        } else if(user===null || user.isAuthenticated === false){
            showPopup({
                content: { content: 'You need to login for vote', title: 'Login required' },
                agreeBtn: "Login",
                disagreeBtn: "Cancel",
                onAgree: async () => { router.push('/auth/login'); },
                onDisagree: async () => { }});
        }
    }

}
