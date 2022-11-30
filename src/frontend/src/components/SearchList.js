import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import axios from "axios";
import '../css/Search.css';
import SearchListSp from "./SearchListSp";
import SearchListFd from "./SearchListFd";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function SearchList(props) {
    let query=useQuery();
    const [fdlist,setFdlist]=useState([]);
    const [splist,setSplist]=useState([]);
    const [more,setMore]=useState(1);
    const [spviewlimit,setSpiewlimit]=useState(true);
    const [fdviewlimit,setFdiewlimit]=useState(true);
    const word=query.get("word");
    const searchtotal=()=>{
        let searchurl=localStorage.url+"/getsearchtotal?word="+word;
        axios.get(searchurl).then(res=>{
            setSplist(res.data.splist);
            setFdlist(res.data.fdlist);
        })
    }
    const clickmore=(num)=>{
        if(num===1){
            setMore(1);
            setSpiewlimit(true);
            setFdiewlimit(true);
        }
        else if(num===2){
            setMore(2);
            setSpiewlimit(false);
        }
        else if(num==3){
            setMore(3);
            setFdiewlimit(false);
        }
    }
    useEffect(()=>searchtotal(),[word]);
    return (
        <div className={'search_box'}>
            <div className={'mypage_menu'}>
                <div className={'mypage_menu_each'}
                     style={{textDecoration: (more === 1 ) ?'underline wavy #35c5f0 3px':"none"}}
                     onClick={()=>clickmore(1)}>&nbsp;전체 목록&nbsp;</div>|
                <div className={'mypage_menu_each'}
                     style={{textDecoration: (more === 2 ) ?'underline wavy #35c5f0 3px':"none"}}
                     onClick={()=>{clickmore(2);
                     }}>&nbsp;상품리스트&nbsp;</div>|
                <div className={'mypage_menu_each'}
                     style={{textDecoration: (more === 3 ) ?'underline wavy #35c5f0 3px':"none"}}
                     onClick={()=>clickmore(3)}>&nbsp;집들이 리스트&nbsp;</div>|
            </div><br/>
            <div className={more===1 || more===2?"list_show":"list_hide"}>
            <ul className={'search_ul_card'} >
                <div className={'search_title'} >상품 리스트
                    <span className={more===2?'list_hide':''+' search_more'}
                          onClick={()=>clickmore(2)}>더보기</span> </div>
                {spviewlimit?
                    splist.map((item,i)=>
                    i<4 &&  <SearchListSp item={item} key={i}/>)
                    :
                    splist.map((item,i)=>  <SearchListSp item={item} key={i}/>)
                }
            </ul>
            </div>
            <div className={more===1 || more===3?"list_show":"list_hide"}>
            <ul className={'search_ul_card'} >
                <div className={'search_title'} >집들이 리스트
                    <span className={more===3?'list_hide':''+' search_more'}
                          onClick={()=>clickmore(3)}>더보기</span></div>
                {fdviewlimit?
                    fdlist.map((item,i)=>i<4 &&  <SearchListFd item={item} key={i}/>)
                :
                    fdlist.map((item,i)=> <SearchListFd item={item} key={i}/>)
                }
            </ul>
            </div>
        </div>
    );
}

export default SearchList;