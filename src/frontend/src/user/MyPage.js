import React, {useEffect, useState} from 'react';
import '../css/MyPage.css';
import MyPageBuyList from "./MyPageBuyList";
import ProfileGetRvList from "./ProfileGetRvList";
import UserTemp from "./UserTemp";
import IconButton from "@material-ui/core/IconButton";
import {BookmarkBorder, FavoriteBorder} from "@material-ui/icons";
import axios from "axios";
import MypagePrfBox from "./MypagePrfBox";

function MyPage(props) {
    const ur_num=sessionStorage.ur_num;

    return (
        <div className={'mypage_otr_container'} >
            <h1 style={{textAlign:'center'}}>마이페이지</h1>
            <div className={'mypage_container'}>
                <div className={'mypage_prf_box'}>
                    <MypagePrfBox user={ur_num} />
                    <hr/>
                    <div style={{textAlign:'center', gap:'20px'}}>
                        <IconButton >
                            <BookmarkBorder style={{fontSize:'30px'}}/>
                        </IconButton>
                        <IconButton >
                            <FavoriteBorder style={{fontSize:'30px'}}/>
                        </IconButton>
                    </div>
                </div>
                <div>
                    <MyPageBuyList/>
                </div>
            </div>
        </div>
    );
}

export default MyPage;