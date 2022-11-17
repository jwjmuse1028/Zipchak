import React, {useEffect, useState} from 'react';
import axios from "axios";
import ziplogo from "../image/ziplogo.png";

function Home(props) {
    localStorage.url=process.env.REACT_APP_BACK_URL;
    console.log(localStorage.url);
    const ur_num=sessionStorage.ur_num;
    const nick=sessionStorage.prf_nick;
    const [msgCnt,setMsgCnt]=useState(0);
    //읽지
    const useNotification = (title, options) => {
        if (!("Notification" in window)) {
            return;
        }
        const fireNotif = () => {
            if (Notification.permission !== "granted") {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {

                        new Notification(title, options);
                    } else {
                        return;
                    }
                });
            } else {
                new Notification(title, options);
            }
        };
        return fireNotif;
    };
    const triggerNotif = useNotification("채팅 알림",{
        body: nick+'님, 읽지 않은 '+msgCnt+'개의 메시지가 있습니다',
        icon: ziplogo
        }
        );
    const getMsgNoti=()=>{
        if(ur_num!=null){
            let getMsgNotiUrl=localStorage.url+"/chat/noti?ur_num="+ur_num;
            axios.get(getMsgNotiUrl).then(res=>setMsgCnt(res.data))
        }
    }
    useEffect(()=>getMsgNoti(),[]);
    useEffect(()=>{
        if(msgCnt!==0){
            triggerNotif(msgCnt);
        }},[msgCnt]);
    return (
        <div>
            <h1>Home</h1>
            <div style={{height:'500px'}}>
                안읽은 메시지는 {msgCnt} 개
            </div>
        </div>
    );
}

export default Home;