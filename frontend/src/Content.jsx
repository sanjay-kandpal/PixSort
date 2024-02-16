import React from "react";
import ContentHeader from "./ContentHeader";
import "../src/styles/content.css";
import Card from "./Card";
const Content = () => {
    return (
        <div className="content">
            <ContentHeader />
            <Card />
        </div>
    );
};
export default Content;