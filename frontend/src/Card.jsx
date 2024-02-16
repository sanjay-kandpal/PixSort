import React from "react";
import { GrGallery } from "react-icons/gr";
const album =[
    {
        title: 'family Photos',
        icon: <GrGallery />,
        size: '25GB'
    },
    {
        title: 'Party Photos',
        icon: <GrGallery />,
        size: '25GB'
    },
    {
        title: 'Trip Photos',
        icon: <GrGallery />,
        size: '25GB'
    },
    {
        title: 'Trip Photos',
        icon: <GrGallery />,
        size: '25GB'
    }
]
const Card = () =>{
    return(
        <div className="card--container">
            {album.map((item) => (
                    <div className="card">
                        <div className="card--cover">{item.icon}</div>
                        <div className="card--title">
                            <h3>{item.title}</h3>
                        </div>
                        <div className="card--body">
                            <p>{item.size}</p>
                        </div>
                    </div>
                )
            
            )}
        </div>
    )
}

export default Card;