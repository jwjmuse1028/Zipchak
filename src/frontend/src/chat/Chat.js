import React, {useEffect, useState} from 'react';
import '../css/Chat.css';
import ChatRoomList from "./ChatRoomList";
import ChatMessageList from "./ChatMessageList";
import {useParams} from "react-router-dom";
import axios from "axios";
import MessageNotification from "./MessageNotification";

function Chat(props) {
    //변수
    const {roomno}=useParams();
    const [u_num,setU_num]=useState(0);
    const [resize, setResize] = useState();
    const [screenState,setScreenState]=useState(0); //0이면 둘다 보임, 1이면 room만, 2면 챗만
    const ur_num=Number(sessionStorage.ur_num);
    const [noti,setNoti]=useState('채팅 입장');
    const [cr_num,setCr_num]=useState(roomno);
    //console.log(cr_num);
    //함수
    const cr_click=(cr_num,u_num)=>{
        setCr_num(cr_num);
        setU_num(u_num);
    }
    const screenStatef=(state)=>{
        setScreenState(state);
    }
    const handleResize = () => {
        setResize(window.innerWidth);
    };
    //연결,메시지 알림
    const sendnoti=(input)=>{
        setNoti(input);
    }
    const reactsize=()=>{
        if(resize>800){
            setScreenState(0);
        }
        else if(resize<=800){
            if(cr_num===0){
                setScreenState(1);
            }else {
                setScreenState(2);
            }
        }
    }

    //useEffect
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(()=>{
        reactsize();
    },[resize])

    return (
        <div className={'main-box'} style={{width:`${resize<=800?'600px':'80%'}`,
            gridTemplateColumns:`${screenState===0?"30% 70%":screenState===1?"100% 0%":"0% 100%"}`}}
            >
            <div className={"chatroom-list"}
            style={{display:`${screenState===0?"block":screenState===1?"block":resize<=800?"none":"block"}`}}>
                <ChatRoomList ur_num={ur_num} cr_click={cr_click} sendnoti={sendnoti} roomno={roomno}
                              noti={noti} screenStatef={screenStatef} screenState={screenState} /></div>
            <div id={"chat_message"} style={{width:`${resize<=800?"590px":"100%"}`,
                display:`${screenState===0?"block":screenState===1?"none":"block"}`}}>
                {
                    roomno==0
                        ?
                        <h1 className={'sellect_user'}>채팅할 상대를 선택해주세요</h1>
                        :
                        <ChatMessageList cr_num={cr_num} ur_num={ur_num} u_num={u_num} roomno={roomno}
                             sendnoti={sendnoti} noti={noti} screenStatef={screenStatef} screenState={screenState}/>
                }
            </div>
            <MessageNotification cr_num={cr_num} sendnoti={sendnoti}/>
        </div>
    );
}

export default Chat;