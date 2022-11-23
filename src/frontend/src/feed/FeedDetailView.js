import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "../css/FeedDetail.css";
import FeedDetailCmt from "./FeedDetailCmt";

function FeedDetailView(props) {
    const {fd_num}=useParams();
    const navi=useNavigate();
    const [fdata,setFdata]=useState('');

    const imgUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2";

    const getFeedDetail=()=>{
        const detailUrl=localStorage.url+"/feed/detail?fd_num="+fd_num;
        console.log("detailUrl:"+detailUrl);

        axios.get(detailUrl)
            .then(res=>{
                console.log("success");
                setFdata(res.data);
            })
    }

    useEffect(()=>{
        getFeedDetail();
    },[]);


    return (
        <div>

            { fdata &&
            <div className="content-detail">
                <div className="css-o6xhe7 e1tspjql5">
                    <div className="css-1y5ijfs e1tspjql4">
                        <div className="css-jduq9v e1tspjql3"></div>
                    </div>

                    <div className={"cover_img"} style={{backgroundImage:`url(${imgUrl}/fd_img/${fd_num}/${fdata.dto.fd_img})`}}>
                    </div>
                    </div>
                <div className="content-detail-content-section">
                    <div className="content-detail-content-section__content">
                        <header className="content-detail-header">
                            <div className="content-detail-header__top"><p
                                className="content-detail-header__category">인테리어 구경하기</p></div>
                            <h1 className="content-detail-header__title">{fdata.dto.fd_title}</h1>
                            <div className="content-detail-header__bottom">
                                <a className="content-detail-header__author" href="/users/8830844">
                                <div className="content-detail-header__author-image">
                                    <img className="image" alt="" src={`${imgUrl}/prf_img/${fdata.prf_map.prf_img}`}/>
                                </div>
                                <div className="content-detail-header__author-name">{fdata.prf_map.prf_nick}</div>
                                <div className="content-detail-header__author-date">{fdata.dto.fd_wdate}</div>
                            </a>
                            </div>
                        </header>
                        <section className="project-detail-metadata">
                            <dl className="project-detail-metadata-overview">
                                <div className="project-detail-metadata-overview-item">
                                    <dt className="project-detail-metadata-detail-item">공간</dt>
                                    <dd className="project-detail-metadata-overview-item__text">{fdata.dto.fd_lvtp}</dd>
                                </div>
                                <div className="project-detail-metadata-overview-item">
                                    <dt className="project-detail-metadata-detail-item">평수</dt>
                                    <dd className="project-detail-metadata-overview-item__text">{fdata.dto.fd_spc}</dd>
                                </div>
                                <div className="project-detail-metadata-overview-item">
                                    <dt className="project-detail-metadata-detail-item">가족형태</dt>
                                    <dd className="project-detail-metadata-overview-item__text">{fdata.dto.fd_fml}</dd>
                                </div>
                                <div className="project-detail-metadata-overview-item">
                                    <dt className="project-detail-metadata-detail-item">스타일</dt>
                                    <dd className="project-detail-metadata-overview-item__text">{fdata.dto.fd_style}</dd>
                                </div>
                            </dl>
                        </section>
                        <div className="bpd-view project-detail__content-bpd">
                            <div className="project-detail-image-block only-image">
                                <div className="_33oVJ project-detail-image-block__overlay">
                                    {fdata.dto.fd_txt}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }  {/* fdata&& 끝 */}

            {/* cmt 부분 */}
                <FeedDetailCmt fd_num={fd_num}/>

        </div>
    );
}

export default FeedDetailView;