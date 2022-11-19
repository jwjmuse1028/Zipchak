import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ReviewNotification(props) {
    const ur_num=sessionStorage.ur_num;
    const nick=sessionStorage.prf_nick;
    const [reviewCnt,setReviewCnt]=useState(0);
    const navi=useNavigate();

    const checkrv=()=>{
        if(ur_num!=null){
            let checkrvUrl=localStorage.url+"/checkrv?ur_num="+ur_num;
            axios.get(checkrvUrl).then(res=>{
                //console.log(res.data)
                setReviewCnt(res.data);
            })
        }
    }
    const notify = () => toast.info( nick+'님, '+reviewCnt+'개 상품의 구매 후기를 남겨주세요!', {
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
        navi('/mypage');
    }
    useEffect(()=>checkrv(),[]);
    useEffect(()=>{
        if(reviewCnt!==0){
            notify();
        }},[reviewCnt]);
    return (
        <div>
            <ToastContainer theme="colored"/>
        </div>
    );
}

export default ReviewNotification;