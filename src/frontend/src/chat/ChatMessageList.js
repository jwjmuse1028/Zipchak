import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import ChatMessage from "./ChatMessage";
import noprfpic from "../image/noprofilepicture.webp";
import tmp from "../image/tmp.png";

function ChatMessageList(props) {
    //변수
    const [chatList, setChatList] = useState([]);
    const [uInfo,setUinfo]=useState({});
    const [uTmp,setUTmp]=useState();
    const [tmpCol,setTmpCol]=useState('green');
    const [tmpH, setTmpH]=useState('10px');
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
            setUTmp(res.data.prf_tmp);
        })
    }
    const getTmpCol=()=>{
        if (uInfo.prf_tmp>80)
        {
            setTmpCol('red');
            setTmpH('35px');
        }else if(uInfo.prf_tmp>60) {
            setTmpCol('orange');
            setTmpH('30px');
        }else if(uInfo.prf_tmp>40) {
            setTmpCol('gold');
            setTmpH('25px');
        }else if(uInfo.prf_tmp>20) {
            setTmpCol('green');
            setTmpH('20px');
        }else if(uInfo.prf_tmp>10) {
            setTmpCol('dodgerblue');
            setTmpH('15px');
        }else {
            setTmpCol('midnightblue');
            setTmpH('0px');
        }
    }
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
    },[chatList])

    return (
        <div className={'msg_list_box'}>
            <div className={'uInfoBox'} >
                <div className={'prf_box'}
                    style={{backgroundImage:`url('${imageUrl+uInfo.prf_img}'),url('${noprfpic}')`}}></div>
                <div className={'prf_nick'}>{uInfo.prf_nick}님</div>
                <div className={'prf_temp'}>{uInfo.prf_tmp}℃</div>
                <img alt={''} src={tmp} className={'tmp_img'}/>
                <div className={'tmp_circle'} style={{backgroundColor:tmpCol}}></div>
                <div className={'tmp_rec'} style={{backgroundColor:tmpCol, height:tmpH}}></div>
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
    );
}

export default ChatMessageList;