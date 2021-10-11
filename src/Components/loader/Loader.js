import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function Loader() {

    return (
        <div>
            <Backdrop
                sx={{ color: '#fd7e14', backgroundColor: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Loader
