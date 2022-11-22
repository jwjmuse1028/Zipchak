import React, {useEffect, useState} from 'react';
import {ArrowBackRounded} from "@mui/icons-material";
import noprfpic from "../image/noprofilepicture.webp";
import tmp from "../image/tmp.png";
import noimage from "../image/noimg.jpg";
import axios from "axios";
import '../css/ChatMessageInfo.css';
import {useNavigate} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import {blue} from "@material-ui/core/colors";
import UserTemp from "../user/UserTemp";
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});
function ChatMessageInfo(props) {
    const {cr_num,screenStatef,uInfo,uTmp}=props;
    const [spInfo,setSpinfo]=useState({});
    const navi=useNavigate();
    const classes = useStyles();
    const spURL='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/';
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";


    //상품정보 출력
    const getSpInfo=()=>{
        let spinfoUrl=localStorage.url+"/chat/spinfo?cr_num="+cr_num;
        axios.get(spinfoUrl).then(res=>{
            setSpinfo(res.data);
        })
    }
    const spinfoClick=()=>{
        navi(`/shop/detail/${spInfo.pd_num}/${spInfo.sp_num}/1`);
    }
    useEffect(()=>{
        getSpInfo();
    },[cr_num])
    return (
        <div className={'msg_list_box_top'}>
            <span className={'to_chat_room'} onClick={()=>screenStatef(1)}
            ><ArrowBackRounded/></span>
            <div className={'uInfoBox'} >
                <Avatar className={classes.avatar}>
                    <img alt={''} src={prfUrl+uInfo.prf_img} className={'MuiAvatar-img css-1pqm26d-MuiAvatar-img'}/>
                </Avatar>
                <div className={'prf_nick'}>{uInfo.prf_nick}님</div>
                <UserTemp prf_tmp={uInfo.prf_tmp}/>
                <div className={'uinfobox_vline'}>  </div>
                <div className={'spinfo_img'} onClick={spinfoClick}
                     style={{backgroundImage:`url('${spURL+spInfo.img_name}'),url('${noimage}')`}}/>
                <div className={'spinfo_title'}>{spInfo.sp_title}</div>
            </div>
        </div>
    );
}

export default React.memo(ChatMessageInfo);