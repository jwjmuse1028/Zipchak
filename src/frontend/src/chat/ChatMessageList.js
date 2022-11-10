import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import ChatMessage from "./ChatMessage";
//import testimg from 'http://localhost:9005/chat/image/20221110112815640.jpg';
import bae from '../image/bae.jpg';

function ChatMessageList(props) {
    const [chatList, setChatList] = useState([]);
    const [sender, setSender]=useState('');
    const {cr_num, ur_num, lastReadSign}=props;
    let imageUrl="http://localhost:9005/image/";
    const chatendRef=useRef();
    const getChatMessage=()=>{
        let url="http://localhost:9005/chat/cm?cr_num="+cr_num;
        axios.get(url).then(res=>{
            setChatList(res.data);
        })
    }
    const addMsg=(msgData)=>{
        setChatList(chatList.concat(msgData))
    }

    useEffect(()=>{
        getChatMessage();
    },[cr_num,chatList])
    useEffect(()=>{
        chatendRef.current?.scrollIntoView();
    },[chatList])
    return (
        <div className={'msg_list_box'}>
            <h1>{}</h1>
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
                            <div className={'u_msg_box_w'}>
                                <div key={i} className={'u_msg_box'}>
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