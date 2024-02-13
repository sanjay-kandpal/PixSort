import React from "react";
import { BiGift } from "react-icons/bi";
const album =[
    {
        title: 'family Photos',
        icon: <BiGift />,
        size: '25GB'
    },
    {
        title: 'faaf',
        icon: <BiGift />,
        size: '25GB'
    },
    {
        title: 'faaf',
        icon: <BiGift />,
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