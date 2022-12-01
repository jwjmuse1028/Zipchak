import {useRef, useState, useEffect, memo} from 'react';
import React from 'react';
import * as StompJs from '@stomp/stompjs';
import axios from "axios";
import InputEmoji from 'react-input-emoji'
import {ImageSearchOutlined, LocationOn, SendRounded} from "@material-ui/icons";
import '../css/ChatMessageInput.css';
import {LocationOnOutlined} from "@mui/icons-material";
import MapModal from "./MapModal";

function ChatMessageInput(props) {
    const [msg, setMsg] = useState('');
    const [mapmodalopen,setMapmodalopen]=useState(false);
    const {cr_num, sendnoti,addMsg } = props;
    const client = useRef({});
    let ur_num=sessionStorage.ur_num;
    const url=localStorage.url;
    const wsurl=url.substring(4,url.length);
    //console.log(wsurl);

    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: 'ws'+wsurl+'/ws',
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
            destination: '/pub/chat/'+cr_num,
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
            const currentT = new Date();
            const date = currentT.toISOString().split('T')[0];
            const time = currentT.toTimeString().split(' ')[0].substring(0,5);
            //console.log(date+time);
            json_body.cm_wdate=date+" "+time;
            //console.log(json_body);
            addMsg(json_body);
            //sendnoti("메시지받음,"+cr_num+");
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
    const locationclick=()=>{
        setMapmodalopen(true);
    }
    const mouseclick=()=>{
        handleOnEnter(msg);
    }
    const photoUploadEvent=(e)=>{
        let uploadUrl=url+"/chat/photo/upload";
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

    const MapModalClose=(flag)=>{
        setMapmodalopen(flag);
    }
    const sendselectloc=(place)=>{
        console.log(place.y);
        handleOnEnter("map-"+place.y+","+place.x);
        setMapmodalopen(false);
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
            <button className={'btn-img'} onClick={locationclick}><LocationOnOutlined/></button>
            <button className={'btn-send'} onClick={mouseclick}><SendRounded/></button>
            <input type={'file'} id={'input-img'} style={{display:'none'}} onChange={photoUploadEvent} />
            <MapModal open={mapmodalopen} MapModalClose={MapModalClose} sendselectloc={sendselectloc}/>
        </div>
    );
}
export default React.memo(ChatMessageInput);