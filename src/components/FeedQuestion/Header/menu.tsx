import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { Menu, MenuItem } from '@mui/material';
// icons
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon
} from '@mui/icons-material'

import { PopupAgreementContext } from '@/context/PopupAgreementContext';
import { PopupMessageContext } from '@/context/PopupMessageContext';
import request from '@/utils/api-call'
import CONFIG from '@/config';
import { UserData, QuestionData } from '@/types';
import { redirect } from 'next/navigation';

// Styled Components =======================================================

let StyledMenu = styled(Menu)`
    margin-top: 3em;
    border-radius: 2px;
    min-width: 10em;
`;

// ========================================================================


interface QuestionHeaderMenuProps {
    user: UserData | null;
    question: QuestionData;
}

export default function QuestionHeaderMenu({ user, question}: QuestionHeaderMenuProps){
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const agreementPopup = useContext(PopupAgreementContext);
    const messagePopup = useContext(PopupMessageContext);

    return (
        <>
        {Boolean(anchorEl)?
            <div onClick={collapse} className="expand-icon icon"><ExpandLessIcon  /></div>:
            <div className="expand-icon icon" onClick={expand}><ExpandMoreIcon  /></div>}
            <StyledMenu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={collapse}
            >  
                <MenuItem>Report</MenuItem>
                {user && question.user && user._id === question.user._id &&
                <MenuItem
                    onClick={deleteQuestion}
                >Delete</MenuItem>}
            </StyledMenu>
        </>
    );

    function expand(event: React.MouseEvent){
        console.log('El:', event.currentTarget);
        setAnchorEl(event.currentTarget);
        // setExpanded(true);
    }
    
    function collapse(){
        setAnchorEl(null);
        // setExpanded(false);
    }

    function deleteQuestion() {
        agreementPopup({
            content: { content: 'Do you want to delete this question', title: 'Delete Question' },
            agreeBtn: "Cancel",
            disagreeBtn: "Delete",
            onAgree: async () => { },
            onDisagree: del
        });

        async function del() {
            let res = await request("POST", `${CONFIG.API_DOMAIN}/question/deleteQuestion`, {
                quesId: question._id
            });
            if (res.data && !res.data.err) {
                redirect("/");
            } else {
                console.log("error in deleting question");
                messagePopup({ title: 'Error', message: 'Error in deleting question', severity: 'error' });
            }
        }   
    }
}