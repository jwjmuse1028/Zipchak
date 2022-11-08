import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import '../css/Chat.css';

function ChatRoomList(props) {
    const [chatRoom, setChatRoom]=useState([]);
    const {ur_num, cr_click}=props;

    const chatRoomList=()=>{
        let url="http://localhost:9005/chat/list?ur_num="+ur_num;
        axios.get(url).then(res=>{
            setChatRoom(res.data);
        })
    }

    useEffect(()=>{
        chatRoomList();
    },[]);

    return (
        <div >
            {/*나중에 상품명으로 변경하기 */}
            <h1>{}</h1>
            <ul>
                {
                    chatRoom &&
                    chatRoom.map((cr,i)=>
                        //sender 나중에 nickname으로 변경할 것.
                        <li key={i} className={'crlist'} onClick={()=>cr_click(cr.cr_num)}>
                            <div><span>{cr.buyer_num}</span><span className={'cr_wdate'}>{cr.cr_wdate}</span></div>
                            <div>{cr.msg}</div>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default ChatRoomList;