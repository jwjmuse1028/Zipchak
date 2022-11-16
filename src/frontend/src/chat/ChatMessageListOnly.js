import React, {memo, useEffect, useRef, useState} from 'react';
import noprfpic from "../image/noprofilepicture.webp";

function ChatMessageListOnly(props) {
    //변수
    const {chatList,ur_num,uInfo,notice}=props;
    const scrollRef=useRef();
    useEffect(()=>{
        scrollRef.current.scrollIntoView({behavior:"smooth"});
        //console.log(notice);
    },[notice])
    return (
        <div  >
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
            <div ref={scrollRef} style={{height:'10px'}}></div>
        </div>
    );
}

export default ChatMessageListOnly;