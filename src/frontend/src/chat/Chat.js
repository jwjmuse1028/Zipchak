import React, {useEffect, useState} from 'react';
import '../css/Chat.css';
import ChatRoomList from "./ChatRoomList";
import {useParams} from "react-router-dom";
import ChatMessage from "./ChatMessage";
import ChatMessageList from "./ChatMessageList";
import axios from "axios";

function Chat(props) {
    const [cr_num,setCr_num]=useState(0);
    const [chatList, setChatList] = useState([]);
    const ur_num=sessionStorage.ur_num;
    const cr_click=(cr_num)=>{
        setCr_num(cr_num);
    }
    //중고 페이지 생성 시 위치 이동 필요
    let sp_num=1;
    const createRoom=()=>{
        let createRoomURL=localStorage.url+"/chat/create?buyer_num="+ur_num+"&sp_num="+sp_num;
        axios.get(createRoomURL).then(res=>{
            alert(res.data);
            window.location.replace("/chat");
        }
        )
    }
    /////////////////////////////////////////////////////////////////////////////////

    //console.log(cr_num);
    return (
        <div className={'main-box'}>
            <div className={'chatroom-list'}>
                <div>
                    <button onClick={()=>{
                        createRoom();
                        }} >채팅 만들기</button><br/>
                    {/*
                    <button onClick={()=>{
                        sessionStorage.ur_num=1}} >session1</button>
                    <button onClick={()=>{
                        sessionStorage.ur_num=2}} >session2</button>
                    <button onClick={()=>{
                        sessionStorage.ur_num=3}} >session3</button>
                        */}
                </div>
                <ChatRoomList ur_num={ur_num} cr_click={cr_click} /></div>
            <div id={'chat-message'}>
                {
                    cr_num==0
                        ?
                        <b>채팅할 상대를 선택해주세요</b>
                        :
                        <ChatMessageList cr_num={cr_num} ur_num={ur_num} chatList={chatList} />
                }

            </div>
        </div>
    );
}

export default Chat;