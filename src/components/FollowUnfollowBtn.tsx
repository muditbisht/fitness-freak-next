import React, {useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import FollowButton from '@/components/FollowBtn';
import UnfollowButton from '@/components/UnfollowBtn';

import ajaxRequest from '@/utils/api-call';
import { API_DOMAIN } from '@/config';
import { UserContext } from '@/context/UserContext';
import { UserDataBase } from '@/types';


interface FollowUnfollowButtonProps {
    profile: UserDataBase;
    type?: string;
}

// Styled Components ==============================================================

let LoadingBtn = styled.button`
    margin: 10px 4px 10px 4px;
    height: 3em;
    width: 5em;
    border-radius: 1.5em;
    border-style: none;
    border: 2px solid blue; 
    background-color: inherit;

    span{
        display: block;
        background-color: #d8d8d8; 
        width: 100%;
        height: 0.7em;
    }
`;


let Btn = styled.div`
    float: right;
`;


// =======================================================================================


export default function FollowUnfollowButton({ profile, type="text", ...props }: FollowUnfollowButtonProps) {
    const [isFollowing, setIsFollowing] = useState<boolean|null>(null);
    const [ user, ] = useContext(UserContext);


    useEffect(fetchFollow, [user]);

    return (
        <Btn className="follow-btn" {...props}>
            {
                isFollowing === null ?
                    <></>
                    : isFollowing ?
                        <UnfollowButton type={type} profile={profile} setIsFollowing={setIsFollowing} {...props} />
                        : <FollowButton type={type} profile={profile} setIsFollowing={setIsFollowing} {...props} />
            }
        </Btn>
    );

    function fetchFollow() {
        console.log('Fetch Follow ', user, profile);
        if (user && profile) {
            if (user._id === profile._id) return;
            
            ajaxRequest('GET',
                `${API_DOMAIN}/following/check-following?user_id=${profile._id}`)
            .then(({data})=>{
                if (data.success) {
                    setIsFollowing(data.is_following);
                }
            })
            .catch(err=>{
                console.error("ERROR: ", err);
            });
        }
    }
}