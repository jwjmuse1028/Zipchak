import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";

function MyPageFeedList(props) {
    const {user}=props;
    const [feedlist,setfeedlist]=useState([]);
    const [togglestatus,setTogglestatus]=useState(false);
    const [cnt,setCnt]=useState(0);
    const fdURL='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/fd_img/';
    const navi=useNavigate();

    const fdinfoClick=(item)=>{
        navi(`/feed/detail/${item.fd_num}`);
    }
    const getfeedist=()=>{
        let getfeedlisturl=localStorage.url+"/getfeedlist?ur_num="+Number(user);
        axios.get(getfeedlisturl).then(res=>{
            setfeedlist(res.data);
            setCnt(res.data.length);
        })
    }
    const clicktoggle=()=>{
        setTogglestatus(!togglestatus);
    }
    useEffect(()=>getfeedist(),[user]);
    return (
        <div>
            <h3 className={'mypage_title'}  onClick={clicktoggle}>피드리스트 ({cnt}) {
                togglestatus?<ArrowDropUp/>:<ArrowDropDown/>} </h3>
            <ul className={'mypage_ul_card'} >
                {feedlist.map((item,i)=>
                    <div key={i} className={'mypage_li_card'} style={{display:i<3?'block':togglestatus?'block':'none'}}>
                        <img alt={''} src={fdURL+item.fd_num+"/"+item.fd_img}
                             onClick={()=>fdinfoClick(item)} className={'mypage_sp_img_card'} />
                        <div className={'mypage_fd_title_card'}>{item.fd_title}</div>
                    </div>
                )
                }
            </ul>
        </div>
    );
}

export default MyPageFeedList;