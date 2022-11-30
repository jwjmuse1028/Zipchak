import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";
import SearchListSp from "./SearchListSp";
import SearchListFd from "./SearchListFd";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function SearchMoreList(props) {
    const {more}=useParams();
    let query=useQuery();
    //const [fdlist,setFdlist]=useState([]);
    const [splist,setSplist]=useState([]);
    const word=query.get("word");
    const searchtotal=()=>{
        let searchurl=localStorage.url+"/getsearchtotal?word="+word;
        axios.get(searchurl).then(res=>{
            setSplist(res.data.splist);
            //setFdlist(res.data.fdlist);
        })
    }
    useEffect(()=>searchtotal(),[word]);
    return (
        <div className={'search_box'}>
                <div>
                    <div className={'search_title'} >상품 리스트
                        <span className={'search_more'} >더보기</span> </div>
                    <ul className={'search_ul_card'} >
                        {splist.map((item,i)=>
                            <SearchListSp item={item} key={i}/>)
                        }
                    </ul>
                </div>
            {/*    <div>*/}
            {/*        <div className={'search_title'} >집들이 리스트*/}
            {/*            <span className={'search_more'}>더보기</span></div>*/}
            {/*        <ul className={'search_ul_card'} >*/}
            {/*            {fdlist.map((item,i)=>*/}
            {/*                <SearchListFd item={item} key={i}/>)}*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*}*/}
            </div>
    );
}

export default SearchMoreList;