import styled from 'styled-components';
import CategoryIcon from '@/static/CategoryIcons';
import { FeedCategoryType } from '@/types';

interface CategoryDivProps {
    selected: boolean;
}

interface CategoryBlockProps {
    selected: boolean;
    category: FeedCategoryType;
    handleChange: (s: {target:{checked: boolean}}) => void;
}

// Styled Components =================================================================

const CategoryDiv = styled.div<CategoryDivProps>`
    margin: 10px 1em 5px 0;
    border-radius: 0.5em;
    display: flex;

    font-family: SF Pro;
    font-style: normal;

    font-weight: ${({selected}) => selected ? "600"  : "500"};
    font-size: ${({selected}) => selected ? "24px"  : "20px"};;
    line-height: ${({selected}) => selected ? "29px"  : "24px"};;
    color: ${({selected}) => selected ? "#065BFB"  : "#424259"};
    

    path{ 
        fill: ${({selected}) => selected ? "#065BFB"  : "#424259"};
    }

    /* background-color: ${({selected}) => selected ? "#5ac8d6"  : "inherit"}; */
    :hover{
        cursor: pointer;
        /* background-color: ${({selected}) => selected ? "#dddddd": "#b4e4eb"}; */
    }

    .category-icon{
        width: 21px;
        height: 21px;
    }

    .category-name{
        margin-left: 5px;
    }

`;

// ======================================================================================

export default function CategoryBlock({selected, category, handleChange }: CategoryBlockProps) {

    return (
        <>
            <CategoryDiv selected={selected}
                className="category-el"
                onClick={()=>handleChange({target:{checked: !selected}})}>
                {/* <object
                    className="category-icon" 
                    data={category.icon} type="image/svg+xml" /> */}
                {/* <img  src={category.icon} alt={category.alt} className="category-icon"/> */}
                <CategoryIcon category={category.name}/>
                <span className="category-name">{ category.name }</span>
            </CategoryDiv>
        </>
    );
}