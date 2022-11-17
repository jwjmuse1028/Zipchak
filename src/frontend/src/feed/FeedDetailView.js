import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function FeedDetailView(props) {
    const {fd_num}=useParams();
    const navi=useNavigate();
    const [fdata,setFdata]=useState('');

    const detailUrl=localStorage.url+"/feed/detail?fd_num="+fd_num;
    console.log("detailUrl:"+detailUrl);
    const getFeedDetail=()=>{
        axios.get(detailUrl)
            .then(res=>{
                console.log("success");
                setFdata(res.data);
            })
    }

    useEffect(()=>{
        getFeedDetail();
    },[]);


    return (
        <div>
            {/*<h5>{fdata.dto.fd_title}</h5>*/}
            <img style={{width: '300px'}} src={`https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/fd_img/${fdata.dto.fd_num}/${fdata.dto.fd_img}`}/>
            {fdata.prf_map.prf_nick}
            <img alt="" style={{width: '300px'}}
                 src={`https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/${fdata.prf_map.prf_img}`}/>
        </div>
    );
}

export default FeedDetailView;