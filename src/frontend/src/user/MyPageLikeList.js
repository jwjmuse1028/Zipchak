import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";

function MyPageLikeList(props) {
    const ur_num=sessionStorage.ur_num;
    const [likelist,setlikelist]=useState([]);
    const [togglestatus,setTogglestatus]=useState(false);
    const [cnt,setCnt]=useState(0);
    const fdURL='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/fd_img/';
    const navi=useNavigate();
    const [resize, setResize] = useState();
    const fdinfoClick=(item)=>{
        navi(`/feed/detail/${item.fd_num}`);
    }
    const getlikeist=()=>{
        let getlikelisturl=localStorage.url+"/getlikelist?ur_num="+ur_num;
        axios.get(getlikelisturl).then(res=>{
            setlikelist(res.data);
            setCnt(res.data.length);
        })
    }
    const clicktoggle=()=>{
        setTogglestatus(!togglestatus);
    }
    const handleResize = () => {
        setResize(window.innerWidth);
    };
    useEffect(()=>setResize(window.innerWidth),[])
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [ur_num]);
    useEffect(()=>getlikeist(),[ur_num]);
    return (
        <div>
            <div className={'mypage_title'}  onClick={clicktoggle}>관심 집들이 ({cnt}) {
                togglestatus?<ArrowDropUp/>:<ArrowDropDown/>} </div>
            <ul className={'mypage_ul_card'} >
                {likelist.map((item,i)=>
                    <div key={i} className={((i<(resize<768?2:3))?'card_show':togglestatus?'card_show':'card_hide')+' mypage_li_card'}>
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

export default MyPageLikeList;