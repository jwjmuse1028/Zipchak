import React, {useEffect, useState} from 'react';
import UserTemp from "./UserTemp";
import {useParams} from "react-router-dom";
import axios from "axios";

function MypagePrfBox(props) {
    const {user}=props;
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
        <div>
            <div className={'mypage_prf_img_box'}>
                <img src={prfUrl+uinfo.prf_img} className={'mypage_prf_img'}/>
            </div>
            <div className={'mypage_prf_nick_tmp'} >
                <div className={'mypage_prf_nick'}>{uinfo.prf_nick}님</div>
                <UserTemp prf_tmp={uinfo.prf_tmp}/>
            </div>
        </div>
    );
}

export default MypagePrfBox;