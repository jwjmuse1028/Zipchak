import React from 'react';
import noprfpic from "../image/noprofilepicture.webp";

function ChatMessageItem(props) {
    const {chat,uInfo}=props;
    const ur_num=Number(sessionStorage.ur_num);
    const ChatImgUrl='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/chat_img/';

    return (
        <div className={'each_msg_box'} >
            {chat.sender === ur_num
                ?
                <div className={'i_msg_box_w_read'}>
                    <div className={'i_read'}>
                        {
                            chat.is_read === 0 ? '안읽음' : '읽음'
                        }
                    </div>
                    <div className={'i_msg_box'}>
                        {
                            chat.msg.startsWith('img-')
                                ?
                                <div className={'chat-img'}
                                     style={{backgroundImage: `url('${ChatImgUrl+chat.msg.substring(4, chat.msg.length)}')`}}></div>
                                :
                                <div>{chat.msg}</div>
                        }
                        {chat.cm_wdate}
                    </div>
                </div>
                :
                <div className={'u_msg_box_w_prf'}>
                    <div className={'chat_prf_box'}
                         style={{backgroundImage: `url('${uInfo.prf_img}'),url('${noprfpic}')`}}
                    ></div>
                    <div className={'u_msg_box'}>
                        {
                            chat.msg.startsWith('img-')
                                ?
                                <div className={'chat-img'}
                                     style={{backgroundImage: `url('${ChatImgUrl+chat.msg.substring(4, chat.msg.length)}')`}}></div>
                                :
                                <div>{chat.msg}</div>
                        }
                        {chat.cm_wdate}
                    </div>
                </div>
            }
        </div>
    );
}

export default React.memo(ChatMessageItem);