import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";

function ProfileGetRvList(props) {
    const {user}=props;
    const [rvlist,setRvlist]=useState([]);
    const navi=useNavigate();
    const spURL='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/';
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";
    const [togglestatus,setTogglestatus]=useState(false);
    const [cnt, setCnt]=useState();
    const marks = [
        {value: 0, label: '🤬'},
        {value: 10, label: '😡'},
        {value: 20, label: '️😠'},
        {value: 30, label: '🙁'},
        {value: 40, label: '😐'},
        {value: 50, label: '🙂'},
        {value: 60, label: '😄'},
        {value: 70, label: '😆'},
        {value: 80, label: '😘'},
        {value: 90, label: '🥰'},
        {value: 100, label: '😍'}
    ];
    const getrvlist=()=>{
        let rvlistURL=localStorage.url+"/getrv?ur_num="+user;
        axios.get(rvlistURL).then(res=>{
            setRvlist(res.data);
            setCnt(res.data.length);
        })
    }
    const spinfoClick=(item)=>{
        navi(`/shop/detail/${item.pd_num}/${item.sp_num}/1`);
    }
    const clicktoggle=()=>{
        setTogglestatus(!togglestatus);
    }
    useEffect(()=>getrvlist(),[user])
    return (
        <div>
            <div className={'mypage_title'} onClick={clicktoggle}>받은 후기 리스트 ({cnt}) {
                togglestatus?<ArrowDropUp/>:<ArrowDropDown/>}</div>
            <ul className={'mypage_ul'} >
            {rvlist.map((rv,i)=>
                <div key={i}  className={(i<3)?'card_show':togglestatus?'card_show':'card_hide'}>
                <li className={'mypage_li'} >

                        <div style={{display:"flex",justifyContent:'space-between'}}>
                            <div style={{display:"flex"}} onClick={()=>spinfoClick(rv)}>
                            <img alt={''} src={spURL+rv.img_name} className={'mypage_sp_img'}
                                />
                            <div className={'mypage_sp_title_for_rv'}>
                                상품명 : {rv.sp_title}
                                <br/>
                                후기 : {rv.rv_txt}
                                &nbsp; ({marks[rv.rv_tmp/10].label + rv.rv_tmp}℃)
                            </div>
                            </div>
                            <a href={`/profile/${rv.fromuser}/1`}>
                            <div className={'mypage_fromuser_for_rv'}
                                 style={{cursor:'pointer'}}
                            //onClick={()=>navi(`/profile/${rv.fromuser}/1`)}
                            >
                                From.
                                <div className={'fromuser_prf'}>
                                    <img className={'fromuser_prf_img'}
                                         src={prfUrl+rv.prf_img}/>
                                </div>
                                <div >{rv.prf_nick}님</div>
                            </div>
                            </a>
                        </div>
                </li> </div>)
            }
            </ul>
        </div>
    );
}

export default ProfileGetRvList;