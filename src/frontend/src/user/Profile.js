import React, {useEffect, useState} from 'react';
import ProfileGetRvList from "./ProfileGetRvList";
import {useParams} from "react-router-dom";
import MypagePrfBox from "./MypagePrfBox";
import MyPageSellList from "./MyPageSellList";
import MyPageFeedList from "./MyPageFeedList";

function Profile(props) {
    const {user}=useParams();
    const [showlist,setShowlist]=useState(1);
    const clickmenu=(num)=>{
        setShowlist(num);
        window.history.pushState("", null, '/mypage/'+num);
    }
    return (
        <div className={'mypage_otr_container'} >
            <div className={'mypage_prf_subject'}>프로필</div>
            <br/>
            <div className={'mypage_menu'}>
                <div className={'mypage_menu_each'}
                     style={{textDecoration: (showlist === 1 ) ?'underline wavy #35c5f0 3px':"none"}}
                     onClick={()=>clickmenu(1)}>&nbsp;전체 목록&nbsp;</div>|
                <div className={'mypage_menu_each'}
                     style={{textDecoration: (showlist === 2 ) ?'underline wavy #35c5f0 3px':"none"}}
                     onClick={()=>clickmenu(2)}>&nbsp;작성한 글&nbsp;</div>|
                <div className={'mypage_menu_each'}
                     style={{textDecoration: (showlist === 3 ) ?'underline wavy #35c5f0 3px':"none"}}
                     onClick={()=>clickmenu(3)}>&nbsp;후기 리스트&nbsp; </div>
            </div>
            <br/>
            <div className={'mypage_container'}>
                <div style={{marginBottom:'30px'}}>
                    <div className={'mypage_prf_box'} >
                        <MypagePrfBox user={user} isprf={1}/>
                    </div>
                </div>
                <div style={{marginLeft:'30px'}}>
                    <div className={(showlist === 1 || showlist === 2) ? "list_show" : "list_hide"}>
                        <MyPageFeedList user={user} />
                    </div >
                    <div className={(showlist === 1 || showlist === 2) ? "list_show" : "list_hide"}>
                        <MyPageSellList user={user} />
                    </div>
                    <div className={(showlist === 1 || showlist === 3) ? "list_show" : "list_hide"}>
                        <ProfileGetRvList user={user} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;