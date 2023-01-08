import React, {useEffect, useState} from 'react';
import ChatNotification from "../chat/ChatNotification";
import ReviewNotification from "../shop/ReviewNotification";
import Slider from "react-slick";
import "../css/Home.css";
import "../css/FeedList.css";
import MainSlide1 from "../image/MainSlide1.png";
import MainSlide2 from "../image/MainSlide2.png";
import MainSlide3 from "../image/MainSlide3.png";
import MainSlide4 from "../image/MainSlide4.png";
import MainSlide5 from "../image/MainSlide5.png";
import mainad3 from "../image/mainad3.jpg";
import {Avatar} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import KingPrf from "./KingPrf";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style , right:'-25px'}}
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
function KingNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style , right:'12px'}}
            onClick={onClick}
        />
    );
}

function KingPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, left:'5px'}}
            onClick={onClick}
        />
    );
}
function Home(props) {
    const navi = useNavigate();
    const [bestfdlist, setBestfdlist] = useState([]);
    localStorage.url=process.env.REACT_APP_BACK_URL;
    // console.log(localStorage.url);

    function BestfdNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, right:'-3%'}}
                onClick={onClick}
            />
        );
    }

    function BestfdPrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, left:'-3%'}}
                onClick={onClick}
            />
        );
    }

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
        slidesToScroll: 2,
        initialSlide: 0,
        nextArrow: <BestfdNextArrow />,
        prevArrow: <BestfdPrevArrow />

    };
    const settings_ctg = {
        arrows: true,
        dots: false,
        lazyLoad: true,
        infinite: true,
        speed: 200,
        slidesToShow: 10,
        slidesToScroll: 3,
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
        autoplay:1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <KingNextArrow />,
        prevArrow: <KingPrevArrow />,
    };

    const bestFeed = ()=>{
        const bestfdUrl = localStorage.url + "/feed/bestfd";
        axios.get(bestfdUrl)
            .then(res => {
                setBestfdlist(res.data);
                console.log(res.data);
            })
    }
    let categoryArr=["가구","데코·식물","패브릭","가전·디지털","주방용품","조명","수납·정리",
        "생활용품","생필품","유아·아동","반려동물","실내운동","캠핑용품","공구·DIY"];
    const [sellerkingwinfo,setSellerkingwinfo]=useState([{}]);
    const [buyerkingwinfo,setBuyerkingwinfo]=useState([{}]);
    const [tempkingwinfo,setTempkingwinfo]=useState([{}]);
    const [bookmarkkingwinfo,setBookmarkkingwinfo]=useState([{}]);
    const [likekingwinfo,setLikekingwinfo]=useState([{}]);
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
        <div className={"list_container"}>
            <ChatNotification/>
            <ReviewNotification/>
            <Slider {...settings}>
                <div>
                    <section className={'MainSlide'}>
                        <div style={{padding:'0 20px'}}>
                            <img src={MainSlide1}/>
                        </div>
                    </section>
                </div>
                <div>
                    <section className={'MainSlide'}>
                        <div>
                            <img src={MainSlide2}/>
                        </div>
                    </section>
                </div>
                <div>
                    <section className={'MainSlide'}>
                        <div>
                            <img src={MainSlide3}/>
                        </div>
                    </section>
                </div>
                <div>
                    <section className={'MainSlide'}>
                        <div>
                            <img src={MainSlide4}/>
                        </div>
                    </section>
                </div>
                <div>
                    <section className={'MainSlide'}>
                        <div>
                            <img src={MainSlide5}/>
                        </div>
                    </section>
                </div>
            </Slider>
            <br/><br/><br/>
            <div>
                <h4><strong>🔍 카테고리별 상품 찾기 🔍</strong></h4>
                <Slider {...settings_ctg}>
                    {
                        categoryArr&&
                        categoryArr.map((ctg,i)=>
                            <figure>
                                <img style={{width:'100px',height:'100px',cursor:'pointer',margin:"auto"}}
                                     onClick={()=>navi(`/shop/list?category=${ctg}&currentPage=1`)}
                                     src={require(`../image/${ctg}.png`)} alt={''}/>
                                <figcaption style={{textAlign:"center"}}>{ctg}</figcaption>
                            </figure>
                        )
                    }
                </Slider>
            </div>
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
                                           onClick={()=>navi(`/profile/${data.ur_num}/1`)}>
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
                <br/>
            <div>
                <h4><strong>👑 집착 어워드 👑</strong></h4>
                <div style={{display:'flex'}}>
                    <div className={'kings'}>
                        <div className={'kingtitle'}>판매왕</div>
                    <Slider {...settings_king}>
                        {
                            sellerkingwinfo &&
                            sellerkingwinfo.map((uinfo,i)=>
                                <KingPrf key={i }uinfo={uinfo} />)
                        }
                    </Slider>
                    </div>
                    <div className={'kings'}>
                        <div className={'kingtitle'}>구매왕</div>
                    <Slider {...settings_king}>
                        {
                            buyerkingwinfo &&
                            buyerkingwinfo.map((uinfo,i)=>
                                <KingPrf key={i }uinfo={uinfo} />)
                        }
                    </Slider>
                    </div>
                    <div className={'kings'}>
                        <div className={'kingtitle'}>온도왕</div>
                    <Slider {...settings_king}>
                        {
                            tempkingwinfo &&
                            tempkingwinfo.map((uinfo,i)=>
                                <KingPrf key={i }uinfo={uinfo} />)
                        }
                    </Slider>
                    </div>
                    <div className={'kings'}>
                        <div className={'kingtitle'}>북마크왕</div>
                    <Slider {...settings_king}>
                        {
                            bookmarkkingwinfo &&
                            bookmarkkingwinfo.map((uinfo,i)=>
                                <KingPrf key={i }uinfo={uinfo} />)
                        }
                    </Slider>
                    </div>
                    <div className={'kings'}>
                        <div className={'kingtitle'}>좋아요왕</div>
                        <Slider {...settings_king}>
                            {
                                likekingwinfo &&
                                likekingwinfo.map((uinfo,i)=>
                                    <KingPrf key={i }uinfo={uinfo} />)
                            }
                        </Slider>
                    </div>
                </div>
            </div>
            <br/><br/><br/>

            <div style={{textAlign:"center", position:"relative"}}>
                <img src={mainad3} style={{width:'50%'}}/>
                {/*<p className="animation">집이 최고야</p>*/}
                <h2 className={'homebest'}>
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