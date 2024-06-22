"use client"

import React,{ useContext } from "react";
import styled from 'styled-components';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  AppBar, Toolbar, Button, IconButton,useMediaQuery
} from '@mui/material'
import {
    Menu as MenuIcon,
    Home as HomeIcon
} from '@mui/icons-material'
import { responsive } from '@/utils/data.json';

import Searchbar from '@/components/Searchbar'
import Notification from "@/components/Notification"
import AccountAvatar from '@/components/AccountAvatar'
import { UserContext } from '@/context/UserContext';
import { NavContext } from '@/context/NavContext';

// Styled Components ================================================================

const NavbarContainer = styled.div`

  .search-bar{
    max-width: 800px;
    width: calc(100% - 100px);
    width: -moz-available;
    margin-left: auto;
    margin-right: auto;
    padding: 1px 10px 1px 10px;
    height: 3em;
  }

  @media (max-width: ${responsive.small}){
    font-size: 10px;
  }
`;

const StyledBrand = styled(Link)`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=JetBrains+Mono:ital,wght@1,100&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');

  font-family: Raleway, JetBrains Mono, monospace, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  text-decoration: none !important;
  color: #065BFB;
`;

const StyledIcons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  justify-self: flex-end;
  margin-left: auto;

  .btn{
    background-color: blue;

    :hover{
      background-color: #9c9cff;
    }
  }
`;


const StyledHome = styled(HomeIcon)`
  cursor: pointer;
  margin-right: 1em;
`;

const StyledLink = styled(Link)`
  color: white;
  :hover{
    color: white;
    text-decoration: none;
  }
`
// ==================================================================================



export default function CustomNavbar() {
  const matches = useMediaQuery(`(max-width:${responsive.small})`);
  const [user, ] = useContext(UserContext) ?? [];
  const [, setLeftNavActive] = useContext(NavContext)?.leftnav ?? [];
  const router = useRouter();

  return (
    <NavbarContainer className="bg-white grow">
      <AppBar position="fixed" color="default">
          { matches ?
            <div className="py-0.5">
              <Toolbar >
                <IconButton edge="start"  color="inherit" aria-label="menu" onClick={activateLeftNav}>
                  <MenuIcon />
                </IconButton>
                <StyledBrand href="/">Fitness Freak</StyledBrand>
                <StyledIcons >
                { user ?
                  <>
                    <Notification />
                    <AccountAvatar user={user}/>
                    </>
                  :
                  <Button  variant="outlined" color="primary" href="/auth" size={matches?"small":"medium"}>
                      Login/Register
                  </Button>
                }
              </StyledIcons>
              </Toolbar>
              <div className="search-bar"><Searchbar /></div>
            </div> :
            <Toolbar>
              <StyledBrand href="/">Fitness Freak</StyledBrand>
              <div className="search-bar"><Searchbar /></div>
              <StyledIcons >
                <StyledHome onClick={() => router.push('/')}></StyledHome>
                { user ?
                  <>
                    <Notification />
                    <AccountAvatar user={user}/>
                    </>
                  :
                  <Button variant="outlined" color="primary" href="/auth">
                      Login/Register
                  </Button>
                }
              </StyledIcons> 
            </Toolbar>
          }
      </AppBar>
    </NavbarContainer>
  );


  function activateLeftNav(){
    setLeftNavActive? setLeftNavActive(true): null;
  }

};
