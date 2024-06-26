import React, { useState } from 'react';
import styled from 'styled-components';

import { Button } from '@mui/material';

import ajaxRequest from '@/utils/api-call';
import { API_DOMAIN } from '@/config';
import FollowIcon from '@/icons/follow_icon';
import { UserDataBase } from '@/types';

interface FollowProfileButtonProps {
    active: boolean;
}

interface FollowButtonProps {
    profile: UserDataBase;
    setIsFollowing: (s: any) => void;
    type: string;
}

interface TypeFollowProps {
    type: string;
    active: boolean;
    onClick: () => void;
}

// Styled Components ================================================

const FollowProfileButtonText = styled(Button)<FollowProfileButtonProps>`
    font-family: SF Pro;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #065BFB;
    margin: 10px 4px 10px 4px;
    background-color: inherit;
    height: 1em;
    text-transform: capitalize !important;
    cursor: ${({ active }) => active ? "pointer" : "wait" };
    span{
        color: #065BFB;
    }
    :hover{
        background-color: white !important;
    }
`;

const FollowProfileButtonBtn = styled(Button)<FollowProfileButtonProps>`
    font-family: SF Pro;
    /* font-style: normal;
    font-weight: 800;
    font-size: 20px !important;
    line-height: 25px !important;
    text-transform: none !important; */
    width: 110px;
    font-style: normal !important;
    font-weight: 500 !important;
    font-size: 18px !important;
    line-height: 21px !important;
    color: #FFFFFF !important;
    background: #065BFB !important;
    margin: 10px 4px 10px 4px;
    border-radius: 7px;
    text-transform: capitalize !important;

    cursor: ${({ active }) => active ? "pointer" : "wait" };
`;


const FollowIconBtn = styled(FollowIcon)`
    cursor: pointer;

    :hover{
        position: relative;
        transform: scale(1.1);
    }
`;
//=====================================================================

function TypeFollow({type, onClick, active, ...props}: TypeFollowProps){
    switch(type){
        case 'text':
            return (
                <FollowProfileButtonText
                    active={active}
                    onClick={onClick}
                    {...props}>
                    <span>Follow</span>
                </FollowProfileButtonText>);

        case 'icon':
            return (
                <FollowIconBtn
                    active={active}
                    // onClick={onClick}
                    {...props} />
            );

        case 'btn':
        case 'button':
            return (
                <FollowProfileButtonBtn
                    color="primary"
                    active={active}
                    onClick={onClick}
                    variant="outlined"
                    {...props}>
                    <span>Follow</span>
                </FollowProfileButtonBtn>
            );
        default:
                throw Error('Unknown type');
                break;
    }
}

export default function FollowButton({ profile, setIsFollowing, type }: FollowButtonProps){
    const [ active, setActive ] = useState(true);

    return <TypeFollow 
                type={type}
                active={active}
                onClick={handleFollowRequest}
            />;

    async function handleFollowRequest() {
        setActive(false);
        let res = await ajaxRequest('POST', `${API_DOMAIN}/following/add-following`, { user_id: profile._id });
        if (res.data.success) {
            setIsFollowing(res.data.is_following);
        } else {
            setActive(true);
        }
    }

}
