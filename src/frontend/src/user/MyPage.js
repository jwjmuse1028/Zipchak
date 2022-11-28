import React, {useEffect, useState} from 'react';
import '../css/MyPage.css';
import MyPageBuyList from "./MyPageBuyList";
import IconButton from "@material-ui/core/IconButton";
import {BookmarkBorder, FavoriteBorder} from "@material-ui/icons";
import MypagePrfBox from "./MypagePrfBox";
import MyPageFeedList from "./MyPageFeedList";
import MyPageSellList from "./MyPageSellList";
import ProfileGetRvList from "./ProfileGetRvList";
import MyPageBookmarkList from "./MyPageBookmarkList";
import MyPageLikeList from "./MyPageLikeList";
import {useParams} from "react-router-dom";

function MyPage(props) {
    const {show}=useParams();
    const ur_num=sessionStorage.ur_num;
    const [showlist,setShowlist]=useState(Number(show));
    const clickmenu=(num)=>{
        setShowlist(num);
        window.history.pushState("", null, '/mypage/'+num);
    }
    return (
        <div className={'mypage_otr_container'} >
            <div className={'mypage_prf_subject'} >마이페이지</div>
            <br/>
            <div className={'mypage_menu'}>
                <div className={'mypage_menu_each'}
                     style={{textDecoration: (showlist === 1 ) ?'underline wavy #35c5f0 3px':"none"}}
                     onClick={()=>clickmenu(1)}>&nbsp;전체 목록&nbsp;</div>|
                <div className={'mypage_menu_each'}
                     style={{textDecoration: (showlist === 2 ) ?'underline wavy #35c5f0 3px':"none"}}
                     onClick={()=>{clickmenu(2);
                     }}>&nbsp;관심 목록&nbsp;</div>|
                <div className={'mypage_menu_each'}
                     style={{textDecoration: (showlist === 3 ) ?'underline wavy #35c5f0 3px':"none"}}
                     onClick={()=>clickmenu(3)}>&nbsp;내가 작성한 글&nbsp;</div>|
                <div className={'mypage_menu_each'}
                     style={{textDecoration: (showlist === 4 ) ?'underline wavy #35c5f0 3px':"none"}}
                     onClick={()=>clickmenu(4)}>&nbsp;구매/후기 리스트&nbsp; </div>
            </div>
            <br/>
            <div className={'mypage_container'}>
                <div style={{marginBottom:'30px'}}>
                    <div className={'mypage_prf_box'}>
                        <MypagePrfBox user={ur_num} isprf={0} />
                    </div>
                 </div>
                <div style={{marginLeft:'30px'}}>
                    <div className={(showlist === 1 || showlist === 2) ? "list_show" : "list_hide"}>
                        <MyPageLikeList />
                    </div>
                    <div className={(showlist === 1 || showlist === 2) ? "list_show" : "list_hide"}>
                        <MyPageBookmarkList/>
                    </div>
                    <div className={(showlist === 1 || showlist === 3) ? "list_show" : "list_hide"}>
                        <MyPageFeedList user={ur_num}/>
                    </div>
                    <div className={(showlist === 1 || showlist === 3) ? "list_show" : "list_hide"}>
                        <MyPageSellList user={ur_num}/>
                    </div>
                    <div className={(showlist === 1 || showlist === 4) ? "list_show" : "list_hide"}>
                        <MyPageBuyList/>
                    </div>
                    <div className={(showlist === 1 || showlist === 4) ? "list_show" : "list_hide"}>
                        <ProfileGetRvList user={ur_num}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPage;