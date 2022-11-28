import React, {memo, useEffect, useState} from 'react';
import axios from "axios";
import '../css/ChatRoomList.css';
import {useNavigate} from "react-router-dom";

function ChatRoomList(props) {
    const [chatRoom, setChatRoom]=useState([]);
    const {ur_num, cr_click, screenStatef,sendnoti,noti,roomno,cr_num}=props;
    const [resize, setResize] = useState();
    const [isActive, setIsActive]=useState(false);
    const navi=useNavigate();
    //채팅 리스트 출력
    const chatRoomList=()=>{
        let url=localStorage.url+"/chat/list?ur_num="+ur_num;
        axios.get(url).then(res=>{
            setChatRoom(res.data);
        })
    }
    //채팅방 클릭했을 때,
    const clickEvent=(i)=>{
        document.getElementById(`msg_sign${i}`).style.backgroundColor='gray';
        setIsActive(i);
        let readUrl=localStorage.url+"/chat/read?cr_num="+i+"&ur_num="+ur_num;
        axios.get(readUrl).then(res=>sendnoti('연결:'+i+'번 방' ));
        navi(`/chat/${i}`)
    }

    const handleResize = () => {
        setResize(window.innerWidth);
    };
    //몇 분전으로 날짜 출력
    function elapsedTime(date) {
        const start = new Date(date);
        const end = new Date(); // 현재 날짜
        const diff = (end - start); // 경과 시간 구하기

        const times = [
            { time: "분", milliSeconds: 1000 * 60 },
            { time: "시간", milliSeconds: 1000 * 60 * 60 },
            { time: "일", milliSeconds: 1000 * 60 * 60 * 24 },
            { time: "개월", milliSeconds: 1000 * 60 * 60 * 24 * 30 },
            { time: "년", milliSeconds: 1000 * 60 * 60 * 24 * 365 },
        ].reverse();
        for (const value of times) {
            const betweenTime = Math.floor(diff / value.milliSeconds);

            // 큰 단위는 0보다 작은 소수점 값이 나옴
            if (betweenTime > 0) {
                return `${betweenTime}${value.time} 전`;
            }
        }
        // 모든 단위가 맞지 않을 시
        return "방금 전";
    }
    useEffect(()=>{
        chatRoomList();
    },[noti,roomno,cr_num]);
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div >
            <ul style={{paddingLeft:'10px',paddingTop:'10px'}}>
                {
                chatRoom &&
                chatRoom.map((cr,i)=>
                    <li key={i} className={'crlist' + (cr.cr_num===isActive?' crlist_click':'')}
                        id={'chatroom_'+cr.cr_num}
                        onClick={()=>{
                            cr_click(cr.cr_num, ur_num!==cr.buyer_num?cr.buyer_num:cr.ur_num);
                            resize<=768?screenStatef(2):screenStatef(0);
                            clickEvent(cr.cr_num);
                            }} >
                        <div className={'room_box_top'}>
                            <div className={'room_box_top_text'}>
                                <b>{ur_num!==cr.buyer_num?cr.buyer_nick:cr.seller_nick}님&nbsp;|</b>
                                &nbsp;&nbsp;{cr.sp_title}</div>
                            <div className={'read_sign'} id={`msg_sign${cr.cr_num}`} style={{backgroundColor:cr.sender===ur_num?"gray":cr.is_read===0?"#35C5F0":"gray"}}></div>

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
                                        cr.msg.startsWith('map-')?
                                            <>{
                                                cr.sender === cr.ur_num ?
                                                    cr.seller_nick
                                                    :
                                                    cr.buyer_nick
                                            }
                                                님이 위치를 공유했습니다
                                            </>
                                            :
                                        cr.msg}</div>
                            <div className={'cm_wdate'}>{elapsedTime(cr.cm_wdate)}</div>
                        </div>
                    </li>
                )
                }
            </ul>

        </div>
    );
}

export default React.memo(ChatRoomList);
