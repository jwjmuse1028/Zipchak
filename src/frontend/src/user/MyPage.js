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

function MyPage(props) {
    const ur_num=sessionStorage.ur_num;
    const [showlist,setShowlist]=useState(1);

    return (
        <div className={'mypage_otr_container'} >
            <h1 style={{textAlign:'center'}}>마이페이지</h1>
            <br/>
            <div className={'mypage_menu'}>
                <div className={'mypage_menu_each'}
                     style={{textDecoration: (showlist === 1 ) ?'underline':"none",textDecorationColor:'#35c5f0'}}
                     onClick={()=>setShowlist(1)}>전체 목록</div>|
                <div className={'mypage_menu_each'}
                     style={{textDecoration: (showlist === 2) ?'underline':"none",textDecorationColor:'#35c5f0'}}
                     onClick={()=>setShowlist(2)}>관심 목록</div>|
                <div className={'mypage_menu_each'}
                     style={{textDecoration: (showlist === 3) ?'underline':"none",textDecorationColor:'#35c5f0'}}
                     onClick={()=>setShowlist(3)}>내가 작성한 글</div>|
                <div className={'mypage_menu_each'}
                     style={{textDecoration: (showlist === 4) ?'underline':"none",textDecorationColor:'#35c5f0'}}
                     onClick={()=>setShowlist(4)}>구매/후기 리스트</div>
            </div>
            <br/>
            <div className={'mypage_container'}>
                <div style={{marginBottom:'30px'}}>
                    <div className={'mypage_prf_box'}>
                        <MypagePrfBox user={ur_num} />
                    </div>
                 </div>
                <div>
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