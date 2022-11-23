import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";

function MyPageBookmarkList(props) {
    const ur_num=sessionStorage.ur_num;
    const [bookmarklist,setBookmarklist]=useState([]);
    const [togglestatus,setTogglestatus]=useState(false);
    const [cnt,setCnt]=useState(0);
    const spURL='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/';
    const navi=useNavigate();
    const [resize, setResize] = useState();
    const spinfoClick=(item)=>{
        navi(`/shop/detail/${item.pd_num}/${item.sp_num}/1`);
    }
    const getbookmarklist=()=>{
        let getbookmarklisturl=localStorage.url+"/getbookmarklist?ur_num="+ur_num;
        axios.get(getbookmarklisturl).then(res=>{
            setBookmarklist(res.data);
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
    useEffect(()=>getbookmarklist(),[ur_num]);
    return (
        <div>
            <div className={'mypage_title'}  onClick={clicktoggle}>관심상품 ({cnt}) {
                togglestatus?<ArrowDropUp/>:<ArrowDropDown/>} </div>
            <ul className={'mypage_ul_card'} >
                {bookmarklist.map((item,i)=>
                    <div key={i} className={((i<(resize<768?2:3))?'card_show':togglestatus?'card_show':'card_hide')+' mypage_li_card'} >
                        <img alt={''} src={spURL+item.img_name}
                             onClick={()=>spinfoClick(item)} className={'mypage_sp_img_card'} />
                        <div className={'mypage_sp_title_card'}>{item.sp_title}</div>
                        <div className={'mypage_pd_status_card'}>{
                            item.pd_status==='onsale'?'판매중':'판매완료'
                        }</div>
                    </div>
                )
                }
            </ul>
        </div>
    );
}

export default MyPageBookmarkList;