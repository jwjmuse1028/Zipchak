import React from 'react';
import {useNavigate} from "react-router-dom";

function SearchListSp(props) {
    const {item}=props;
    const spURL='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/';
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";
    const navi=useNavigate();
    const spinfoClick=(item)=>{
        navi(`/shop/detail/${item.pd_num}/${item.sp_num}/1`);
    }
    return (
            <div className={'search_li_card'}>
                <img alt={''} src={spURL+item.img_first}
                     className={'search_sp_img_card'}   onClick={()=>spinfoClick(item)}/>
                <div className={'search_sp_title_card'}>{item.sp_title}</div>
                <div className={'search_pd_status_card'}>
                    <span style={{color:item.pd_status==='onsale'?"black":"gray",
                        textDecoration:item.pd_status==='onsale'?"none":"line-through"
                    }}> {item.pd_price}원 </span> &nbsp; &nbsp;
                    {
                    item.pd_status==='onsale'?'판매중':'판매완료'
                }</div>
                <div className={'search_prf_box'}>
                    <div className={'search_prf_img_box'}>
                        <img className={'search_prf_img'}
                             src={prfUrl+item.prf_img}/>
                    </div>
                    <div className={'search_prf_nick'}>{item.prf_nick}</div>
                </div>
            </div>
    );
}

export default SearchListSp;