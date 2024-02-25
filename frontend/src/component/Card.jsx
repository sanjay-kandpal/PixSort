import React, { useState } from "react";
import { GrGallery } from "react-icons/gr";
import { BiSearch } from "react-icons/bi";

const album = [
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

const Card = () => {

    const [search, setSearch] = useState("")

    return (
        <div className="albumContainer">
            <div className="search-box">
                <input type="text" placeholder="Search party" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <BiSearch className="icon" />
            </div>
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
        </div>
    )
}

export default Card;