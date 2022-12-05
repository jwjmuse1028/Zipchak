import React, {useEffect, useState} from 'react';
import ChatNotification from "../chat/ChatNotification";
import ReviewNotification from "../shop/ReviewNotification";
import Slider from "react-slick";
import "../css/Home.css";
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
import KingPrf from "./KingPrf";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, left:'-25px'}}
            onClick={onClick}
        />
    );
}
function Home(props) {

    const [rcfeedlist, setRcfeedlist] = useState([]);
    const navi = useNavigate();
    localStorage.url=process.env.REACT_APP_BACK_URL;
    // console.log(localStorage.url);
    const settings = {
        dots: false,
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
        slidesToScroll: 1,
        initialSlide: 1
    };
    const settings_ctg = {
        arrows: true,
        dots: false,
        lazyLoad: true,
        infinite: true,
        speed: 200,
        slidesToShow: 10,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    const settings_king = {
        arrows: true,
        dots: false,
        lazyLoad: true,
        infinite: true,
        speed: 200,
        slidesToShow: 10,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    const rdcntFeed = ()=>{
        const rdcntUrl = localStorage.url + "/feed/list?order_col=fd_rdcnt";
        axios.get(rdcntUrl)
            .then(res => {
                setRcfeedlist(res.data);
                console.log(res.data);
            })
    }
    let categoryArr=["가구","데코·식물","패브릭","가전·디지털","주방용품","조명","수납·정리",
        "생활용품","생필품","유아·아동","반려동물","실내운동","캠핑용품","공구·DIY"];
    const [sellerkingwinfo,setSellerkingwinfo]=useState([]);
    const [buyerkingwinfo,setBuyerkingwinfo]=useState([]);
    const [tempkingwinfo,setTempkingwinfo]=useState([]);
    const [bookmarkkingwinfo,setBookmarkkingwinfo]=useState([]);
    const [likekingwinfo,setLikekingwinfo]=useState([]);
    const searchkingwinfo=()=>{
        let searchkingwinfourl=localStorage.url+"/searchkingwinfo";
        axios.get(searchkingwinfourl).then(res=>{
            setSellerkingwinfo(res.data.sellerkingwinfo);
            setBuyerkingwinfo(res.data.buyerkingwinfo);
            setTempkingwinfo(res.data.tempkingwinfo);
            setBookmarkkingwinfo(res.data.bookmarkkingwinfo);
            setLikekingwinfo(res.data.likekingwinfo);
            //console.log(res.data);
        });
    }
    useEffect(()=>searchkingwinfo(),[]);
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
                <Slider {...settings_j}>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </Slider>
            </div>
                <br/><br/><br/>
            <div>
                <h4><strong>👑 이달의 왕 TOP 👑</strong></h4>
                <div >
                    <Slider {...settings_king}>
                        <KingPrf uinfo={sellerkingwinfo} />
                    </Slider>
                    <Slider {...settings_king}>
                        <KingPrf uinfo={buyerkingwinfo} />
                    </Slider>
                    <Slider {...settings_king}>
                        <KingPrf uinfo={tempkingwinfo} />
                    </Slider>
                    <Slider {...settings_king}>
                        <KingPrf uinfo={likekingwinfo} />
                    </Slider>
                    <Slider {...settings_king}>
                        <KingPrf uinfo={bookmarkkingwinfo} />
                    </Slider>
                </div>
            </div>
            <br/><br/><br/>
            <div>
                <h4><strong>🔍 카테고리별 상품 찾기 🔍</strong></h4>
                <Slider {...settings_ctg}>
                    {
                        categoryArr.map((ctg,i)=>
                            <figure>
                                <img style={{width:'100px',height:'100px',cursor:'pointer'}}
                                     onClick={()=>navi(`/shop/list?category=${ctg}&currentPage=1`)}
                                     src={require(`../image/${ctg}.png`)} alt={''}/>
                                <figcaption style={{textAlign:"center"}}>{ctg}</figcaption>
                            </figure>)
                    }
                </Slider>
            </div>
            <br/><br/><br/>
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