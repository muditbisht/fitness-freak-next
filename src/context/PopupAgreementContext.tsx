import React, { useState, useEffect, forwardRef, createContext } from 'react';
import {
    Button, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions, Slide
} from '@mui/material'
import { ContextProps } from './types';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} >
        <div></div>
    </Slide>;
});

interface ContentType {
    content: string;
    title: string;
}

interface IPopupAgreementContext {
    content: ContentType;
    setOnAgree: () => Promise<void>;
    setOnDisagree: () => Promise<void>;
    agreeBtn: "Agree";
    disagreeBtn: "Disagree";
}

const PopupAgreementContext = createContext<(s: SetPopUpProps) => void>(() => {});

interface PopupAgreementProviderProps {
    children: React.ReactNode;
    content: ContentType;
    agreeBtn: "Agree";
    disagreeBtn: "Disagree";
}

interface SetPopUpProps {
    content: ContentType;
    agreeBtn: React.ReactNode;
    disagreeBtn: React.ReactNode;
    onAgree: () => Promise<void>;
    onDisagree: () => Promise<void>;
}

const PopupAgreementProvider: React.FC<ContextProps> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [popUp, setPopUp] = useState<SetPopUpProps|null>(null);

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

    function showPopUp(props: SetPopUpProps) {
        setPopUp(props);
    }

    function handleClose(){
        setOpen(false);
    }

    const popContextvalue: IPopupAgreementContext = {
        content: popUp?.content ?? {content: "", title: ""},
        setOnAgree: popUp?.onAgree ?? (async () => {}),
        setOnDisagree: popUp?.onDisagree ?? (async () => {}),
        agreeBtn: "Agree",
        disagreeBtn: "Disagree"
    }
    return (
        <PopupAgreementContext.Provider value={showPopUp}>
            {children}
        <Dialog
            open={open}
            // TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            {popUp && <><DialogTitle id="alert-dialog-slide-title">{popUp.content.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                {popUp.content.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {popUp.agreeBtn && <Button
                    onClick={handleAgree}
                    disabled={loading}
                    color="primary">
                    {popUp.agreeBtn}
              </Button>}
                {popUp.disagreeBtn && <Button
                    onClick={handleDisagree}
                    disabled={loading}
                    color="secondary">
                    {popUp.disagreeBtn}
                </Button>
                }
            </DialogActions></>}
        </Dialog>
    </PopupAgreementContext.Provider>
    );


    function handleAgree() {
        setLoading(true);
        popUp?.onAgree().then(() => {
            setLoading(false);
            setOpen(false);
        }).catch(err => {
            
        });
    }

    function handleDisagree() {
        setLoading(true);
        popUp?.onDisagree().then(() => {
            setLoading(false);
            setOpen(false);
        }).catch(err => {
            
        });
    }
}


export { PopupAgreementContext, PopupAgreementProvider};