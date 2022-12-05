import React from 'react';
import UserTemp from "../user/UserTemp";

function KingPrf(props) {
    const {uinfo}=props;
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";
    return (
        <div className={'mypage_prf_img_nick_tmp'}>
            <div className={'mypage_prf_img_box'}>
                <img src={prfUrl+uinfo.prf_img} className={'mypage_prf_img'}/>
            </div>
            <div >
                <div className={'mypage_prf_nick_tmp'} >
                    <div className={'mypage_prf_nick'}>{uinfo.prf_nick}님</div>
                    <UserTemp prf_tmp={uinfo.prf_tmp}/>

                </div>
            </div>
        </div>
    );
}

export default KingPrf;