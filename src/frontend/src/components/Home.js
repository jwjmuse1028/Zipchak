import React, {useEffect, useRef, useState} from 'react';
import ChatNotification from "../chat/ChatNotification";

function Home(props) {
    localStorage.url=process.env.REACT_APP_BACK_URL;
    console.log(localStorage.url);

    return (
        <div>
            <ChatNotification/>
            <h1>Home</h1>

        </div>
    );
}

export default Home;