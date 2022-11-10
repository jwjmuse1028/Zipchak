import React, {useEffect, useState} from 'react';
import '../css/Chat.css';
import ChatRoomList from "./ChatRoomList";
import {useParams} from "react-router-dom";
import ChatMessage from "./ChatMessage";
import ChatMessageList from "./ChatMessageList";
import axios from "axios";

function Chat(props) {
    //변수
    const [cr_num,setCr_num]=useState(0);
    const [u_num,setU_num]=useState(0);
    const [chatList, setChatList] = useState([]);
    const [resize, setResize] = useState();
    const ur_num=sessionStorage.ur_num;
    //함수
    const cr_click=(cr_num)=>{
        setCr_num(cr_num);
    }
    const handleResize = () => {
        setResize(window.innerWidth);
    };
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
    //useEffect
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={'main-box'} style={{width:`${resize<=800?'600px':'80%'}`}}>
            <div className={resize<=800?"chatroom-list hide":"chatroom-list show"}>
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
            <div id={"chat_message"} style={{width:`${resize<=800?'590px':'100%'}`}}>
                {
                    cr_num==0
                        ?
                        <div className={'sellect_user'}>채팅할 상대를 선택해주세요</div>
                        :
                        <ChatMessageList cr_num={cr_num} ur_num={ur_num} u_num={u_num} chatList={chatList} />
                }

            </div>
        </div>
    );
}

export default Chat;