import React, {memo, useEffect, useState} from 'react';
import axios from "axios";
import '../css/ChatRoomList.css';

function ChatRoomList(props) {
    const [chatRoom, setChatRoom]=useState([]);
    const {ur_num, cr_click, screenStatef,sendnoti,noti}=props;
    const [resize, setResize] = useState();
    const [isActive, setIsActive]=useState(false);
    const chatRoomList=()=>{
        let url=localStorage.url+"/chat/list?ur_num="+ur_num;
        axios.get(url).then(res=>{
            setChatRoom(res.data);
        })
    }
    const clickEvent=(i)=>{
        document.getElementById(`msg_sign${i}`).style.backgroundColor='gray';
        setIsActive(i);
        sendnoti('연결:'+i+'번 방' );
        let readUrl=localStorage.url+"/chat/read?cr_num="+i+"&ur_num="+ur_num;
        axios.get(readUrl).then(res=>"")
    }
    const handleResize = () => {
        setResize(window.innerWidth);
    };
    useEffect(()=>{
        chatRoomList();
        console.log(noti);
    },[noti]);
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div >
            <br/>
            <ul>
                {
                chatRoom &&
                chatRoom.map((cr,i)=>
                    <li key={i} className={'crlist' + (cr.cr_num===isActive?' crlist_click':'')}
                        id={'chatroom_'+cr.cr_num}
                        onClick={()=>{
                            cr_click(cr.cr_num, ur_num!==cr.buyer_num?cr.buyer_num:cr.ur_num,'click');
                            resize<=800?screenStatef(2):screenStatef(0);
                            clickEvent(cr.cr_num);
                            }} >
                        <div className={'room_box_top'}>
                            <div className={'room_box_top_text'}>
                                <b>{ur_num!==cr.buyer_num?cr.buyer_nick:cr.seller_nick}님&nbsp;|</b>
                                &nbsp;&nbsp;{cr.sp_title}</div>
                            <div className={'read_sign'} id={`msg_sign${cr.cr_num}`} style={{backgroundColor:cr.sender===ur_num?"gray":cr.is_read===0?"#38B9E0":"gray"}}></div>

                        </div>
                        <div className={'room-box-btm'}>
                            <div className={'cr_msg_box'} id={`lst_msg${cr.cr_num}`}>
                                {
                                    cr.msg.startsWith('img-')?
                                        <>{
                                            cr.sender === cr.ur_num ?
                                                cr.seller_nick
                                                :
                                                cr.buyer_nick
                                        }
                                            님이 사진을 공유했습니다
                                        </>
                                        :
                                        cr.msg}</div>
                            <div className={'cm_wdate'}>{cr.cm_wdate.substring(5,11)}</div>
                        </div>
                    </li>
                )
                }
            </ul>

        </div>
    );
}

export default ChatRoomList;
