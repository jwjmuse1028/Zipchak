import React, {useEffect, useState} from 'react';
import ProfileGetRvList from "./ProfileGetRvList";
import {useParams} from "react-router-dom";
import MypagePrfBox from "./MypagePrfBox";
import MyPageSellList from "./MyPageSellList";
import MyPageFeedList from "./MyPageFeedList";

function Profile(props) {
    const {user}=useParams();

    return (
        <div className={'mypage_otr_container'} >
            <h1 style={{textAlign:'center'}}>프로필</h1>
            <div className={'mypage_container'}>
                <div style={{marginBottom:'30px'}}>
                    <div className={'mypage_prf_box'}>
                        <MypagePrfBox user={user}/>
                    </div>
                </div>
                <div>
                    <MyPageFeedList user={user}/>
                    <MyPageSellList user={user}/>
                    <ProfileGetRvList user={user}/>
                </div>
            </div>
        </div>
    );
}

export default Profile;