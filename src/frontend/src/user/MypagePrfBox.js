import React, {useEffect, useState} from 'react';
import UserTemp from "./UserTemp";
import axios from "axios";
import UserUpdateForm from "./UserUpdateForm";
import UserInfoUpdateForm from "./UserInfoUpdateForm";

function MypagePrfBox(props) {
    const {user,isprf}=props;
    const [uinfo,setUinfo]=useState({});
    const [open, setOpen] = React.useState(false);
    const [sellerking,setSellerking]=useState([]);
    const [buyerking,setBuyerking]=useState([]);
    const [tempking,setTempking]=useState([]);
    const [bookmarkking,setBookmarkking]=useState([]);
    const [likeking,setLikeking]=useState([]);
    const ur_num=sessionStorage.ur_num;
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";
    const getUInfo=()=>{
        //console.log("u_num:"+u_numfromurl);
        let uinfoUrl=localStorage.url+"/chat/u_info?u_num="+user;
        axios.get(uinfoUrl).then(res=>{
            setUinfo(res.data);
        })
    }

    const dialogClose = (prf_nick,prf_img,ischangeprf) => {
        setOpen(false);
        if(ischangeprf){
            sessionStorage.prf_nick=prf_nick;
            if (prf_img==="no"){
                return;
            }
            sessionStorage.prf_img=prf_img;
            window.location.reload();
        }
    };
    const updateinfo=()=>{
        setOpen(true);
    }
    const searchking=()=>{
        let searchkingurl=localStorage.url+"/searchking";
        axios.get(searchkingurl).then(res=>{
            setSellerking(res.data.sellerking);
            setBuyerking(res.data.buyerking);
            setTempking(res.data.tempking);
            setBookmarkking(res.data.bookmarkking);
            setLikeking(res.data.likeking);
            //console.log(res.data);
        });
    }
    useEffect(()=>{
        getUInfo();
        searchking();

    },[]);
    return (
        <div className={'mypage_prf_img_nick_tmp'}>
            <div className={'mypage_prf_img_box'}>
                <img src={prfUrl+uinfo.prf_img} className={'mypage_prf_img'}/>
            </div>
            <div className={'dialogClose'}>
            <div className={'mypage_prf_nick_tmp'} >
                <div className={'mypage_prf_nick'}>{uinfo.prf_nick}님</div>
                <UserTemp prf_tmp={uinfo.prf_tmp}/>
                
            </div>
            <div className={'stamp_box'}>
                {sellerking.map((king,i)=>
                    <div key={i}>{
                    king===Number(user)?<div className={'stamp1'} >
                        <div><div className={'stamp_txt'}>판매왕</div></div></div>:<></>}</div>) }
                {buyerking.map((king,i)=>
                    <div key={i}>{
                    king===Number(user)?<div className={'stamp2'} key={i}>
                        <div className={'stamp_txt'}>구매왕</div></div>:<></>}</div>)}
                {tempking.map((king,i)=>
                    <div key={i}>{
                    king===Number(user)?<div className={'stamp3'} key={i}>
                        <div className={'stamp_txt'}>온도왕</div></div>:<></>}</div>)}
                {bookmarkking.map((king,i)=>
                    <div key={i}>{
                    king===Number(user)?<div className={'stamp4'} key={i}>
                        <div className={'stamp_txt'}>북마크왕</div></div>:<></>}</div>)}
                {likeking.map((king,i)=>
                    <div key={i}>{
                    king===Number(user)?<div className={'stamp5'} key={i}>
                        <div className={'stamp_txt'}>좋아요왕</div></div>:<></>}</div>)}
            </div>
            </div>

            {
                ur_num===user?
                    <button className={'mypage_btn_shape mypage_btn_prf'}
                        onClick={updateinfo}
                    >
                        {isprf===0? "나의 정보 " :"프로필 "}
                        수정하기</button>:""
            }
            {isprf===1?
            <UserUpdateForm open={open} dialogClose={dialogClose} uinfo={uinfo} />
            :
            <UserInfoUpdateForm open={open} dialogClose={dialogClose} uinfo={uinfo}/>}
        </div>
    );
}

export default MypagePrfBox;