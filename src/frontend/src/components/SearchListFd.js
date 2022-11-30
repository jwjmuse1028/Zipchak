import React from 'react';
import {useNavigate} from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

function SearchListFd(props) {
    const {item}=props;
    const fdURL='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/fd_img/';
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";
    const navi=useNavigate();
    const fdinfoClick=(item)=>{
        navi(`/feed/detail/${item.fd_num}`);
    }
    return (
            <div  className={'search_li_card'}>
                <img alt={''} src={fdURL+item.fd_num+"/"+item.fd_img}
                     className={'search_sp_img_card'}
                     onClick={()=>fdinfoClick(item)}/>
                <div className={'search_fd_title_card'}>{item.fd_title}</div>
                <div className={'search_prf_box'}>
                    <div className={'search_prf_img_box'}>
                        <img className={'search_prf_img'}
                             src={prfUrl+item.prf_img}/>
                    </div>
                    <div className={'search_prf_nick'}>{item.prf_nick}</div>
                </div>
                <div style={{textAlign:"center",fontSize:'15px',color:'gray'}}>
                    <span style={{marginRight:'5px'}}>좋아요 {item.fd_likes}</span>·
                    <span >조회 {item.fd_rdcnt}</span>
                </div>
            </div>
    );
}

export default SearchListFd;