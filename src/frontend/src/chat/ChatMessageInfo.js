import React, {useEffect, useState} from 'react';
import {ArrowBackRounded} from "@mui/icons-material";
import noprfpic from "../image/noprofilepicture.webp";
import tmp from "../image/tmp.png";
import noimage from "../image/noimg.jpg";
import axios from "axios";
import '../css/ChatMessageInfo.css';
import {useNavigate} from "react-router-dom";

function ChatMessageInfo(props) {
    const {cr_num,screenStatef,uInfo,uTmp}=props;
    const [spInfo,setSpinfo]=useState({});
    const [tmpCol,setTmpCol]=useState('green');
    const [tmpH, setTmpH]=useState('10px');
    const [tmpY,setTmpY]=useState('5px');
    const navi=useNavigate();
    const spURL='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/';

    //상대방 온도 출력
    const getTmpCol=()=>{
        if (uInfo.prf_tmp>80)
        {
            setTmpCol('red');
            setTmpH('35px');
            setTmpY('0px')
        }else if(uInfo.prf_tmp>60) {
            setTmpCol('orange');
            setTmpH('27px');
            setTmpY('0px')
        }else if(uInfo.prf_tmp>40) {
            setTmpCol('gold');
            setTmpH('20px');
            setTmpY('2px')
        }else if(uInfo.prf_tmp>20) {
            setTmpCol('green');
            setTmpH('15px');
            setTmpY('5px')
        }else if(uInfo.prf_tmp>10) {
            setTmpCol('dodgerblue');
            setTmpH('10px');
            setTmpY('5px')
        }else {
            setTmpCol('midnightblue');
            setTmpY('0px')
            setTmpH('0px');
        }
    }
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
    useEffect(()=>{
        getTmpCol();
    },[uTmp])
    return (
        <div className={'msg_list_box_top'}>
            <span className={'to_chat_room'} onClick={()=>screenStatef(1)}
            ><ArrowBackRounded/></span>
            <div className={'uInfoBox'} >
                <div className={'prf_box'}
                     style={{backgroundImage:`url('${uInfo.prf_img}'),url('${noprfpic}')`}}></div>
                <div className={'prf_nick'}>{uInfo.prf_nick}님</div>
                <img alt={''} src={tmp} className={'tmp_img'}/>
                <div className={'tmp_circle'} style={{backgroundColor:tmpCol}}></div>
                <div className={'tmp_rec'} style={{backgroundColor:tmpCol, height:tmpH,top:tmpY}}></div>
                <div className={'prf_tmp'}>{uInfo.prf_tmp}℃</div>
                <div className={'uinfobox_vline'}>  </div>
                <div className={'spinfo_img'} onClick={spinfoClick}
                     style={{backgroundImage:`url('${spURL+spInfo.img_name}'),url('${noimage}')`}}/>
                <div className={'spinfo_title'}>{spInfo.sp_title}</div>
            </div>
        </div>
    );
}

export default React.memo(ChatMessageInfo);