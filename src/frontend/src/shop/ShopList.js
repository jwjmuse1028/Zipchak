import React, {useEffect, useState} from 'react';
import {Fab, Link} from "@mui/material";
import AddIcon from '@material-ui/icons/Add';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Create} from "@material-ui/icons";

function ShopList({currentPage}) {
    const navi = useNavigate();
    const [data, setData]=useState('');
    const imageUrl = sessionStorage.url+"/image/";

    const getList=()=>{
        let url = sessionStorage.url+"/shop/list?currentPage="+currentPage;
        axios.get(url)
            .then(res=>{
                setData(res.data);
            })
    }
    useEffect(()=>{ //currentPage값이 변경 될때마다 함수 다시 호출
        getList();
    },[currentPage]);

    return (
        <div>
            <h1>중고 글 수:{data.length}개</h1>
            <Fab color="primary" onClick={()=>{
                navi("/shop/insert");
            }}>
                <Create />
            </Fab>
            {
                data.list && data.list.map((row,idx)=>
                    <div key={idx}>
                        {idx%4===0?<br style={{clear:'both'}}/>:''}
                        <figure style={{float:"left", cursor:"pointer"}}>
                            <img src={imageUrl+row.img_name}/>
                            <figcaption style={{textAlign:"center"}}>
                                <b>{row.sp_title}</b>
                            </figcaption>
                        </figure>
                    </div>
                )
            }
            <div style={{textAlign:'center'}}>
                {
                    data.startPage>1?
                        <Link to={`/board/list/${data.startPage-1}`} className={'pagenum'}>prev</Link> : ''
                }
                {
                    data.parr &&
                    data.parr.map((n,i)=>
                        <Link to={`/board/list/${n}`} className={'pagenum'}>
                            <b style={{color:n==currentPage?'red':'black'}}>{n}</b></Link>)
                }
                {
                    data.endPage<data.totalPage?
                        <Link to={`/board/list/${data.endPage+1}`} className={'pagenum'}>next</Link> : ''
                }
            </div>
        </div>
    );
}

export default ShopList;