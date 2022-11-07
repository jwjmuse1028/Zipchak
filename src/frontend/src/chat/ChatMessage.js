import { useRef, useState, useEffect } from 'react';
import * as StompJs from '@stomp/stompjs';
import {useParams} from "react-router-dom";
import axios from "axios";

function ChatMessage(props) {
    const [chatList, setChatList] = useState([]);
    const [chat, setChat] = useState('');
    const {cr_num, ur_num}=props;

    const { apply_id } = 1;
    const client = useRef({});

    const getChatMessage=()=>{
        let url="http://localhost:9005/chat/cm?cr_num="+cr_num;
        axios.get(url).then(res=>{
            setChatList(res.data);
        })
    }

    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: 'ws://localhost:9005/ws',
            onConnect: () => {
                console.log('success');
                subscribe();
            },
        });
        client.current.activate();
    };

    const publish = (chat) => {
        if (!client.current.connected) return;

        client.current.publish({
            destination: '/pub/chat',
            body: JSON.stringify({
                applyId: apply_id,
                chat: chat,
            }),
        });

        setChat('');
    };

    const subscribe = () => {
        client.current.subscribe('/sub/chat/' + apply_id, (body) => {
            const json_body = JSON.parse(body.body);
            setChatList((_chat_list) => [
                ..._chat_list, json_body
            ]);
        });
    };

    const disconnect = () => {
        client.current.deactivate();
    };

    const handleChange = (event) => { // 채팅 입력 시 state에 값 설정
        setChat(event.target.value);
    };

    const handleSubmit = (event, chat) => { // 보내기 버튼 눌렀을 때 publish
        event.preventDefault();
        publish(chat);
    };

    useEffect(() => {
        connect();
        getChatMessage();
        return () => disconnect();
    }, []);

    return (
        <div>
            <div className={'chat-list'}>
                {
                    chatList &&
                    chatList.map((cl,i)=>
                    <div>
                        {cl.msg}
                    </div>)
                }
            </div>
            <form onSubmit={(event) => handleSubmit(event, chat)}>
                <div>
                    <input type={'text'} name={'chatInput'} onChange={handleChange} value={chat} />
                </div>
                <input type={'submit'} value={'보내기'} />
            </form>
        </div>
    );
}
export default ChatMessage;