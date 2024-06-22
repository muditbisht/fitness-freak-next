import React, { useState, useContext, useEffect } from "react";
import styled from 'styled-components';
import { CircularProgress, Drawer, useMediaQuery } from '@mui/material';
import  FaceRoundedIcon from '@mui/icons-material/FaceRounded';


import CategoryBlock from '@/components/CategoryBlock';
import fetchCategories from '@/utils/fetch_categories';

import { NavContext } from '@/context/NavContext';
import { UserContext } from '@/context/UserContext';
import { responsive } from '@/utils/data.json';
import { SERVER_DOMAIN } from '@/config';
import Link from "next/link";
import { FeedCategoryType } from "@/types";

interface SideNavContainerProps {
    drawer: boolean;
}

interface LeftNavBarProps {
    selectedCategories: string[]
    setSelectedCategories: (s: string[]) => void;
}

// Styled Components =================================================================

const SideNavContainer = styled.div<SideNavContainerProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
    min-width: fit-content;
    box-sizing: border-box;
    grid-column: 1 / 2;
    
    position: ${({drawer})=>drawer?"static":"sticky"};
    top: ${({drawer})=>drawer?"0":"6em"};
    bottom: ${({drawer})=>drawer?"0":"2em"};
    overflow-y: auto;
    
    @media(max-width: ${responsive.small}){
      width: 250px;
    }


    ::-webkit-scrollbar-thumb {
      background-color: rgb(78, 78, 78);
      outline: 1px solid rgb(210, 230, 250);
      border-radius: 2px;
    }
    ::-webkit-scrollbar {
      width: 0.8em;
      border-radius: 100px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px transparent;
      margin-left: -2em;
    }

    .snavcontainer{
      height: 100%;
      .snavdat{
        /* position: relative;
        top: 0; 
        right: 2em; */
        min-height: 100%;
        box-sizing: border-box;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        margin-left: auto;
        margin-right: auto;
        align-items: flex-start;
        justify-self: center;
        padding-bottom: 50px;

        >*{
          margin-left: 10px;
        }

        .users{
          box-sizing: border-box;
          display: flex;
          align-items: center;
          border: 1px solid #065BFB;
          padding: 0.5em;
          border-radius: 10px;
          cursor: pointer;
          color: #065BFB;
          font-weight: 400;
          width: 140px;
          text-decoration: none;
          margin-bottom: 1em;
          :hover{
            /* transform: scale(1.1); */
            /* border-width: 2px; */
            font-weight: 500;
            background: #065BFB;
            color: white;
            transition: font 0.5s, background 0.5s, color 0.5s, transform 0.5s;
          }
        }

        .divider{
          height: 2px;
          color: black;
          width: 300px;
        }

        .link{
          margin-left: 10px;
          font-size: 1.5em;
          justify-content: center;
        }

        .category-list{
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          padding: 10px 0 10px 0;
          min-height: min-content;
          font-size: 1.2em;

          .category-el{
            box-sizing: border-box;
          }
        }

        .categories-heading{
          font-family: SF Pro;
          font-style: normal;
          font-weight: 600;
          font-size: 25px;
          line-height: 30px;
          color: #065BFB;
        }
      }  
    }
`;

// ======================================================================================


export default function LeftNavBar ({ setSelectedCategories, selectedCategories }: LeftNavBarProps) {
  const [categories, setCategories] = useState<FeedCategoryType[]>([]);
  const [leftNavActive, setLeftNavActive] = useContext(NavContext).leftnav;
  const matches = useMediaQuery(`(max-width:${responsive.small})`);

  useEffect(fetchCategoriesData, []);

  return (
    categories===null?
      <CircularProgress /> :
      matches ? 
        <Drawer open={leftNavActive} onClose={closeLeftnav}>
          <LeftNavContent />
        </Drawer>:
      <LeftNavContent />
    );
  
  function handleCategoryCheck(category: string, checked: boolean) {
    if (checked) {
      if (selectedCategories)
        setSelectedCategories([...selectedCategories, category]);
      else
        setSelectedCategories([category]);
    } else {
      let result = selectedCategories.filter(cat => cat !== category);
      if (result.length === 0)
        setSelectedCategories([]);
      else
        setSelectedCategories(result);
    }
  }
  function closeLeftnav(){
    setLeftNavActive(false);
  }

  function LeftNavContent(){
    return (
      <SideNavContainer drawer={matches} className="left-nav">
        <div className="snavcontainer">
          <div className="snavdat">
            <Link 
              className="users" 
              href="/rankings"
            >
              <FaceRoundedIcon />
              <div className="link" >Ranking</div>
            </Link>
            <div className="categories-heading">
              Categories
            </div>
            {categories.map(category =>
                <CategoryBlock
                    key={`category-block-${category.name}`}
                    selected={selectedCategories!==null && selectedCategories.some(cat => cat === category.name)}
                    category={category}
                    handleChange={(event) => handleCategoryCheck(category.name, event.target. checked)}
                />
            )}
          </div>
          </div>
      </SideNavContainer>);
  }

  function fetchCategoriesData(){
      (async function (){
          try {
              let fetched_categories = await fetchCategories();
              // console.log("Categories: ", fetched_categories);
              setCategories(
                  (fetched_categories ?? []).map(category => 
                      ({ 
                          name: category.name, 
                          checked: false,
                          icon: `${SERVER_DOMAIN}/server-static/${category.url}`
                      })) ?? []);
          } catch (err) {

          }
      })();
    }
  }
