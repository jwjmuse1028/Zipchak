import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import ChatMessageInput from "./ChatMessageInput";
import ChatMessageItem from "./ChatMessageItem";
import '../css/ChatMessageList.css';
import ChatMessageInfo from "./ChatMessageInfo";

function ChatMessageList(props) {
    //변수
    const {cr_num, u_num, screenStatef,screenState,sendnoti,noti}=props;
    const [uInfo,setUinfo]=useState({});
    const [uTmp,setUTmp]=useState();
    const [resize, setResize] = useState();
    const [chatList, setChatList] = useState([]);
    const [perpage,setPerpage]=useState(9);
    const [isloading, setIsloading]=useState(false);
    const scrollRef=useRef();
    const [totalmsg,setTotalmsg]=useState(0);
    const timerDebounceRef = useRef();
    //함수
    //상대방 정보 출력
    const getUInfo=()=>{
        let uinfoUrl=localStorage.url+"/chat/u_info?u_num="+u_num;
        axios.get(uinfoUrl).then(res=>{
            setUinfo(res.data);
            setUTmp(res.data.prf_tmp);
        })
    }
    //화면 사이즈 입력
    const handleResize = () => {
        setResize(window.innerWidth);
    };

    const getChatMessage=()=>{
        let url=localStorage.url+"/chat/cm?cr_num="+cr_num+"&perpage="+perpage;
        axios.get(url).then(res=>{
            setChatList(res.data.cmlist);
            setTotalmsg(res.data.totalmsg);
            setTimeout(() => setIsloading(false), 1000);
        })
    }

    const handleScroll = (e) => {
        if(timerDebounceRef.current){
            clearTimeout(timerDebounceRef.current);
        }
        timerDebounceRef.current = setTimeout(() => {
            if (e.target.scrollTop===0){
                if (perpage<totalmsg+4){
                    setPerpage(perpage+9);
                    console.log("currentmsg="+perpage);
                    setIsloading(true);
                }
            }
        }, 500);
    }
    //useEffect
    useEffect(()=>{
        getUInfo();
        setPerpage(9);
    },[cr_num])

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [screenState]);
    useEffect(()=>{
        //document.getElementById('chat_end').scrollIntoView({behavior:"smooth",block:'start'});
        scrollRef.current?.scrollIntoView({behavior:"smooth",block:'end'});
        //console.log(noti);
    },[noti])
    useEffect(()=>{
        getChatMessage()
        //console.log(noti+'메시지 출력중');
    },[chatList,cr_num])

    return (
        <div className={'msg_container'}>
            <div className={'msg_list_box'} >
                {/*상대방 정보*/}
                <div >
                    <ChatMessageInfo screenStatef={screenStatef} uInfo={uInfo} uTmp={uTmp} cr_num={cr_num}/>
                </div>
                {/* 채팅 메시지 리스트 */}
                <div  className={'msg_list'} onScroll={handleScroll} >
                    <div style={{textAlign:'center',display:`${isloading?'block':'none'}`}}>
                        <div className="loader4"></div>
                    </div>
                    {chatList &&
                    chatList.map((chat,i)=>
                        <ChatMessageItem uInfo={uInfo} chat={chat} key={i}/>)
                    }
                    <div ref={scrollRef} id={'chat_end'} style={{height:'1px'}}></div>
                </div >
                {/*채팅 입력 창*/}
                <ChatMessageInput cr_num={cr_num} sendnoti={sendnoti} style={{width:'100%'}}/>
            </div>
        </div>
    );
}
export default ChatMessageList;