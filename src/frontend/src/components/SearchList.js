import React, {useEffect, useState} from 'react';
import { useLocation, useSearchParams} from 'react-router-dom';
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import axios from "axios";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function SearchList(props) {
    let query=useQuery();
    const [fdlist,setFdlist]=useState([]);
    const [splist,setSplist]=useState([]);
    const fdURL='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/fd_img/';
    const spURL='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/';
    const word=query.get("word");
    const searchtotal=()=>{
        let searchurl=localStorage.url+"/getsearchtotal?word="+word;
        axios.get(searchurl).then(res=>{
            setFdlist(res.data.fdlist);
            setSplist(res.data.splist);
        })
    }
    useEffect(()=>searchtotal(),[word]);
    return (
        <div>
            <div className={'mypage_title'} >상품 리스트  </div>
            <ul className={'mypage_ul_card'} >
                {splist.map((item,i)=>
                    i<3 &&
                    <div key={i} className={'mypage_li_card'}>
                        <img alt={''} src={spURL+item.img_first}
                             className={'mypage_sp_img_card'} />
                        <div className={'mypage_fd_title_card'}>{item.sp_title}</div>
                    </div>
                )
                }
            </ul>
            <div className={'mypage_title'} >집들이 리스트</div>
            <ul className={'mypage_ul_card'} >
                {fdlist.map((item,i)=>
                    i<3 &&
                    <div key={i} className={'mypage_li_card'}>
                        <img alt={''} src={fdURL+item.fd_num+"/"+item.fd_img}
                           className={'mypage_sp_img_card'} />
                        <div className={'mypage_fd_title_card'}>{item.fd_title}</div>
                    </div>
                )
                }
            </ul>
        </div>
    );
}

export default SearchList;