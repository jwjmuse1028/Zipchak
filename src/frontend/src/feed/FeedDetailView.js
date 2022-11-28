import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "../css/FeedDetail.css";
import {Viewer} from "@toast-ui/react-editor";
import FeedDetailCmt from "./FeedDetailCmt";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Menu, MenuItem} from "@mui/material";
import {BuildOutlined, DeleteOutline, MoreVert} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function FeedDetailView(props) {
    const {fd_num}=useParams();
    const navi=useNavigate();
    const [fdata,setFdata]=useState('');
    const [ur_num,setUr_num]=useState(0);


    const imgUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2";
    console.log("ur_num:"+ur_num);
    console.log("chk_like:"+fdata.chk_like);

    const getFeedDetail=()=>{
        //set 함수도 비동기라서 처음에 안됨
        if(sessionStorage.ur_num) {
            setUr_num(parseInt(sessionStorage.ur_num));
        }
        const detailUrl=localStorage.url+"/feed/detail?fd_num="+fd_num+"&ur_num="+ur_num;
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

    const insertLike=()=>{

        if(ur_num==0)
        {
            alert("로그인 후 이용해주세요");
            return;
        }
        const likeUrl=localStorage.url+"/feed/like?fd_num="+fd_num+"&ur_num="+ur_num;

        console.log("likeUrl:"+likeUrl);
        axios.get(likeUrl)
            .then(res=>{
                console.log("like됨");
                getFeedDetail();
            })
    }
    const deleteLike=()=>{

        if(ur_num==0)
        {
            alert("로그인 후 이용해주세요");
            return;
        }
        const likedelUrl=localStorage.url+"/feed/likedel?fd_num="+fd_num+"&ur_num="+ur_num;

        console.log("likedelUrl:"+likedelUrl);
        axios.get(likedelUrl)
            .then(res=>{
                console.log("like 삭제됨");
                getFeedDetail();
            })
    }
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                                    <div>
                                        {fdata.chk_like==1?
                                            <button className="likebtn" onClick={deleteLike}>
                                                <FavoriteIcon/>&nbsp;{fdata.fd_likes}
                                            </button>
                                        :
                                            <button className="likebtn" onClick={insertLike}>
                                                <FavoriteBorderIcon/>&nbsp;{fdata.fd_likes}
                                            </button>}
                                    </div>
                                </div>
                                {fdata.dto.ur_num==ur_num &&
                                    <div>
                                        <IconButton style={{float: "right"}}
                                                    aria-label="more"
                                                    aria-controls="long-menu"
                                                    aria-haspopup="true"
                                                    onClick={handleClick}>
                                            <MoreVert/>
                                        </IconButton>
                                        <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}>
                                            <MenuItem className={"btncls"} style={{color:'rgba(65, 65, 65, 0.8)'}}
                                                      onClick={()=>{navi(`/feed/update/${fdata.dto.fd_num}`);}}>
                                                <EditOutlinedIcon style={{fontSize:'18px'}}/>&nbsp;수정하기
                                            </MenuItem>
                                            <MenuItem className={"btncls"} style={{color:'rgba(255, 84, 84, 0.9)'}}>
                                                <DeleteOutline style={{fontSize:'18px'}}/>&nbsp;삭제하기
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                }

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
                                        <Viewer
                                        initialValue={fdata.dto.fd_txt}/>
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