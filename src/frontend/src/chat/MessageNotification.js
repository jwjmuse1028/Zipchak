import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function MessageNotification(props) {
    const {cr_num,noti}=props;
    const ur_num=sessionStorage.ur_num;
    const [msgList,setMsgList]=useState([]);
    const navi=useNavigate();

    const getMsgNoti=()=>{
        if(ur_num!=null){
            let getMsgNotiUrl=localStorage.url+"/chat/msgnoti?ur_num="+ur_num;
            axios.get(getMsgNotiUrl).then(res=>setMsgList(res.data))
        }
    }
    //몇 분전 등
    function elapsedTime(date) {
        const start = new Date(date);
        const end = new Date(); // 현재 날짜
        const diff = (end - start); // 경과 시간 구하기

        const times = [
            { time: "분", milliSeconds: 1000 * 60 },
            { time: "시간", milliSeconds: 1000 * 60 * 60 },
            { time: "일", milliSeconds: 1000 * 60 * 60 * 24 },
            { time: "개월", milliSeconds: 1000 * 60 * 60 * 24 * 30 },
            { time: "년", milliSeconds: 1000 * 60 * 60 * 24 * 365 },
        ].reverse();
        for (const value of times) {
            const betweenTime = Math.floor(diff / value.milliSeconds);

            // 큰 단위는 0보다 작은 소수점 값이 나옴
            if (betweenTime > 0) {
                return `${betweenTime}${value.time} 전`;
            }
        }
        // 모든 단위가 맞지 않을 시
        return "방금 전";
        }
    const notify = (msgitem) => toast.info( msgitem.prf_nick+'님이 '+(
        msgitem.msg.startsWith('img-')? '사진을 보냈습니다'
            :
        msgitem.msg.startsWith('map-')?'위치를 보냈습니다'
            :
            msgitem.msg+'" 메시지를 보냈습니다') +'('+elapsedTime(msgitem.cm_wdate)+')', {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId:msgitem.cr_num,
        onClick:()=>toastclick(msgitem.cr_num)
    });
    const toastclick=(from_cr_num)=>{
        window.location.replace(`/chat/${from_cr_num}`);

    }
    useEffect(()=>getMsgNoti(),[cr_num,noti]);
    useEffect(()=>{
        msgList.map((msgitem,i)=>{
            notify(msgitem);
        })
        },[msgList]);
    return (
        <div>
            <ToastContainer theme="colored" />
        </div>
    );
}

export default MessageNotification;