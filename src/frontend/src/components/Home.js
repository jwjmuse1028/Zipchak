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
            <h1>\ainMain\ainMain\ainMain\ainMain\ainMain\ainMain\ainMain\ainMain\ainMain</h1>
            <h1>M\inMainM\inMainM\inMainM\inMainM\inMainM\inMainM\inMainM\inMainM\inMain</h1>
            <h1>Ma\nMainMa\nMainMa\nMainMa\nMainMa\nMainMa\nMainMa\nMainMa\nMainMa\nMain</h1>
            <h1>Mai\MainMai\MainMai\MainMai\MainMai\MainMai\MainMai\MainMai\MainMai\Main</h1>
            <h1>Main\ainMain\ainMain\ainMain\ainMain\ainMain\ainMain\ainMain\ainMain\ain</h1>
            <h1>MainM\inMainM\inMainM\inMainM\inMainM\inMainM\inMainM\inMainM\inMainM\in</h1>
            <h1>MainMa\nMainMa\nMainMa\nMainMa\nMainMa\nMainMa\nMainMa\nMainMa\nMainMa\n</h1>
            <h1>MainMai\MainMai\MainMai\MainMai\MainMai\MainMai\MainMai\MainMai\MainMai\</h1>
        </div>
    );
}

export default Home;