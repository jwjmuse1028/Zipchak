import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import "../css/ShopDetail.css";
import {Avatar, Fab, Menu, MenuItem} from "@mui/material";
import IconButton from "@material-ui/core/IconButton";
import {
    BookmarkBorder,
    BuildOutlined,
    Chat,
    CheckCircle,
    DeleteOutline,
    MoreVert
} from "@material-ui/icons";

function ShopDetail(props) {
    const {pd_num,sp_num,currentPage}=useParams();
    // console.log("피디넘"+pd_num);
    const [detail,setDetail]=useState('');
    const navi=useNavigate();
    const ur_num=Number(sessionStorage.ur_num);
    // const numberFormat=(inputNumber) =>{
    //     return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }

    const onDetailData=()=>{
        let url=sessionStorage.url+"/shop/detail?sp_num="+sp_num;
        axios.get(url)
            .then(res=>{
                setDetail(res.data);
            })
    }


    const deleteShop=()=>{
        const deleteUrl=sessionStorage.url+"/shop/delete?pd_num="+pd_num;
        if (window.confirm("게시물을 삭제하시겠습니까?")) {
            axios.delete(deleteUrl)
                .then(res=>{
                    alert("삭제 되었습니다");
                    navi(`/shop/list/${currentPage}`);
                })
        } else {
            return;
        }
    }

    const updateSoldOut=()=> {
        let url = sessionStorage.url + "/shop/soldout?pd_num=" + pd_num;
        if (window.confirm("판매완료 등록을 하시겠습니까? 등록 후에는 수정 할 수 없습니다")) {
            axios.post(url)
                .then(res => {
                    alert("판매완료 등록되었습니다");
                    window.location.reload();
                })
        } else {
            return;
        }
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
    //채팅방생성
    const createRoom=()=>{
        let createRoomURL=localStorage.url+"/chat/create?buyer_num="+ur_num+"&sp_num="+sp_num;
        axios.get(createRoomURL).then(res=>{
                alert(res.data.msg);
                navi("/chat");
            }
        )
    }
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
                            <img alt={''} src={photo} width={'100%'}  style={{borderRadius:'30px',filter:detail.pd_status=="soldout"?'brightness(30%)':''}}/>

                        </div>)
                }
            </Slider>
            {
                detail.pd_status=="soldout"?
                    <p className={'soldouttxtdetail'}>판매완료</p>:''
            }
            <br/>
                <Avatar src={detail.prf_img}/>
                <b>{detail.prf_nick}&nbsp;({detail.ur_id})</b>
                <span style={{float:"right"}}>{detail.prf_tmp}℃</span>
                <hr/>
                <div className={'input-group'}>
                <IconButton color={"primary"}>
                    <BookmarkBorder fontSize={"large"}/>
                </IconButton>
                <b style={{fontSize:'2.2em'}}>{detail.sp_title}</b>
                </div>
            <span style={{color:"gray"}}>{detail.pd_ctg}·{detail.sp_wdate}</span>
            {
                sessionStorage.ur_id === detail.ur_id?
                    <IconButton style={{float: "right"}}
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                    >
                        <MoreVert/>
                    </IconButton> : ''
            }
                <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem onClick={()=>{navi(`/shop/update/${pd_num}/${sp_num}/${currentPage}`);}}><BuildOutlined/>&nbsp;수정하기</MenuItem>
                <MenuItem onClick={deleteShop}><DeleteOutline/>&nbsp;삭제하기</MenuItem>
                </Menu>
            <br/><br/>
                <b style={{fontSize:'1.25em'}}>{(detail.pd_price)}원</b><br/><br/>
                <pre style={{fontSize:'1.2em'}}><p>{detail.sp_txt}</p></pre>
                <span>관심{}</span>·<span>채팅{}</span>·<span>조회 {detail.sp_rdcnt}</span><br/><br/>
            {
                sessionStorage.ur_id === detail.ur_id?
                    <Fab color="info" variant="extended" style={{width:'100%'}} onClick={updateSoldOut}>
                        <CheckCircle/>&nbsp;판매완료
                    </Fab>:
                    <Fab color="info" variant="extended" style={{width:'100%'}} onClick={()=>{
                        if (sessionStorage.loginok==null){
                            alert("로그인 후 이용해주세요")
                            return;
                        } else {
                            createRoom();
                        }
                    }
                    }>
                        <Chat/>&nbsp;얘한테 채팅하기
                    </Fab>
            }
        </div>
    );
}

export default ShopDetail;