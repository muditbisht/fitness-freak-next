import React from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';

interface SocialAuthBtnProps {
    icon: any;
    redirect: string;
    text: string;
}

export default function SocialAuthBtn({icon, redirect, text}: SocialAuthBtnProps) {
    return (
        <Button
            variant="outlined"
            className="box-border flex items-center h-16 w-full rounded-lg cursor-pointer
            mr-7.5 ml-6.25"
            startIcon={icon}
            href={redirect}>
            <div 
                className="font-medium text-lg text-[#424259]"
                style={{textDecoration: "none", textTransform: "none"}}
            > {text} </div>
        </Button>
    );
}