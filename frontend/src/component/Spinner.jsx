import React from 'react'
import { ClipLoader } from 'react-spinners'

function Spinner() {
    return (
        <ClipLoader 
            color="#5c4d3c" 
            size={60}
            speedMultiplier={1}
            cssOverride={{
                borderWidth: '6px'
            }}
        />
    )
}

export default Spinner