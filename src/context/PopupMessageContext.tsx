import React, { useState, useEffect, forwardRef, createContext } from 'react';
import {
    Alert, AlertTitle, Snackbar, Slide
} from '@mui/material';
import { ContextProps, Severity } from './types'

interface IPopupMessageContext {
    title: string;
    message: string;
    severity: Severity;
}

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}>
        <div></div>
    </Slide>;
});


export const PopupMessageContext = createContext<(s: IPopupMessageContext) => void>(() => {});

export const PopupMessageProvider: React.FC<ContextProps> = ({ children }) => {

    const [open, setOpen] = useState(false);
    const [popUp, setPopUp] = useState<IPopupMessageContext|null>(null);

    useEffect(() => {
        if (popUp) {
            setOpen(true);
        }
    }, [popUp]);

    useEffect(() => {
        if (open === false) {
            setPopUp(null);
        }
    }, [open]);

    function showPopUp({title='', message, severity}: IPopupMessageContext) {
        setPopUp({
            title,
            message,
            severity
        });
    }

    function handleClose(){
        setOpen(false);
    }
    return (
        <PopupMessageContext.Provider value={ showPopUp }>
            {children}
            <Snackbar
                autoHideDuration={2000}
                anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
                open={open}
                onClose={handleClose}
                key='main-popup-message'>
                { popUp != null ? 
                    (<Alert severity={popUp.severity}>
                        {popUp.title && <AlertTitle>{popUp.title}</AlertTitle>}
                        {popUp.message}
                    </Alert>): <></>}
            </Snackbar>
    </PopupMessageContext.Provider>
    );
}
