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
                style={{ ...style, right:'-5%'}}
                onClick={onClick}
            />
        );
    }

    function BestfdPrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, left:'-5%'}}
                onClick={onClick}
            />
        );
    }

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
                {/*<div>*/}
                {/*    <section className={'hmbx home_box'}>*/}
                {/*        <div className={'maintxt'}>*/}
                {/*            <h1><strong>✨예쁜 방에서 나혼자 산다!</strong></h1>*/}
                {/*            <h1>나만의 공간, 나만의 색으로🎨</h1><br/>*/}
                {/*            <span>집착 집들이로</span><br/>*/}
                {/*            <span>당신을 초대합니다:)</span>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <img src={MainSlide1} style={{width:'100%'}}/>*/}
                {/*        </div>*/}
                {/*    </section>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <section className={'hmbx home_box2'}>*/}
                {/*        <div className={'maintxt'}>*/}
                {/*            <h1><strong>🏠집들이와 함께하는 중고 스토어</strong></h1>*/}
                {/*            <h1>집착으로 인테리어 소품 사고팔자💸</h1><br/>*/}
                {/*            <span>인테리어 소품 중고 스토어</span><br/>*/}
                {/*            <span>집착에서 만나요</span>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <img src={mainad} style={{width:'650px'}}/>*/}
                {/*        </div>*/}
                {/*    </section>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <section className={'hmbx home_box3'}>*/}
                {/*        <div className={'maintxt'}>*/}
                {/*            <h1><strong>이제 곧 크리스마스🎄</strong></h1>*/}
                {/*            <h1>🎅산타도 놀랄 나만의 인테리어</h1><br/>*/}
                {/*            <span>사실 산타는 없어요</span><br/>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <img src={christmas} style={{width:'400px', marginLeft:'10%'}}/>*/}
                {/*        </div>*/}
                {/*    </section>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <section className={'hmbx home_box4'}>*/}
                {/*        <div className={'maintxt'}>*/}
                {/*            <h1><strong>📲집톡으로 바로바로</strong></h1>*/}
                {/*            <h1>판매자와 채팅하기👌🏻</h1><br/>*/}
                {/*            <span>매너있는 챗으로</span><br/>*/}
                {/*            <span>거래까지 성공하자-</span><br/>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <img src={chat} style={{width:'50%'}}/>*/}
                {/*        </div>*/}
                {/*    </section>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <section className={'hmbx home_box5'}>*/}
                {/*        <div className={'maintxt'}>*/}
                {/*            <h1><strong>집착 온도 시스템으로🌡️</strong></h1>*/}
                {/*            <h1>🤝믿을수 있는 중고거래</h1><br/>*/}
                {/*            <span>뜨거울수록</span><br/>*/}
                {/*            <span>믿음직한 판매자</span><br/>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <img src={friends} style={{width:'50%', margin:'auto'}}/>*/}
                {/*        </div>*/}
                {/*    </section>*/}
                {/*</div>*/}
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
                <br/><br/>
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