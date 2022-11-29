import React, {useEffect, useRef, useState} from 'react';
import ChatNotification from "../chat/ChatNotification";
import ReviewNotification from "../shop/ReviewNotification";
import "../css/Home.css";
import mainad from "../image/mainad.webp";
import mainad2 from "../image/mainad2.webp";
import LandingPage from "../chat/LandingPage";

function Home(props) {
    localStorage.url=process.env.REACT_APP_BACK_URL;
    console.log(localStorage.url);

    return (
        <div style={{margin:"auto",width:'70%', minWidth:'1000px'}}>
            <ChatNotification/>
            <ReviewNotification/>
            <section className={'home_box'}>
                <img src={mainad} style={{width:'50%'}}/>
                <b style={{fontSize:'3em'}}>진아가 문제야</b>
                <span>사고좀 그만치고 다녀요</span>
            </section>
            <section className={'home_box2'}>
                <b style={{fontSize:'3em'}}>진아가 문제야</b>
                <span>사고좀 그만치고 다녀요</span>
                <img src={mainad2} style={{width:'30%'}}/>
            </section>
        </div>
    );
}

export default Home;