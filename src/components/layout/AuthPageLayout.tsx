import React from 'react'
import Image from 'next/image'
import styled from 'styled-components';
import { Divider, Grid } from '@mui/material'
import { responsive } from '@/utils/data.json'
import SocialAuthBtn from '@/components/SocialAuthBtn';
import GoogleIcon from '@/static/google-icon.svg';
import FacebookIcon from '@/icons/facebook-icon.svg';
import { API_DOMAIN } from '@/config';


// Styled Components =====================================================

let AuthLayout = styled.div`
    width: 100%;
    min-height: 100%;
    display: grid;
    margin-top: 100px;
    font-family: SF Pro;
    font-style: normal;

    .auth-container{
        margin-bottom: 10em;
        background: #FFFFFF;
        border-radius: 10px;
        box-sizing: border-box;
        max-width: 800px;
        width: 90%;
        place-self: center;
        padding: 35px 50px 35px 50px;

        @media(max-width:${responsive.small}){
            font-size: 10px;
        }

        .heading{
            display: flex;
            justify-content: space-evenly;
            margin-top: 10px;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #7e7e7e;
            cursor: pointer;
            .chng-btn{
                width: 40%;
                height: 3em;
                text-align: center;
                border-radius: 5px;
                border-style: none;
                color: #050831;
                background-color: #eeeeee;
            }
            .active{
                    background-color: #43b9dd;
                }
        }
    }
`;

let OrBlock = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    margin: 20px 0 20px 0;
    align-items: center;
    grid-column-gap: 30px;
    span{
        align-self: center;
        font-size: 2em;
    }

    .MuiDivider-root{
        background-color: rgba(66, 66, 89, 0.2);
        /* background-color: red; */
    }
`;

let OtherAuthMethods = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    .google-btn{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: center;

        .google-btn-img{
            width: 100%;
            box-sizing: border-box;
        }
    }

    >*{
        margin-top: 5px;
    }
`;
// ========================================================================


interface AuthPageLayoutProps {
    children?: React.ReactNode;
}

export default function AuthPageLayout({ children }: AuthPageLayoutProps) {

    return <AuthLayout>
            <div className="auth-container">
                { children }
                <OrBlock>
                    <Divider sx={{ opacity: 0.6 }} />
                    <span className="text-[#424259] font-sans">Or</span>
                    <Divider sx={{ opacity: 0.6 }} />
                </OrBlock>

                <Grid container xs={12} spacing={3} >
                    <Grid item sm={12} md={6}>
                        <SocialAuthBtn 
                            icon={<Image src={GoogleIcon} alt='google icon'/>} 
                            text={"Continue with Google"} 
                            redirect={`${API_DOMAIN}/auth/google`} />
                    </Grid>
                    <Grid item sm={12} md={6}>
                    <SocialAuthBtn 
                            icon={<Image src={FacebookIcon} alt='facebook icon'/>} 
                            text={"Continue with Facebook"} 
                            redirect={`${API_DOMAIN}/auth/facebook`} />
                    </Grid>
                </Grid>
          </div>
        </AuthLayout>
}
