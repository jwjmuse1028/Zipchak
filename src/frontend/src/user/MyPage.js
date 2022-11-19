import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../css/MyPage.css';
import UpdateTemp from "../shop/UpdateTemp";

function MyPage(props) {
    const ur_num=sessionStorage.ur_num;
    const [chatlist,setChatlist]=useState([]);
    const [updateTempOpen,setUpdateTempOpen]=useState(false);
    const spURL='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/';

    const chatlistWithReview=()=>{
        let chatlistWithReviewURL=localStorage.url+"/chatwithrv?ur_num="+ur_num;
        axios.get(chatlistWithReviewURL).then(res=>setChatlist(res.data))
    }
    const clickEvent=(e)=>{
        setUpdateTempOpen(true);
    }
    const updatetemprate=(val)=>{
        setUpdateTempOpen(false);
    }
    useEffect(()=>chatlistWithReview(),[ur_num])
    return (
        <div>
            <h1>마이페이지</h1>
            <div>
                <div>구매 리스트</div>
                <ul className={'mypage_chat_ul'} >
                {
                    chatlist &&
                    chatlist.map((chat,i)=>
                        <li key={i} className={'mypage_chat_li'}>
                            <div style={{display:"flex"}}>
                                <img alt={''} src={spURL+chat.img_name} className={'mypage_sp_img'} />
                                <div className={'mypage_sp_title'}>{chat.sp_title}</div>
                            </div>
                            <UpdateTemp touser={chat.ur_num} updateTempOpen={updateTempOpen} updatetemprate={updatetemprate} sp_num={chat.sp_num}/>
                            {
                            chat.rvcnt &&
                            chat.rvcnt===1 ?
                                <button className={'mypage_btn'} onClick={(e)=>clickEvent(e)}>
                                    거래 후기 남기기</button> :
                                ""
                            }
                        </li>

                    )
                }
                </ul>
            </div>

        </div>
    );
}

export default MyPage;