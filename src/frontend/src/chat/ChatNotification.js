import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Slide, Zoom, Flip, Bounce} from 'react-toastify';

function ChatNotification(props) {
    const ur_num=sessionStorage.ur_num;
    const nick=sessionStorage.prf_nick;
    const [msgCnt,setMsgCnt]=useState(0);
    const navi=useNavigate();

    const getMsgCntNoti=()=>{
        if(ur_num!=null){
            let getMsgCntNotiUrl=localStorage.url+"/chat/cntnoti?ur_num="+ur_num;
            axios.get(getMsgCntNotiUrl).then(res=>{
                setMsgCnt(res.data);
            })
        }
    }
    const notify = () => toast.info( nick+'님, 읽지 않은 '+msgCnt+'개의 메시지가 있습니다', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClick:toastclick
    });
    const toastclick=()=>{
        navi('/chat/0');
    }
    useEffect(()=>getMsgCntNoti(),[]);
    useEffect(()=>{
        if(msgCnt!==0 && ur_num!=null){
            notify();
        }},[msgCnt]);
    return (
        <></>
         //<ToastContainer theme="colored" transition={Bounce}/>
    );
}

export default ChatNotification;