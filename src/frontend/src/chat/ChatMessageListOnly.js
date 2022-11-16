import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import noprfpic from "../image/noprofilepicture.webp";
import axios from "axios";
import '../css/ChatMessageList.css';

function ChatMessageListOnly(props) {
    //변수
    const {cr_num,ur_num,uInfo,notice}=props;
    const [chatList, setChatList] = useState([]);
    const [startnum,setStartnum]=useState(0);
    const [perpage,setPerpage]=useState(9);
    const [isloading, setIsloading]=useState(false);
    const scrollRef=useRef();
    const [totalmsg,setTotalmsg]=useState(0);
    //함수
    const getChatMessage=()=>{
        let url=sessionStorage.url+"/chat/cm?cr_num="+cr_num+"&perpage="+perpage;
        axios.get(url).then(res=>{
            setChatList(res.data.cmlist);
            setTotalmsg(res.data.totalmsg);
            setIsloading(false);
        })
    }
    const handleScroll = (e) => {
        console.log(e.target.scrollTop);
        if (e.target.scrollTop===0){
            if (perpage<totalmsg+8){
                setPerpage(perpage+9);
                console.log("currentmsg="+perpage);
                setIsloading(true);
            }
        }

    };
    //useEffect
    useEffect(()=>{
        getChatMessage();
        console.log('메시지 출력중');
    },[cr_num,perpage,notice])

    useEffect(()=>{
        scrollRef.current.scrollIntoView({behavior:"smooth",block:'start'});
        //console.log(notice);
    },[notice])

    return (
        <div className={'msg_list_only'} onScroll={handleScroll}>
            <div style={{textAlign:'center',display:`${isloading?'block':'none'}`}}>loading..</div>
            {
                chatList &&
                chatList.map((cl, i) =>
                    <div key={i} className={'each_msg_box'} id={'each_msg_'+i}>
                        {
                            cl.sender === ur_num
                                ?
                                <div className={'i_msg_box_w_read'}>
                                    <div className={'i_read'}>
                                        {
                                            cl.is_read === 0 ? '안읽음' : '읽음'
                                        }
                                    </div>
                                    <div className={'i_msg_box'}>
                                        {
                                            cl.msg.startsWith('img-')
                                                ?
                                                <div className={'chat-img'}
                                                     style={{backgroundImage: `url('${cl.msg.substring(4, cl.msg.length)}')`}}></div>
                                                :
                                                <div>{cl.msg}</div>
                                        }
                                        {cl.cm_wdate}
                                    </div>
                                </div>
                                :
                                <div className={'u_msg_box_w_prf'}>
                                    <div className={'chat_prf_box'}
                                         style={{backgroundImage: `url('${uInfo.prf_img}'),url('${noprfpic}')`}}
                                    ></div>
                                    <div className={'u_msg_box'}>
                                        {
                                            cl.msg.startsWith('img-')
                                                ?
                                                <div className={'chat-img'}
                                                     style={{backgroundImage: `url('${cl.msg.substring(4, cl.msg.length)}')`}}></div>
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
        <div ref={scrollRef} style={{height:'60px'}}></div>
        </div>
    );
}

export default ChatMessageListOnly;