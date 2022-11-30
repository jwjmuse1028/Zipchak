import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";

function MyPageSellList(props) {
    const {user}=props;
    const [selllist,setSelllist]=useState([]);
    const [togglestatus,setTogglestatus]=useState(false);
    const [cnt,setCnt]=useState(0);
    const spURL='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/';
    const navi=useNavigate();
    const [resize, setResize] = useState();
    const spinfoClick=(item)=>{
        navi(`/shop/detail/${item.pd_num}/${item.sp_num}/1`);
    }
    const getselllist=()=>{
        let getselllisturl=localStorage.url+"/getselllist?ur_num="+Number(user);
        axios.get(getselllisturl).then(res=>{
            setSelllist(res.data);
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
    }, [user]);
    useEffect(()=>getselllist(),[user]);
    return (
        <div>
            <div className={'mypage_title'}  onClick={clicktoggle}>판매상품 ({cnt}) {
                togglestatus?<ArrowDropUp/>:<ArrowDropDown/>} </div>
            <ul className={'mypage_ul_card'} >
            {selllist.map((item,i)=>
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

export default MyPageSellList;