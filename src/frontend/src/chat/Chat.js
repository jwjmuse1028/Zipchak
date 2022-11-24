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
    const [noti,setNoti]=useState();
    const [cr_num,setCr_num]=useState(Number(roomno));
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
        //console.log(noti);
    }
    const reactsize=()=>{
        if(resize>768){
            setScreenState(0);
        }
        else if(resize<=768) {
            if(cr_num===0){
                setScreenState(1);
            }else {
                setScreenState(2);
            }
        }
        //console.log(screenState);
    }

    //useEffect
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(()=>{
        setResize(window.innerWidth);
        reactsize();
    },[])
    useEffect(()=>{
        reactsize();
    },[resize])
    useEffect(()=>{
        if (roomno!=0){
            let readUrl=localStorage.url+"/chat/read?cr_num="+roomno+"&ur_num="+ur_num;
            axios.get(readUrl).then(res=>sendnoti('연결:'+roomno+'번 방' ));
            //console.log("url로 읽음처리")
        }
        },[roomno]
    )
    return (
        <div className={'main-box'} style={{width:`${resize<=768?'600px':'95%'}`,
            maxWidth:'1136px',
            gridTemplateColumns:`${screenState===0?"30% 70%":screenState===1?"100% 0%":"0% 100%"}`}}
            >
            <div className={"chatroom-list"}
            style={{display:`${screenState===0?"block":screenState===1?"block":resize<=768?"none":"block"}`}}>
                <ChatRoomList ur_num={ur_num} cr_click={cr_click} sendnoti={sendnoti} roomno={roomno}
                              cr_num={cr_num} noti={noti} screenStatef={screenStatef} screenState={screenState} /></div>
            <div id={"chat_message"} style={{width:`${resize<=768?"590px":"100%"}`,
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
            <MessageNotification noti={noti}/>
        </div>
    );
}

export default Chat;