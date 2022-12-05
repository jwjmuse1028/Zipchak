import React from 'react';
import UserTemp from "../user/UserTemp";
import {useNavigate} from "react-router-dom";
import crown from "../image/crown.png";
function KingPrf(props) {
    const {uinfo}=props;
    const navi=useNavigate();
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";
    return (
        <div className={'king_prf_img_nick_tmp'}>
            <br/>
            <div className={'king_prf_img_box'}>
                <img src={prfUrl+uinfo.prf_img} className={'king_prf_img'}
                     onClick={()=>navi(`/profile/${uinfo.ur_num}/1`)}
                />
            </div>
            <img src={crown} style={{position:"relative",top:'-120px',width:'50px',left:'90px',rotate:'30deg'}}/>
            <div style={{position:"relative",top:'-30px'}}>
                <div className={'king_prf_nick_tmp'} >
                    <div className={'king_prf_nick'}>{uinfo.prf_nick}님</div>
                    <UserTemp prf_tmp={uinfo.prf_tmp}/>

                </div>
            </div>

        </div>
    );
}

export default KingPrf;