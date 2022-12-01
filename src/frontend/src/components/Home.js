import React, {useEffect, useState} from 'react';
import ChatNotification from "../chat/ChatNotification";
import ReviewNotification from "../shop/ReviewNotification";
import Slider from "react-slick";
import "../css/Home.css";
import "../css/FeedList.css";
import mainad from "../image/mainad.webp";
import mainad2 from "../image/mainad2.webp";
import mainad3 from "../image/mainad3.jpg";
import christmas from "../image/christmas.png";
import friends from "../image/friends.png";
import room from "../image/room.png";
import chat from "../image/chat.png";
import {Avatar} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Home(props) {
    const navi = useNavigate();
    const [bestfdlist, setBestfdlist] = useState([]);

    localStorage.url=process.env.REACT_APP_BACK_URL;
    // console.log(localStorage.url);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:1000,
        arrows: false,
        pauseOnHover:false
    };
    const settings_j = {
        arrows: true,
        dots: false,
        lazyLoad: true,
        infinite: true,
        speed: 200,
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 0
    };
    const bestFeed = ()=>{
        const bestfdUrl = localStorage.url + "/feed/bestfd";
        axios.get(bestfdUrl)
            .then(res => {
                setBestfdlist(res.data);
                console.log(res.data);
            })
    }
    useEffect(() => {
        bestFeed();
    }, []);

    const updaterdcnt=(fd_num)=>{

        const rdcntUrl=localStorage.url+"/feed/uprdcnt?fd_num="+fd_num;

        axios.get(rdcntUrl)
            .then(res=>{
            })
    }

    return (
        <div style={{margin:"auto", width:'70%', minWidth:'1000px'}}>
            <ChatNotification/>
            <ReviewNotification/>
            <Slider {...settings}>
                <div>
                    <section className={'hmbx home_box'}>
                        <div className={'maintxt'}>
                            <h1><strong>예쁜 방에서 나혼자 산다! 🧡</strong></h1>
                            <h1>나만의 공간, 나만의 색으로🎨</h1><br/>
                            <span>혼자 보기 아까운</span><br/>
                            <span>인스타감성의</span>
                        </div>
                        <div>
                            <img src={room} style={{width:'600px'}}/>
                        </div>
                    </section>
                </div>
                <div>
                    <section className={'hmbx home_box2'}>
                        <div className={'maintxt'}>
                            <h1><strong>진아가문제야😒</strong></h1>
                            <h1>문제야 문제 온 세상속에</h1><br/>
                            <span>사고좀 그만치고다녀요</span><br/>
                            <span>학원좀 나와요</span>
                        </div>
                        <div>
                            <img src={mainad} style={{width:'650px'}}/>
                        </div>
                    </section>
                </div>
                <div>
                    <section className={'hmbx home_box3'}>
                        <div className={'maintxt'}>
                            <h1><strong>이제 곧 크리스마스🎄</strong></h1>
                            <h1>🎅산타도 놀랄 나만의 인테리어</h1><br/>
                            <span>사실 산타는 없어요</span><br/>
                        </div>
                        <div>
                            <img src={christmas} style={{width:'400px', marginLeft:'10%'}}/>
                        </div>
                    </section>
                </div>
                <div>
                    <section className={'hmbx home_box4'}>
                        <div className={'maintxt'}>
                            <h1><strong>🌈집톡으로 바로바로</strong></h1>
                            <h1>ㅇㅇㅇㅇ</h1><br/>
                            <span>욕금지</span><br/>
                        </div>
                        <div>
                            <img src={chat} style={{width:'50%'}}/>
                        </div>
                    </section>
                </div>
                <div>
                    <section className={'hmbx home_box5'}>
                        <div className={'maintxt'}>
                            <h1><strong>착한 사람들만 있어요😊</strong></h1>
                            <h1>믿으세요</h1><br/>
                            <span>우리는 모두 친구</span><br/>
                        </div>
                        <div>
                            <img src={friends} style={{width:'50%', margin:'auto'}}/>
                        </div>
                    </section>
                </div>
            </Slider>
            <br/><br/><br/>
            <div>
                <h4><strong>🏅 12월 인기 집들이 BEST 🏅</strong></h4>
                <br/>
                <Slider {...settings_j}>
                    {
                        bestfdlist &&
                        bestfdlist.map((data,idx)=>
                            <div>
                                <article className="project-feed__item" style={{width:'90%', margin:"auto"}}>
                                    <a className="project-feed__item__link"
                                       onClick={()=>{
                                           updaterdcnt(data.fd_num);
                                           navi(`/feed/detail/${data.fd_num}`);
                                       }}></a>
                                    <div className="project-feed__item__image">
                                        <img className="image" alt=""
                                             src={`https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/fd_img/${data.fd_num}/${data.fd_img}`}/>
                                    </div>
                                    <div className="project-feed__item__title" style={{fontSize:"15px", height:'50px', lineHeight:'150%'}}>
                                        {data.fd_title}
                                    </div>
                                    <div className="project-feed__item__writer-wrap">
                                        <a className="project-feed__item__writer"
                                           onClick={()=>navi(`/profile/${data.ur_num}`)}>
                                            <img className="project-feed__item__writer__image" alt="" style={{display: 'inline-block'}}
                                                 src={`https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/${data.prf_img}`}/>
                                            <span className="project-feed__item__writer__name">{data.prf_nick}</span>
                                        </a>
                                    </div>

                                    {/* 스크랩 수, 조회 수 */}
                                    {/*<footer className="project-feed__item__status">*/}
                                    {/*    <span className="entry" style={{marginRight: '10px'}}>좋아요 {data.fd_likes}</span>*/}
                                    {/*    <span className="entry">조회 {data.fd_rdcnt}</span>*/}
                                    {/*</footer>*/}
                                </article>
                            </div>
                        )
                    }
                </Slider>
            </div>
                <br/><br/><br/>
            <div>
                <h4><strong>👑 이달의 왕 TOP 👑</strong></h4>
                <div style={{display:'flex'}}>
                    <Avatar/><b>판매왕</b><span>램지</span>
                    <Avatar/><b>구매왕</b><span>지나</span>
                    <Avatar/><b>온도왕</b><span>유선</span>
                    <Avatar/><b>관심왕</b><span>재웅</span>
                    <Avatar/><b>좋아왕</b><span>고양이</span>
                </div>
            </div>
            <div>
                <img src={mainad3}/>
                {/*<p className="animation">집이 최고야</p>*/}
                <h2>
                    <span>집</span>
                    <span>이</span>
                    <span>최</span>
                    <span>고</span>
                    <span>야</span>
                </h2>
            </div>
        </div>
    );
}

export default Home;