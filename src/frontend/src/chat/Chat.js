import React, {useState} from 'react';
import '../css/Chat.css';
import ChatRoomList from "./ChatRoomList";
import {useParams} from "react-router-dom";
import ChatMessage from "./ChatMessage";
import ChatMessageList from "./ChatMessageList";

function Chat(props) {
    const [cr_num,setCr_num]=useState(0);
    const ur_num=1;

    const cr_click=(cr_num)=>{
        setCr_num(cr_num);
    }
    //console.log(cr_num);
    return (
        <div className={'main-box'}>
            <div className={'chatroom-list'}>
                <ChatRoomList ur_num={ur_num} cr_click={cr_click}/></div>
            <div id={'chat-message'}>
                {
                    cr_num===0
                        ?
                        <b>채팅할 상대를 선택해주세요</b>
                        :
                        <ChatMessageList cr_num={cr_num} ur_num={ur_num}/>
                }

            </div>
        </div>
    );
}

export default Chat;