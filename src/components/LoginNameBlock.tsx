import React from 'react';
import { TextField } from '@mui/material'
import styled from 'styled-components';

import { FormValue, FormMaxLenTextInput } from '@/types';

// Styled Components =========================================================

const NameField = styled(TextField)`
    height: 100%;
    background-color: #EFF2F4;
    & .MuiOutlinedInput-root {
      & fieldset {
        border-color:white;
      }
    }
`;

// ==============================================================================

interface NameBlockProps {
    id: string;
    name: FormValue;
    setName: (s: FormValue) => void;
    input: FormMaxLenTextInput;
}

export default function NameBlock({id, name, setName, input}: NameBlockProps) {
    return (
        <NameField
            id={id}
            className="form-control"
            // maxLength={input.maxLength}
            type="text"
            name={input.name}
            required={input.required}
            placeholder={input.placeholder}
            value={name.value}
            onChange={handleNameChange}
            helperText={name.error}
            error={Boolean(name.error)}
            variant="outlined"
        />);

    function handleNameChange(event: any) {
        setName({value: event.target.value, error: null});
    }
}