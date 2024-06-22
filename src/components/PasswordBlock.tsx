import React, { useState } from 'react'; 
import styled from 'styled-components';
import { InputAdornment, OutlinedInput, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'


// Styled Components =========================================================

const PwdField = styled(OutlinedInput)`
    height: 100%;
    background-color: #EFF2F4;
    & .MuiOutlinedInput-root {
      & fieldset {
        border-color:#EFF2F4;
      }
    }
    .icon-btn{
        border-width: 0;
        outline-style: none;
    }
`;

// ==============================================================================

interface PasswordContent {
    value: string;
    error: any;
};

interface PasswordBlockProps {
    id: string;
    name: string;
    password: PasswordContent;
    setPassword: (s: PasswordContent) => void;
}


export default function PasswordBlock(props: PasswordBlockProps) {
    const [showPwd, setShowPwd] = useState(false);

    return (
        <PwdField required
            id="password"
            value={props.password.value}
            onChange={handlePasswordChange}
            className="form-control h-full bg-coolGray-100 w-full" 
            type="password" name={props.name} 
            placeholder="Password" 
            error={props.password.error}
            aria-describedby={"password"}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        className="icon-btn"
                        aria-label="toggle password visibility"
                        onClick={toggleShowPwd}>
                        {showPwd ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            }
            inputProps={{
                'aria-label': 'password',
            }}/>);

    async function handlePasswordChange(event: React.ChangeEvent) {
        if ((event.target as Element).nodeValue) {
            await props.setPassword({ value: event.target.nodeValue ?? '', error: null });
        }
    }

    function toggleShowPwd() {
        setShowPwd(oldPwd => !oldPwd);
    }
}