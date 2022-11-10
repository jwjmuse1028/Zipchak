import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import ChatMessage from "./ChatMessage";
import noprfpic from "../image/noprofilepicture.webp";

function ChatMessageList(props) {
    //변수
    const [chatList, setChatList] = useState([]);
    const [uInfo,setUinfo]=useState({});
    const {cr_num, ur_num,u_num}=props;
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
        })
    }

    //useEffect
    useEffect(()=>{
        getUInfo();
    },[cr_num])
    useEffect(()=>{
        getChatMessage();
    },[cr_num,chatList])
    useEffect(()=>{
        chatendRef.current?.scrollIntoView();
    },[chatList])
    return (
        <div className={'msg_list_box'}>
            <div className={'uInfoBox'} style={{margin:"auto"}}>
                <div className={'prf_box'}
                    style={{backgroundImage:`url('${imageUrl+uInfo.prf_img}'),url('${noprfpic}')`}}></div>
                {uInfo.prf_nick}</div>
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
    );
}

export default ChatMessageList;