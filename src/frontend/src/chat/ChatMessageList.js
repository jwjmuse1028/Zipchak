import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import ChatMessageInput from "./ChatMessageInput";
import ChatMessageItem from "./ChatMessageItem";
import '../css/ChatMessageList.css';
import ChatMessageInfo from "./ChatMessageInfo";

function ChatMessageList(props) {
    //변수
    const {cr_num, u_num, screenStatef,screenState,sendnoti,noti,roomno}=props;
    const [uInfo,setUinfo]=useState({});
    const [resize, setResize] = useState();
    const [chatList, setChatList] = useState([]);
    const [perpage,setPerpage]=useState(9);
    const [isloading, setIsloading]=useState(false);
    const scrollRef=useRef();
    const [totalmsg,setTotalmsg]=useState(0);
    const timerDebounceRef = useRef();
    const [u_numfinal,setU_numfinal]=useState(0);
    const ur_num=sessionStorage.ur_num;
    const [addMsgnoti,setAddMsgnoti]=useState();
    const [inrHeight,setInrHeight]=useState();

    //함수
    //상품에서 왔을 때
    const getUInfofromurl=()=>{
        if(u_num==0){
        let getUnumURL = localStorage.url + "/getunum?cr_num=" + roomno + "&ur_num=" + ur_num;
        axios.get(getUnumURL).then(res => {
            setU_numfinal(res.data);
            getUInfo();
        })}else {
            setU_numfinal(u_num);
            getUInfo();
        }

    }
    //상대방 정보 출력
    const getUInfo=()=>{
        //console.log("u_num:"+u_numfromurl);
        let uinfoUrl=localStorage.url+"/chat/u_info?u_num="+u_numfinal;
        axios.get(uinfoUrl).then(res=>{
            setUinfo(res.data);
        })
    }
    //화면 사이즈 입력
    const handleResize = () => {
        setResize(window.innerWidth);
        setInrHeight(window.innerHeight);
    };
    //db에서 메시지 가져옴
    const getChatMessage=()=>{
        let url=localStorage.url+"/chat/cm?cr_num="+cr_num+"&perpage="+perpage;
        axios.get(url).then(res=>{
            setChatList(res.data.cmlist);
            setTotalmsg(res.data.totalmsg);
            setTimeout(() => setIsloading(false), 1000);
        })
    }
    //ws에서 가져옴
    const addMsg=(msg)=>{
        setChatList((prev)=>[...prev,msg]);
        sendnoti(msg);
        setAddMsgnoti(msg);
    }

    const handleScroll = (e) => {
        if(timerDebounceRef.current){
            clearTimeout(timerDebounceRef.current);
        }
        timerDebounceRef.current = setTimeout(() => {
            if (e.target.scrollTop===0){
                if (perpage<totalmsg+6){
                    setPerpage(perpage+6);
                    //console.log("currentmsg="+perpage);
                    setIsloading(true);
                }
            }
        }, 500);
    }
    //useEffect
    useEffect(()=>{
        getUInfofromurl();
        setPerpage(9);
    },[cr_num,u_numfinal])

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
    },[cr_num,noti,addMsgnoti,perpage,chatList])
    return (
        <div className={'msg_container'}>
            <div className={'msg_list_box'} >
                {/*상대방 정보*/}
                    <ChatMessageInfo screenStatef={screenStatef} uInfo={uInfo}
                                     u_numfinal={u_numfinal} cr_num={cr_num}/>

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
                <ChatMessageInput cr_num={cr_num} sendnoti={sendnoti} style={{width:'100%'}} addMsg={addMsg}/>
            </div>
        </div>
    );
}
export default ChatMessageList;