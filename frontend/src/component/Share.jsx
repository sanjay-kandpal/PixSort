import React from "react";
import Sidebar from "./Sidebar";
import {FacebookShareButton,RedditShareButton,WhatsappShareButton,FacebookIcon, TwitterShareButton, RedditIcon, TwitterIcon,WhatsappIcon} from "react-share";
import "../styles/share.css";

const Share = () => {
    // Replace 'yourShareUrl' with the URL you want to share
    const shareUrl = 'http://localhost:3000/share';
    
    return (
        <div className="share">
            <Sidebar />
            <div>
                <div className="share-container">
                <FacebookShareButton
                    url={shareUrl}
                    quote={'YaY I got it'}
                    hashtag={'#pixsort #images'}
                >
                <FacebookIcon  size={40} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton
                url={shareUrl}
                quote={'YaY I got it'}
                hashtag={'#portfolio...'}
            >
                <WhatsappIcon  size={40} round={true} />
            </WhatsappShareButton>
            <TwitterShareButton
                url={shareUrl}
                quote={'YaY I got it'}
                hashtag={'#portfolio...'}
            >
                <TwitterIcon   size={40} round={true} />
            </TwitterShareButton>
            <RedditShareButton
                url={shareUrl}
                quote={'YaY I got it'}
                hashtag={'#portfolio...'}
            >
                <RedditIcon size={40} round={true} />
            </RedditShareButton>
                </div>
            </div>
            
        </div>
    );
}

export default Share;
