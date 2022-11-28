import React from 'react';
import noprfpic from "../image/noprofilepicture.webp";
import {makeStyles} from "@material-ui/core/styles";
import MapOnly from "./MapOnly";

function ChatMessageItem(props) {
    const {chat,uInfo}=props;
    const ur_num=Number(sessionStorage.ur_num);
    const ChatImgUrl='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/chat_img/';
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";
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
                                chat.msg.startsWith('map-')?
                                    <MapOnly locy={chat.msg.substring(4, chat.msg.length).split(",")[0]}
                                             locx={chat.msg.substring(4, chat.msg.length).split(",")[1]}
                                             cm_num={chat.cm_num}/>
                                :
                                <div>{chat.msg}</div>
                        }
                        {chat.cm_wdate}
                    </div>
                </div>
                :
                <div className={'u_msg_box_w_prf'}>
                    <div className={'chat_prf_box'}
                         style={{backgroundImage: `url('${prfUrl+uInfo.prf_img}'),url('')`}}
                    ></div>
                    <div className={'u_msg_box'}>
                        {
                            chat.msg.startsWith('img-')
                                ?
                                <div className={'chat-img'}
                                     style={{backgroundImage: `url('${ChatImgUrl+chat.msg.substring(4, chat.msg.length)}')`}}></div>
                                :
                                chat.msg.startsWith('map-')?
                                    <MapOnly locy={chat.msg.substring(4, chat.msg.length).split(",")[0]}
                                             locx={chat.msg.substring(4, chat.msg.length).split(",")[1]}

                                    />
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