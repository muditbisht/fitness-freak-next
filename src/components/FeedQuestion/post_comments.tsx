import React,{useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

import { UserContext } from '@/context/UserContext';
import { PopupAgreementContext } from '@/context/PopupAgreementContext';
import { useRouter } from 'next/navigation';


interface PostCommentProps {
    parentId: string;
    onSubmit: (c: any) => Promise<any>;
    submitting: boolean
}

// Styled Components ====================================================

let CommentDiv = styled.div`
    height: 3em;
    flex-grow: 2;
    background: #EFF2F4;
    box-shadow: 20px -8px 34px rgba(255, 255, 255, 0.63);
    border-radius: 8px;
    
    border-radius: 10px;
    margin: 10px 5px 20px 5px;
    padding: 0 10px 0 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    box-sizing: border-box;
    .inpt{
        flex: 1;
        background-color: transparent;
        border-style: hidden;
        border-left-style: hidden;
        height: 2.5em;
        /* border-right: 2px solid #888888; */
        :focus{
            outline: none;
        }
}

.submit-btn{
    font-size: 1em;
    text-transform: none;
}
`;

// ======================================================================



export default function PostComment({ parentId, onSubmit, submitting, ...props }: PostCommentProps){
    const [commentInpt, setCommentInpt] = useState("");
    const [user,] = useContext(UserContext);
    const [submitAnswerDisabled, setSubmitAnswerDisabled] = useState(true);
    const showPopup = useContext(PopupAgreementContext);
    const router = useRouter();

    useEffect(() => {
        setSubmitAnswerDisabled(commentInpt.length > 0 ? false : true);
    }, [user, commentInpt]);

    return (
        <CommentDiv {...props}>
                <input 
                    value={commentInpt}
                    onChange={(el)=>setCommentInpt(el.target.value)}
                    placeholder="Post your comment here.....  "
                    className="cmmnt-text inpt"
                >
                </input>
                <Button
                    disabled={ submitting || submitAnswerDisabled }
                    type="submit"
                    className="post-btn"
                    onClick={submitComment}
                    color="primary"
                >Comment</Button>
            </CommentDiv>
    );

    async function submitComment(){
        if (submitting || submitAnswerDisabled) return;
        if (user) {
            onSubmit({ comment: commentInpt }).then(() => {
                setCommentInpt("");
            });
        } else {
            showPopup({
                content: { content: 'You need to login before answering a question.', title: 'Login required' },
                agreeBtn: "Login",
                disagreeBtn: "Cancel",
                onAgree: async () => { router.push('/auth/login'); },
                onDisagree: async () => { }
            });
        }
    }
}