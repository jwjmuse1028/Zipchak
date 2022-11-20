import React, {useEffect, useState} from 'react';
import '../css/MyPage.css';
import MyPageBuyList from "./MyPageBuyList";
import ProfileGetRvList from "./ProfileGetRvList";

function MyPage(props) {
    const ur_num=sessionStorage.ur_num;

    return (
        <div>
            <h1>마이페이지</h1>
            <div>
                <MyPageBuyList/>
            </div>

        </div>
    );
}

export default MyPage;