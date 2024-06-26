import React, { useState } from 'react';
import styled from 'styled-components';

import { 
    Button, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Slide 
} from '@mui/material';
import ajaxRequest from '@/utils/api-call';
import { API_DOMAIN } from '@/config';
import UnfollowIcon from '@/icons/followers_icon';
import { UserDataBase } from '@/types';


interface UnfollowProfileProps {
    active: boolean;
}

// Styled Components ================================================

let UnfollowProfileButton = styled(Button)<UnfollowProfileProps>`
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
        color: #ff5353;
    }
    :hover{
        background-color: white !important;
    }
`;

let UnfollowProfileButtonBtn = styled(Button)<UnfollowProfileProps>`
    font-family: SF Pro;
    /* font-style: normal;
    font-weight: 600;
    font-size: 20px !important;
    line-height: 25px !important; */
    outline: none;
    outline-width: 0;
    width: 110px;
    font-style: normal !important;
    font-weight: 500 !important;
    font-size: 18px !important;
    line-height: 21px !important;
    color: #065BFB !important;
    background: rgba(6, 91, 251, 0.08) !important;
    margin: 10px 4px 10px 4px;
    border: 0;
    border-radius: 7px;
    text-transform: capitalize !important;
    width: 6em;
    cursor: ${({ active }) => active ? "pointer" : "wait" };

`;

let UnfollowIconBtn = styled(UnfollowIcon)`
    cursor: pointer;

    :hover{
        position: relative;
        transform: scale(1.1);
    }
`;

//=====================================================================

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} >
        <></>
    </Slide>;
});

interface UnfollowButtonProps {
    type: string;
    profile: UserDataBase;
    setIsFollowing: (b: boolean|null) => void;
}


export default function UnfollowButton({ type, profile, setIsFollowing, ...props }: UnfollowButtonProps){
    const [active, setActive] = useState(true);

    return (<>
            <TypeFollow />
            <Dialog
              open={!active}
            //   TransitionComponent={<Transition />}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description">
              <DialogTitle id="alert-dialog-slide-title">Unfollow</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Unfollow {profile.username}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleUnfollow} color="secondary">
                  Unfollow
                </Button>
              </DialogActions>
            </Dialog>
        </>);

    function handleClose() {
        setActive(true);
    }

    async function handleUnfollow() {
        let res = await ajaxRequest('POST', `${API_DOMAIN}/following/remove-following`, { user_id: profile._id });

        if (res.data.success) {
            setIsFollowing(false);
            setActive(true);
        } else if(res.data.isAuthenticated===false){
            setActive(true);
            setIsFollowing(null);
        } else {
            setActive(true);
        }
    }


    function TypeFollow(){
      let [text, setText] = useState('Following');
      switch(type){
          case 'text':
              return (
                  <UnfollowProfileButton
                    active={active} disabled={!active}
                    onMouseEnter={()=>setText('Unfollow')}
                    onMouseLeave={()=>setText('Following')}
                    onClick={()=>setActive(false)}>
                <span>{text}</span>
            </UnfollowProfileButton>);
          case 'icon':
              return (
                  <UnfollowIconBtn
                      active={active}
                      onClick={()=>setActive(false)}
                  />
              );
          case 'btn':
          case 'button':
              return (
                <UnfollowProfileButtonBtn
                      active={active} disabled={!active}
                      onMouseEnter={()=>setText('Unfollow')}
                      onMouseLeave={()=>setText('Following')}
                      onClick={()=>setActive(false)}
                      variant="outlined"
                      {...props}>
                      <span>{text}</span>
                  </UnfollowProfileButtonBtn>
              );
          default:
                  throw Error('Unknown type');
                  break;
      }
  }

}