import React, {useEffect, useRef, useState} from 'react';
import ChatNotification from "../chat/ChatNotification";
import ReviewNotification from "../shop/ReviewNotification";
import LandingPage from "../chat/LandingPage";

function Home(props) {
    localStorage.url=process.env.REACT_APP_BACK_URL;
    console.log(localStorage.url);

    return (
        <div>
            <ChatNotification/>
            <ReviewNotification/>
            <h1>Home</h1>
        </div>
    );
}

export default Home;