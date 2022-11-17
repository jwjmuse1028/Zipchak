import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "../css/FeedList.css";

function FeedDetailView(props) {
    const {fd_num}=useParams();
    const navi=useNavigate();
    const [fdata,setFdata]=useState('');

    const getFeedDetail=()=>{
        const detailUrl=localStorage.url+"/feed/detail?fd_num="+fd_num;
        console.log("detailUrl:"+detailUrl);

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
            { fdata &&
            <div>
            <h5>{fdata.dto.fd_title}</h5>
            <img style={{width: '300px'}}
                 src={`https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/fd_img/${fd_num}/${fdata.dto.fd_img}`}/>
            {fdata.prf_map.prf_nick}
            <img alt=""  className="project-feed__item__writer__image"
                 src={`https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/${fdata.prf_map.prf_img}`}/>
            </div>
            }
        </div>
    );
}

export default FeedDetailView;