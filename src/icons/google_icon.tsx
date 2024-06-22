import React, {useState} from 'react';
import GoogleFocusIcon from './google_signin_buttons/web/2x/btn_google_signin_dark_focus_web@2x.png'
import GoogleNormalIcon from './google_signin_buttons/web/2x/btn_google_signin_dark_normal_web@2x.png'
import Image from 'next/image';
import Link from 'next/link';

import CONFIG from '@/config';

export default function GoogleIcon() {
    const [googleIcon, setGoogleIcon] = useState(GoogleNormalIcon);

    function handleMouseOver() {
        setGoogleIcon(GoogleFocusIcon);
    }
    function handleMouseOut() {
        setGoogleIcon(GoogleNormalIcon);
    }

    return (
        <Link href={`${CONFIG.API_DOMAIN}/auth/google`}>
            <Image
                className="google-btn-img"
                alt='Google Button Image'
                src={googleIcon}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            />
        </Link>
    );
}
