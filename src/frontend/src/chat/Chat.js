import React, {useEffect, useState} from 'react';
import '../css/Chat.css';
import ChatRoomList from "./ChatRoomList";
import ChatMessageList from "./ChatMessageList";
import axios from "axios";


function Chat(props) {
    //변수
    const [cr_num,setCr_num]=useState(0);
    const [u_num,setU_num]=useState(0);
    const [chatList, setChatList] = useState([]);
    const [resize, setResize] = useState();
    const [screenState,setScreenState]=useState(0); //0이면 둘다 보임, 1이면 room만, 2면 챗만
    const [lastMsg,setLastMsg]=useState();
    const ur_num=Number(sessionStorage.ur_num);
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

    //중고 페이지 생성 시 위치 이동 필요
    let sp_num=25;
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
    useEffect(()=>{
        reactsize();
    },[])
    useEffect(()=>{
        reactsize();
    },[resize])

    return (
        <div className={'main-box'} style={{width:`${resize<=800?'600px':'80%'}`,
            gridTemplateColumns:`${screenState===0?"30% 70%":screenState===1?"100% 0%":"0% 100%"}`}}
            >
            <div className={"chatroom-list"}
            style={{display:`${screenState===0?"block":screenState===1?"block":resize<=800?"none":"block"}`}}>
                <div>
                    <button onClick={()=>{
                        createRoom();
                        }} >{sp_num} 상품 채팅 만들기</button><br/>
                </div>
                <ChatRoomList ur_num={ur_num} cr_click={cr_click} screenStatef={screenStatef} screenState={screenState} /></div>
            <div id={"chat_message"} style={{width:`${resize<=800?"590px":"100%"}`,
                display:`${screenState===0?"block":screenState===1?"none":"block"}`}}>
                {
                    cr_num===0
                        ?
                        <div className={'sellect_user'}>채팅할 상대를 선택해주세요</div>
                        :
                        <ChatMessageList cr_num={cr_num} ur_num={ur_num} u_num={u_num} chatList={chatList}
                                         screenStatef={screenStatef} screenState={screenState}/>
                }

            </div>
        </div>
    );
}

export default Chat;