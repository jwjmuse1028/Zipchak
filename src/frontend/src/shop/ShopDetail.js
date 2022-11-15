import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import {Avatar, Button, Fab, Menu, MenuItem} from "@mui/material";
import {BookmarkBorder, Chat, CheckCircle, Delete, MoreVert} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

function ShopDetail(props) {
    const {sp_num,currentPage}=useParams();
    const [detail,setDetail]=useState('');
    const navi=useNavigate();

    const onDetailData=()=>{
        let url=sessionStorage.url+"/shop/detail?sp_num="+sp_num;
        axios.get(url)
            .then(res=>{
                console.log(res.data);
                setDetail(res.data);
            })
    }

    const settings = {
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(()=>{
        onDetailData();
    },[]);

    return (
        <div style={{margin:"auto", width:'35%'}}>

            <Slider {...settings}>
                {
                    detail.images &&
                    detail.images.map((photo,idx)=>
                        <div key={{idx}}>
                            <img alt={''} src={photo} width={'100%'}  style={{borderRadius:'30px'}}/>
                        </div>)
                }
            </Slider>
            <br/>
                <Avatar src={detail.prf_img}/>
                <b>{detail.prf_nick}()</b>
                <span style={{float:"right"}}>{detail.prf_tmp}℃</span>
                <hr/>
                <div className={'input-group'}>
                <IconButton color={"primary"}>
                    <BookmarkBorder fontSize={"large"}/>
                </IconButton>
                <h2><b>{detail.sp_title}</b></h2>

                </div>
            <span style={{color:"gray"}}>{detail.pd_ctg}·{detail.sp_wdate}</span>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVert />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={'#'}>수정하기</MenuItem>
                <MenuItem onClick={'#'}><Delete/>삭제하기</MenuItem>
            </Menu>
            <br/><br/>
                <b style={{fontSize:'1.25em'}}>{detail.pd_price}원</b><br/><br/>
                <pre style={{fontSize:'1.3em'}}><p>{detail.sp_txt}</p></pre>
                <span>관심{}회</span>·<span>채팅{}회</span>·<span>조회 {detail.sp_rdcnt}회</span><br/><br/>
            <Fab color="info" variant="extended" onClick={()=>{
                navi("/chat");
            }}>
                <Chat/>&nbsp;얘한테 채팅하기
            </Fab>
            <Fab color="info" variant="extended">
                <CheckCircle/>&nbsp;판매완료
            </Fab>
        </div>
    );
}

export default ShopDetail;