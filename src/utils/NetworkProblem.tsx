/* eslint-disable react/no-deprecated */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Alert, Snackbar } from '@mui/material';


function NetworkProblem({ }) {
    const [open, setopen] = useState(false);

    return open &&
        <Snackbar open={true} autoHideDuration={600} onClose={handleClose}>
                <Alert elevation={6} variant="filled" severity="error" onClose={handleClose}> Connection problem! </Alert>
        </Snackbar>;

    function handleClose() {
        setopen(false);
    }


}



export default function networkError(err = false) {
    const errorEl = document.getElementById("error-main");
    if(err) {
        alert(`Network Error` );
    }
    // if (err)
    //     ReactDOM.render( <NetworkProblem / > , errorEl);
    // else
    //     ReactDOM.render( <> </>, errorEl);
}