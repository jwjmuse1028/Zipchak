import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function FeedDetailView(props) {
    const {fd_num}=useParams();
    const navi=useNavigate();
    const [fdata,setFdata]=useState('');

    const detailUrl=localStorage.url+"/feed/detail?num="+fd_num;
    const getFeedDetail=()=>{
        axios.get(detailUrl)
            .then(res=>{
                setFdata(res.data);
            })
    }

    useEffect(()=>{
        getFeedDetail();
    },[]);


    return (
        <div></div>
    );
}

export default FeedDetailView;