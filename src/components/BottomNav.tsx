import { useState } from 'react';
import styled from 'styled-components';

// Material-UI ===================
import {Fab, Tooltip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
//  ===========================


import HomeIcon from '@/icons/home_icon';
import BellIcon from '@/icons/bell_icon'
import HeartIcon from '@/icons/heart_icon';
import SettingsIcon from '@/icons/settings_icon';
import { useRouter } from 'next/navigation';


interface ButtonContainerProps {
    selected: boolean;
}

// Styled Components ==============================

let ToolTipContainer =  styled.div`
    position: relative;
    bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

let BottomContainer = styled.div`
    position: fixed;
    bottom: 0px;
    height: 60px;
    width: 100%;
    display: flex;
    background: #FFFFFF;
    align-items: center;
    box-shadow: 0px -20px 44px rgba(0, 0, 0, 0.07);
    justify-content: space-evenly;
    z-index: 1000;
`;


let ButtonContainer = styled.div<ButtonContainerProps>`
    font-family: SF Pro;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    color: ${({selected})=>selected?"#065BFB":"#424259"};

    .name{
        height: 15px;
        width: 50px;
    }
`;

// ================================================


export default function ButtonNav(){
    const [selected, setSelected] = useState('Home');
    const router = useRouter();

    return (
        <BottomContainer>
            <ButtonContainer 
                selected={selected==='Home'}
                onClick={changeState('Home')}
            >
                <HomeIcon />
                <div className="name">{selected==='Home' && "Home"}</div>
            </ButtonContainer>
            <ButtonContainer
                selected={selected==='Notifications'}
                onClick={changeState('Notifications')}
            >
                <BellIcon />
                <div className="name">{selected==='Notifications' && "Notifications"}</div>
            </ButtonContainer>
            <ToolTipContainer>
                <Tooltip 
                    title="Add" placement="bottom"
                    onClick={()=>router.push("/post-question")}
                >
                <Fab color="primary">
                    <AddIcon />
                </Fab>
                </Tooltip>
            </ToolTipContainer>
            <ButtonContainer
                selected={selected==='Likes'}
                onClick={changeState('Likes')}
            >
                <HeartIcon />
                <div className="name">{selected==='Likes' && "Likes"}</div>
            </ButtonContainer>
            <ButtonContainer
                selected={selected==='Settings'}
                onClick={changeState('Settings')}
            >
                <SettingsIcon />
                <div className="name">{selected==='Settings' && "Settings"}</div>
            </ButtonContainer>
        </BottomContainer>
    );

    function changeState(state: string){
        return (function(){
            switch(state){
                case 'Home':
                    setSelected('Home');
                    break;
                case 'Notifications':
                    setSelected('Notifications');
                    break;
                case 'Likes':
                    setSelected('Likes');
                    break;
                case 'Settings':
                    setSelected('Settings');
                    break;
                default:
                    setSelected('Home');
                    break;
            }
        })
    }
}