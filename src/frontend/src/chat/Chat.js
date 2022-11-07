import React, {useState} from 'react';
import '../css/Chat.css';
import ChatRoom from "./ChatRoom";
import {useParams} from "react-router-dom";
import ChatMessage from "./ChatMessage";

function Chat(props) {
    const [cr_num,setCr_num]=useState(0);
    const {ur_num}=useParams();
    const cr_click=(cr_num)=>{
        setCr_num(cr_num);
    }
    console.log(cr_num);
    return (

        <div className={'main-box'}>
            <div className={'chatroom-list'}>
                <ChatRoom ur_num={ur_num} cr_click={cr_click}/></div>
            <div id={'chat-message'}>
                {
                    cr_num===0
                        ?
                        <b>채팅할 상대를 선택해주세요</b>
                        :
                        <ChatMessage cr_num={cr_num} ur_num={ur_num}/>
                }

            </div>
        </div>
    );
}

export default Chat;