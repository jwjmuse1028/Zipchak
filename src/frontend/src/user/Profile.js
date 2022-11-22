import React, {useEffect, useState} from 'react';
import ProfileGetRvList from "./ProfileGetRvList";
import {useParams} from "react-router-dom";
import axios from "axios";
import {BookmarkBorder} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

function Profile(props) {
    const {user}=useParams();
    const [uinfo,setUinfo]=useState({});
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";
    const getUInfo=()=>{
        //console.log("u_num:"+u_numfromurl);
        let uinfoUrl=localStorage.url+"/chat/u_info?u_num="+user;
        axios.get(uinfoUrl).then(res=>{
            setUinfo(res.data);
        })
    }
    useEffect(()=>getUInfo());
    return (
        <div className={'mypage_otr_container'} >
            <h1 style={{textAlign:'center'}}>프로필</h1>
            <div className={'mypage_container'}>
                <div className={'mypage_prf_box'}>
                    <div className={'mypage_prf_img_box'}>
                        <img src={prfUrl+uinfo.prf_img} className={'mypage_prf_img'}/>
                    </div>
                    <div className={'mypage_prf_nick'}>{uinfo.prf_nick}님</div>
                    <hr/>
                    <IconButton >
                        <BookmarkBorder/>
                    </IconButton>
                </div>
                <div>
                    <ProfileGetRvList user={user}/>
                </div>
            </div>
        </div>
    );
}

export default Profile;