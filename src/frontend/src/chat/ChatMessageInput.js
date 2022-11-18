import {useRef, useState, useEffect, memo} from 'react';
import React from 'react';
import * as StompJs from '@stomp/stompjs';
import axios from "axios";
import InputEmoji from 'react-input-emoji'
import {ImageSearchOutlined, SendRounded} from "@material-ui/icons";
import '../css/ChatMessageInput.css';

function ChatMessageInput(props) {
    const [msg, setMsg] = useState('');
    const {cr_num, sendnoti } = props;
    const client = useRef({});
    let ur_num=sessionStorage.ur_num;
    const url=localStorage.url;
    let uploadUrl=url+"/photo/upload";

    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: 'ws://localhost:9005/ws',
            onConnect: () => {
                console.log('connected');
                subscribe();
            },
        });
        client.current.activate();
    };
    const publish = (msg) => {
        if (!client.current.connected) return;
        client.current.publish({
            destination: '/pub/chat',
            body: JSON.stringify({
                sender : ur_num,
                cr_num: cr_num,
                msg:msg,
            }),
        });
        let readUrl=localStorage.url+"/chat/readaftermsg?cr_num="+cr_num+"&ur_num="+ur_num;
        axios.get(readUrl).then(res=>"")
        sendnoti("메시지전송,"+cr_num+","+msg);
        setMsg('');
    };

    const subscribe = () => {
        client.current.subscribe('/sub/chat/' + cr_num, (body) => {
            const json_body = JSON.parse(body.body);
            //console.dir(json_body);
            //addMsg(json_body);
        });

    };

    const disconnect = () => {
        client.current.deactivate();
        console.log('disconnected');
    };

    function handleOnEnter (msg) {
        if (msg!==""){
          publish(msg);
        }
    }

    const imgclick=()=>{
        document.getElementById('input-img').click();
    }
    const mouseclick=()=>{
        handleOnEnter(msg);
    }
    const photoUploadEvent=(e)=>{
        const uploadFile=e.target.files[0];
        //console.log(uploadFile);
        const imageFile=new FormData();
        imageFile.append("uploadFile",uploadFile);
        axios({
            method:'post',
            url:uploadUrl,
            data:imageFile,
            headers:{'Content-Type':'multipart/form-data'}
        }).then(res=>{
                //console.log(res.data);
                handleOnEnter(res.data);
            });
    }
    useEffect(() => {
        connect();
        return () => disconnect();
    }, []);

    return (
        <div className={'chat-input'}>
            <InputEmoji
                value={msg}
                onChange={setMsg}
                cleanOnEnter
                onEnter={handleOnEnter}
                placeholder="메시지를 입력해주세요"
            />
            <button className={'btn-img'} onClick={imgclick}><ImageSearchOutlined/></button>
            <button className={'btn-send'} onClick={mouseclick}><SendRounded/></button>
            <input type={'file'} id={'input-img'} style={{display:'none'}} onChange={photoUploadEvent} />
        </div>
    );
}
export default React.memo(ChatMessageInput);