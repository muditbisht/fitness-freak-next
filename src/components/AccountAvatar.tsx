import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Avatar, Popper, Grow, Paper, ClickAwayListener, MenuItem, MenuList, SvgIconTypeMap } from '@mui/material';
import { AccountCircleRounded } from '@mui/icons-material';


import LogoutDialog from '@/components/LogoutDialog';
import { UserDataBase } from '@/types';
import { redirect } from 'next/navigation';

// Styled Components ================================================================

const AccountAvatarDiv = styled.div`
`;

const StyledAccountImage = styled(Avatar)`
  cursor: pointer;
  width: 3em;
  height: 3em;
  border-radius: 50%;
`;

const StyledAccountPlaceholder = styled(AccountCircleRounded)`
  cursor: pointer;
  width: 3em;
  height: 3em;
`;

const StyledPopper = styled(Popper)`
`;
// ====================================================================================


interface AccountAvatarProps {
    user: UserDataBase;
}

export default function AccountAvatar({ user }: AccountAvatarProps) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const prevOpen = useRef(open);
    const [logoutDia, setLogoutDia] = useState(false);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            // @ts-ignore
            anchorRef?.current?.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <>
        <AccountAvatarDiv>
            {user.profile_image ?
            <StyledAccountImage
                src={user.profile_image}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            />
                : <StyledAccountPlaceholder
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                />}
            <StyledPopper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                    >
                        <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="menu-list-grow" autoFocusItem={open} onKeyDown={handleListKeyDown} component={"div"}>
                                <MenuItem onClick={()=>redirect(`/profile/${user._id}`)}>Profile</MenuItem>
                                <MenuItem onClick={()=>setLogoutDia(true)}>Logout</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>)}
            </StyledPopper>
        </AccountAvatarDiv>
        <LogoutDialog user={user} open={logoutDia} setOpen={setLogoutDia} />
        </>);

    function handleToggle() {
        setOpen((prevOpen => !prevOpen));
    }

    function handleClose(event: MouseEvent | TouchEvent){
        // @ts-ignore
        if (anchorRef.current?.contains && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    }
    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

}
