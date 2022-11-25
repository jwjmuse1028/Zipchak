import React, {useEffect, useState} from 'react';
import UserTemp from "./UserTemp";
import axios from "axios";
import UserUpdateForm from "./UserUpdateForm";
import UserInfoUpdateForm from "./UserInfoUpdateForm";

function MypagePrfBox(props) {
    const {user,isprf}=props;
    const [uinfo,setUinfo]=useState({});
    const [open, setOpen] = React.useState(false);
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
            // window.location.reload();
        }
    };
    const updateinfo=()=>{
        setOpen(true);
    }
    useEffect(()=>getUInfo());
    return (
        <div className={'mypage_prf_img_nick_tmp'}>
            <div className={'mypage_prf_img_box'}>
                <img src={prfUrl+uinfo.prf_img} className={'mypage_prf_img'}/>
            </div>
            <div className={'mypage_prf_nick_tmp'} >
                <div className={'mypage_prf_nick'}>{uinfo.prf_nick}님</div>
                <UserTemp prf_tmp={uinfo.prf_tmp}/>
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