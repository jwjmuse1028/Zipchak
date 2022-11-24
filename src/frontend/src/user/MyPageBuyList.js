import React, {useEffect, useState} from 'react';
import axios from "axios";
import UpdateTemp from "../shop/UpdateTemp";
import {useNavigate} from "react-router-dom";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";

function MyPageBuyList(props) {
    const ur_num=Number(sessionStorage.ur_num);
    const [buylist,setBuylist]=useState([]);
    const [updateTempOpen,setUpdateTempOpen]=useState(false);
    const [touser,setTouser]=useState(0);
    const [sp_num,setSp_num]=useState(0);
    const [chk,setChk]=useState(0);
    const spURL='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/';
    const navi=useNavigate();
    const [togglestatus,setTogglestatus]=useState(false);
    const [cnt,setCnt]=useState(0);

    const buylistforreview=()=>{
        let buylistforreviewURL=localStorage.url+"/buylistforreview?ur_num="+ur_num;
        axios.get(buylistforreviewURL).then(res=>{
            setBuylist(res.data);
            setCnt(res.data.length);
        })
    }
    const clickEvent=(item)=>{
        //console.log(item.ur_num);
        setTouser(item.ur_num);
        setSp_num(item.sp_num);
        setUpdateTempOpen(true);
    }
    const updatetemprate=(val)=>{
        setUpdateTempOpen(false);
        setChk(val);
    }
    const spinfoClick=(item)=>{
        navi(`/shop/detail/${item.pd_num}/${item.sp_num}/1`);
    }
    const clicktoggle=()=>{
        setTogglestatus(!togglestatus);
    }
    useEffect(()=>buylistforreview(),[ur_num,chk])
    return (
        <div>
            <div className={'mypage_title'}  onClick={clicktoggle}>구매리스트 ({cnt}) {
                togglestatus?<ArrowDropUp/>:<ArrowDropDown/>} </div>
            <ul className={'mypage_ul'} >
                {buylist && buylist.map((item,i)=>
                    <div key={i} className={(i<3)?'card_show':togglestatus?'card_show':'card_hide'}>
                        {ur_num===item.ur_num?"":
                            <li  className={'mypage_li'} >
                                <div style={{display:"flex"}} >
                                    <img alt={''} src={spURL+item.img_name} onClick={()=>spinfoClick(item)}
                                          className={'mypage_sp_img'} />
                                    <div className={'mypage_sp_title'}>{item.sp_title}</div>
                                </div>
                                {
                                    item.fromseller &&
                                    item.fromseller===1 ?
                                        <button className={'mypage_btn_shape mypage_btn_rev'} style={{margin:'auto'}} onClick={()=>clickEvent(item)}>
                                            거래 후기 남기기</button> :
                                        ""
                                }
                            </li>
                        }
                    </div>
                )}
            </ul>
        <UpdateTemp touser={touser} updateTempOpen={updateTempOpen}
                    updatetemprate={updatetemprate} sp_num={sp_num} fromseller={0}/>
        </div>
    );
}

export default MyPageBuyList;