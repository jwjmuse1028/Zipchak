import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import ChatMessage from "./ChatMessage";
import noprfpic from "../image/noprofilepicture.webp";
import tmp from "../image/tmp.png";
import {ArrowBackRounded} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import ChatRoomList from "./ChatRoomList";

function ChatMessageList(props) {
    //변수
    const [chatList, setChatList] = useState([]);
    const [uInfo,setUinfo]=useState({});
    const [uTmp,setUTmp]=useState();
    const [tmpCol,setTmpCol]=useState('green');
    const [tmpH, setTmpH]=useState('10px');
    const [tmpY,setTmpY]=useState('5px');
    const [resize, setResize] = useState();
    const {cr_num, ur_num,u_num, screenStatef}=props;
    const navi=useNavigate();
    let imageUrl=sessionStorage.url+"/image/";
    const chatendRef=useRef();
    //함수
    const getChatMessage=()=>{
        let url=sessionStorage.url+"/chat/cm?cr_num="+cr_num;
        axios.get(url).then(res=>{
            setChatList(res.data);
        })
    }
    const addMsg=(msgData)=>{
        setChatList(chatList.concat(msgData))
    }
    const getUInfo=()=>{
        let uinfoUrl=sessionStorage.url+"/chat/u_info?u_num="+u_num;
        axios.get(uinfoUrl).then(res=>{
            setUinfo(res.data);
            setUTmp(res.data.prf_tmp);
        })
    }
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
    const handleResize = () => {
        setResize(window.innerWidth);
    };
    //useEffect
    useEffect(()=>{
        getUInfo();
    },[cr_num])
    useEffect(()=>{
        getTmpCol();
    },[uTmp])
    useEffect(()=>{
        getChatMessage();
    },[cr_num,chatList])
    useEffect(()=>{
        chatendRef.current?.scrollIntoView();
    },[])
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={'msg_container'}>
            <div className={'msg_list_box'} >
                <div className={'msg_list_box_top'}>
                    <span className={'to_chat_room'} style={{display:`${resize <= 800 ? 'block' : 'none'}`}}
                    onClick={()=>screenStatef(1)}
                    ><ArrowBackRounded/></span>
                    <div className={'uInfoBox'} >
                        <div className={'prf_box'}
                            style={{backgroundImage:`url('${imageUrl+uInfo.prf_img}'),url('${noprfpic}')`}}></div>
                        <div className={'prf_nick'}>{uInfo.prf_nick}님</div>
                        <img alt={''} src={tmp} className={'tmp_img'}/>
                        <div className={'tmp_circle'} style={{backgroundColor:tmpCol}}></div>
                        <div className={'tmp_rec'} style={{backgroundColor:tmpCol, height:tmpH,top:tmpY}}></div>
                        <div className={'prf_tmp'}>{uInfo.prf_tmp}℃</div>
                    </div>
                </div>
                <hr style={{marginTop:'0px'}}/>
                <div className={'msg_list'} >
                {
                    chatList &&
                    chatList.map((cl,i)=>
                        <div key={i} className={'each_msg_box'}>
                            {
                                cl.sender==ur_num
                                ?
                                <div className={'i_msg_box_w_read'}>
                                    <div className={'i_read'} >
                                    {
                                        cl.is_read==0?'안읽음':'읽음'

                                    }
                                    </div>
                                    <div  className={'i_msg_box'}>
                                        {
                                            cl.msg.startsWith('img-')
                                                ?
                                                <div className={'chat-img'} style={{backgroundImage:`url('${imageUrl+cl.msg.substring(4,cl.msg.length)}')`}}></div>
                                                :
                                            <div>{cl.msg}</div>
                                        }
                                        {cl.cm_wdate}
                                    </div>

                                </div>
                                :
                                <div className={'u_msg_box_w_prf'}>
                                    <div className={'chat_prf_box'}
                                         style={{backgroundImage:`url('${imageUrl+uInfo.prf_img}'),url('${noprfpic}')`}}
                                    ></div>
                                    <div className={'u_msg_box'}>
                                        {
                                            cl.msg.startsWith('img-')
                                                ?
                                                <div className={'chat-img'} style={{backgroundImage:`url('${imageUrl+cl.msg.substring(4,cl.msg.length)}')`}}></div>
                                                :
                                                <div>{cl.msg}</div>
                                        }
                                        {cl.cm_wdate}
                                    </div>
                                </div>
                            }
                        </div>
                    )
                }
                <div ref={chatendRef}></div>
                </div>
                <ChatMessage cr_num={cr_num} addMsg={addMsg} style={{width:'100%'}}/>
            </div>
        </div>
    );
}

export default ChatMessageList;