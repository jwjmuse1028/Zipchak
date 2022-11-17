import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import ChatMessageInput from "./ChatMessageInput";
import noprfpic from "../image/noprofilepicture.webp";
import tmp from "../image/tmp.png";
import {ArrowBackRounded} from "@mui/icons-material";
import noimage from "../image/noimg.jpg";
import ChatMessageItem from "./ChatMessageItem";
import '../css/ChatMessageList.css';

function ChatMessageList(props) {
    //변수
    const {cr_num, u_num, screenStatef,screenState}=props;
    const [uInfo,setUinfo]=useState({});
    const [spInfo,setSpinfo]=useState({});
    const [uTmp,setUTmp]=useState();
    const [tmpCol,setTmpCol]=useState('green');
    const [tmpH, setTmpH]=useState('10px');
    const [tmpY,setTmpY]=useState('5px');
    const [resize, setResize] = useState();
    const [chatList, setChatList] = useState([]);
    const [perpage,setPerpage]=useState(9);
    const [isloading, setIsloading]=useState(false);
    const scrollRef=useRef();
    const [totalmsg,setTotalmsg]=useState(0);
    const [noti,setNoti]=useState();
    const timerDebounceRef = useRef();
    //함수
    //상대방 정보 출력
    const getUInfo=()=>{
        let uinfoUrl=sessionStorage.url+"/chat/u_info?u_num="+u_num;
        axios.get(uinfoUrl).then(res=>{
            setUinfo(res.data);
            setUTmp(res.data.prf_tmp);
        })
    }
    //상대방 온도 출력
    const getTmpCol=()=>{
        if (uInfo.prf_tmp>80)
        {
            setTmpCol('red');
            setTmpH('35px');
            setTmpY('0px')
        }else if(uInfo.prf_tmp>60) {
            setTmpCol('orange');
            setTmpH('27px');
            setTmpY('0px')
        }else if(uInfo.prf_tmp>40) {
            setTmpCol('gold');
            setTmpH('20px');
            setTmpY('2px')
        }else if(uInfo.prf_tmp>20) {
            setTmpCol('green');
            setTmpH('15px');
            setTmpY('5px')
        }else if(uInfo.prf_tmp>10) {
            setTmpCol('dodgerblue');
            setTmpH('10px');
            setTmpY('5px')
        }else {
            setTmpCol('midnightblue');
            setTmpY('0px')
            setTmpH('0px');
        }
    }
    //상품정보 출력
    const getSpInfo=()=>{
        let spinfoUrl=sessionStorage.url+"/chat/spinfo?cr_num="+cr_num;
        axios.get(spinfoUrl).then(res=>{
            setSpinfo(res.data);
        })
    }
    //화면 사이즈 입력
    const handleResize = () => {
        setResize(window.innerWidth);
    };
    //메시지 추가
    // const addMsg=(msg)=>{
    //     setChatList(prevList=>[...prevList,msg]);
    // }
    //연결,메시지 알림
    const sendnoti=(input)=>{
        setNoti(input);
    }
    const getChatMessage=()=>{
        let url=sessionStorage.url+"/chat/cm?cr_num="+cr_num+"&perpage="+perpage;
        axios.get(url).then(res=>{
            setChatList(res.data.cmlist);
            setTotalmsg(res.data.totalmsg);
            setIsloading(false);
        })
    }
    const handleScroll = (e) => {
        if(timerDebounceRef.current){
            clearTimeout(timerDebounceRef.current);
        }
        timerDebounceRef.current = setTimeout(() => {
            if (e.target.scrollTop===0){
                if (perpage<totalmsg+8){
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
        getSpInfo();
    },[cr_num])
    useEffect(()=>{
        getTmpCol();
    },[uTmp])

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [screenState]);
    useEffect(()=>{
        document.getElementById('chat_end').scrollIntoView({behavior:"smooth",block:'start'});
        console.log('스크롤 아래로');
    },[noti,cr_num])
    useEffect(()=>{
        getChatMessage();
        //console.log(noti+'메시지 출력중');
    },[chatList])

    return (
        <div className={'msg_container'}>
            <div className={'msg_list_box'} >
                {/*상대방 정보*/}
                <div className={'msg_list_box_top'}>
                    <span className={'to_chat_room'} onClick={()=>screenStatef(1)}
                    ><ArrowBackRounded/></span>
                    <div className={'uInfoBox'} >
                        <div className={'prf_box'}
                            style={{backgroundImage:`url('${uInfo.prf_img}'),url('${noprfpic}')`}}></div>
                        <div className={'prf_nick'}>{uInfo.prf_nick}님</div>
                        <img alt={''} src={tmp} className={'tmp_img'}/>
                        <div className={'tmp_circle'} style={{backgroundColor:tmpCol}}></div>
                        <div className={'tmp_rec'} style={{backgroundColor:tmpCol, height:tmpH,top:tmpY}}></div>
                        <div className={'prf_tmp'}>{uInfo.prf_tmp}℃</div>
                        <div className={'uinfobox_vline'}>  </div>
                        <div className={'spinfo_img'}
                             style={{backgroundImage:`url('${spInfo.img_name}'),url('${noimage}')`}}/>
                        <div className={'spinfo_title'}>{spInfo.sp_title}</div>
                    </div>
                </div>
                {/* 채팅 메시지 리스트 */}
                <div  className={'msg_list'} onScroll={handleScroll} >
                    <div style={{textAlign:'center',display:`${isloading?'block':'none'}`}}>loading..</div>
                    {chatList &&
                    chatList.map((chat,i)=>
                        <ChatMessageItem uInfo={uInfo} chat={chat} key={i}/>)
                    }
                    <div ref={scrollRef} id={'chat_end'}></div>
                </div >
                {/*채팅 입력 창*/}
                <ChatMessageInput cr_num={cr_num} sendnoti={sendnoti} style={{width:'100%'}}/>
            </div>
        </div>
    );
}
export default ChatMessageList;