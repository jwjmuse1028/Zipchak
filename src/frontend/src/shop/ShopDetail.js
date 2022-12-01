import React, {useEffect, useState} from 'react';
import BuyerList from "./BuyerList";
import UserTemp from "../user/UserTemp";
import {useNavigate, useParams} from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "../css/ShopDetail.css";
import {Avatar, Button, Fab, Menu, MenuItem} from "@mui/material";
import IconButton from "@material-ui/core/IconButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    Bookmark,
    BookmarkBorder,
    BuildOutlined,
    Chat,
    CheckCircle,
    DeleteOutline,
    MoreVert
} from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import swal from 'sweetalert';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

function ShopDetail(props) {
    const {pd_num,sp_num,currentPage}=useParams();
    // console.log("피디넘"+pd_num);
    const [detail,setDetail]=useState('');
    const navi=useNavigate();
    const ur_num=Number(sessionStorage.ur_num);

    //채팅 수
    const [chatCnt,setChatCnt]=useState(0);

    //함수
    //채팅 수 출력
    const getChatCnt=()=>{
        let getChatCntUrl=localStorage.url+"/shop/getchatcnt?sp_num="+sp_num;
        axios.get(getChatCntUrl).
        then(res=>setChatCnt(res.data))
    }

    const numberFormat=(inputNumber) =>{
        return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const onDetailData=()=>{
        let ur_num=sessionStorage.ur_num;
        let url=sessionStorage.url+"/shop/detail?sp_num="+sp_num+"&ur_num="+ur_num;
        axios.get(url)
            .then(res=>{
                setDetail(res.data);
            })
    }

    const deleteShop=()=>{
        const deleteUrl=sessionStorage.url+"/shop/delete?pd_num="+pd_num;
        if (window.confirm("게시물을 삭제하시겠습니까? 복구 할 수 없습니다")) {
            axios.delete(deleteUrl)
                .then(res=>{
                    alert("삭제 되었습니다");
                    navi(`/shop/list/${currentPage}`);
                })
        } else {
            return;
        }
    }
    const [buyerlistOpen, setBuyerlistOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(0);
    //판매완료 클릭시
    const updateSoldOut=()=> {
        if (window.confirm("판매완료 등록을 하시겠습니까? 등록 후 수정 할 수 없습니다"))
        { setBuyerlistOpen(true);}
        else {return;}
        //console.log('shopdetail:'+buyerlistOpen);

    }
    const buyerlistClose = (value) => {
        setBuyerlistOpen(false);
        setSelectedValue(value);
        if(value===0){
            return;
        }
        let url = sessionStorage.url + "/shop/soldout?pd_num=" + pd_num;
        axios.post(url)
            .then(res => {
                swal("판매완료 등록되었습니다");
                window.location.reload();
            })
    };
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
                swal(res.data.msg,{icon:'success',});
                navi(`/chat/${res.data.cr_num}`);
            }
        )
    }
    useEffect(()=>{
        onDetailData();
    },[]);

    const onClickLike = (Transition) => () => {
        let ur_num=sessionStorage.ur_num;
        let url=sessionStorage.url+"/shop/likes?sp_num="+sp_num+"&ur_num="+ur_num;
        if (sessionStorage.loginok==null){
            alert("로그인 후 이용해주세요");
            return;
        }
        axios.get(url)
            .then(res=>{
                setDetail(
                    {
                        ...detail,
                        totallikes: res.data.totallikes,
                        userlike: res.data.userlike
                    }
                    );
                setState({
                    open: true,
                    Transition,
                });
            })
    }
    const [state, setState] = React.useState({
        open: false,
        Transition: Fade,
    });

    const likeClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    useEffect(()=>{
        getChatCnt();
    },[sp_num]);

    return (
        <div style={{margin:"auto", width:'35%', minWidth:'660px'}}>
            <Slider {...settings}>
                {
                    detail.images &&
                    detail.images.map((photo,idx)=>
                        <div key={{idx}} className= "banner">
                            <img alt={''} src={`https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/${photo}`} width={'100%'}  style={{borderRadius:'30px',filter:detail.pd_status==="soldout"?'brightness(30%)':''}}/>
                        </div>)
                }
            </Slider>
            {
                detail.pd_status==="soldout"?
                    <p className={'soldouttxtdetail'}>판매완료</p>:''
            }
            <br/>
            <span className={'detailavt'}>
                <Avatar src={`https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/${detail.prf_img}`} style={{cursor:"pointer"}}
                        onClick={()=>navi(`/profile/${detail.ur_num}`)}/>
                <b>{detail.prf_nick}&nbsp;({detail.ur_id})</b>
            </span>
                <div style={{ position:"relative",left:'85%',top:'-40px'}}>
                    <UserTemp prf_tmp={detail.prf_tmp}/>
                </div>
                <hr style={{width:'100%', marginTop:'0px',position:"relative",top:'-20px'}}/>
                <div className={'input-group'}>
                <IconButton style={{color:'#35c5f0'}} onClick={onClickLike(SlideTransition)}>
                    {
                        // <Bookmark fontSize={"large"}/>
                        detail.userlike===0?<BookmarkBorder fontSize={"large"}/>:<Bookmark fontSize={"large"}/>
                    }
                </IconButton>
                <b style={{fontSize:'2.2em'}}>{detail.sp_title}</b>
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
                </div>
            <span style={{color:"gray"}}>{detail.pd_ctg}·{detail.sp_wdate}</span>


            <Snackbar
                open={state.open}
                onClose={likeClose}
                autoHideDuration={2000}
                TransitionComponent={state.Transition}
                message= {detail.userlike===1?"관심목록에 추가하였습니다":"관심목록에서 삭제하였습니다"}
                key={state.Transition.name}

                action={
                    detail.userlike===1?
                    <React.Fragment>
                        <Button color="info" onClick={()=>{navi("/mypage/2")}}>
                            <b>찜 목록 바로가기</b>
                        </Button>
                    </React.Fragment>:''
                }/>
                <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem onClick={()=>{navi(`/shop/update/${pd_num}/${sp_num}/${currentPage}`);}}><BuildOutlined/>&nbsp;수정하기</MenuItem>
                <MenuItem style={{color:'red'}} onClick={deleteShop}><DeleteOutline/>&nbsp;삭제하기</MenuItem>
                </Menu>
            <br/><br/>
            {
                sessionStorage.ur_id === detail.ur_id?
                    <Fab style={{backgroundColor:detail.pd_status==='soldout'?'#828C94':'#35c5f0', color:"white"}} variant="extended" className={'detailbutton'} onClick={updateSoldOut} disabled={detail.pd_status==="soldout"?true:false}>
                        <CheckCircle/>&nbsp;판매완료
                    </Fab>:
                    <Fab style={{backgroundColor:detail.pd_status==='soldout'?'#828C94':'#35c5f0', color:"white"}} variant="extended" className={'detailbutton'} disabled={detail.pd_status==="soldout"?true:false}
                         onClick={()=>{
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
                <b style={{fontSize:'1.25em'}}>{detail.pd_price?numberFormat(detail.pd_price):''}원</b><br/><br/>
                <pre style={{fontSize:'1.2em'}}><p>{detail.sp_txt}</p></pre>
                <span>관심&nbsp;{detail.totallikes}·채팅&nbsp;{chatCnt}·조회&nbsp;{detail.sp_rdcnt}</span>

            <BuyerList selectedValue={selectedValue} buyerlistOpen={buyerlistOpen} buyerlistClose={buyerlistClose} sp_num={sp_num}/>
        </div>
    );
}

export default ShopDetail;