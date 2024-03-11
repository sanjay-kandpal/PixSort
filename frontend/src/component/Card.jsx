import React, { useState } from "react";
import { GrGallery } from "react-icons/gr";
import { BiSearch } from "react-icons/bi";

const Card = ({ codes }) => {

    const [search, setSearch] = useState("")

    if (!Array.isArray(codes)) {
        console.error("codes prop is not an array:", codes);
        return null; // or handle the error in another way
    }


    return (
        <div className="albumContainer">
            <div className="search-box">
                <input type="text" placeholder="Search party" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <BiSearch className="icon" />
            </div>
            <div className="card--container">
                {codes.map((code) => (
                    <div className="card">
                        {/* <div className="card--cover">{item.icon}</div> */}
                        <div className="card--title">
                            <h3>{code.title}</h3>
                        </div>
                        <div className="card--body">
                            <p>{code.partycode}</p>
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default Card;