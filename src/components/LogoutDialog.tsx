import React, { useState, forwardRef } from 'react';
import {
    Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions,
    Slide, Button, LinearProgress
} from '@mui/material'

import ajaxRequest from '@/utils/api-call';
import CONFIG from '@/config';
import { UserDataBase } from '@/types';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} >
        <></>
    </Slide>;
});

interface LogOutDialogProps {
    open: boolean;
    setOpen: (s: boolean) => void;
    user: UserDataBase;
}

// Logout Dialog
export default function LogoutDialog({ open, setOpen, user}: LogOutDialogProps) {
    const [loggedout, setLoggedOut] = useState(false);
    const [sending, setSending] = useState(false);

    return (
        <Dialog
            open={open}
            component={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">Logout</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Logout as @{user.username}
                </DialogContentText>
                { sending && <LinearProgress color="secondary" />}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} disabled={sending} color="primary">
                Cancel
              </Button>
              <Button onClick={logout} disabled={sending} color="secondary">
                    Logout
              </Button>
            </DialogActions>
      </Dialog>
    );

    async function logout() {
        setSending(true);
        try {
            const res = await ajaxRequest('GET', `${CONFIG.API_DOMAIN}/auth/logout`);
            if (res.data.loggedout || res.data.isAuthenticated==false) {
                setLoggedOut(true);
                setSending(false);
                setOpen(false);
                window.location.href = '/';
                return;
            } else {
                setSending(false);
                return;
            }
        } catch (err) {
            setOpen(false);
            setSending(false);
            return;
        }
    }

    function handleClickOpen(){
        setOpen(true);
    };
    function handleClose(){
        setOpen(false);
    }
}
