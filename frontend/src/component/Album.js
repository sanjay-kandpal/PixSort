import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";

function Album() {


    const {partycode} = useParams();

    useEffect(() => {
        
    }, []);

    return (
        <div>
            <h1>{partycode}</h1>
        </div>
    )
}

export default Album
