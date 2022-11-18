import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ToastNotification(props) {
    const ur_num=sessionStorage.ur_num;
    const nick=sessionStorage.prf_nick;
    const [msgCnt,setMsgCnt]=useState(0);
    const navi=useNavigate();

    const getMsgNoti=()=>{
        if(ur_num!=null){
            let getMsgNotiUrl=localStorage.url+"/chat/noti?ur_num="+ur_num;
            axios.get(getMsgNotiUrl).then(res=>setMsgCnt(res.data))
        }
    }
    const notify = () => toast.info( nick+'님, 읽지 않은 '+msgCnt+'개의 메시지가 있습니다', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClick:toastclick
    });
    const toastclick=()=>{
        navi('/chat');
    }
    useEffect(()=>getMsgNoti(),[]);
    useEffect(()=>{
        if(msgCnt!==0){
            notify();
        }},[msgCnt]);
    return (
        <div>
            <ToastContainer theme="colored"/>
        </div>
    );
}

export default ToastNotification;