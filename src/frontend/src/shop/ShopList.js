import React, {useEffect, useState} from 'react';
import {Fab} from "@mui/material";
import AddIcon from '@material-ui/icons/Add';
import {useNavigate} from "react-router-dom";
import axios from "axios";


function ShopList(props) {
    const navi = useNavigate();
    const [list,setList]=useState([]);
    const imageUrl = sessionStorage.url+"/image/";

    const getList=()=>{
        let url = sessionStorage.url+"/shop/list";
        axios.get(url)
            .then(res=>{
                setList(res.data);
            })
    }
    useEffect(()=>{
        getList();
    },[])

    return (
        <div>
            <h1>중고 글 수:{list.length}개</h1>
            <Fab color="primary" aria-label="add" onClick={()=>{
                navi("/shop/insert");
            }}>
                <AddIcon />
            </Fab>
            {
                list && list.map((row,idx)=>
                    <div key={idx}>
                        {idx%4===0?<br/>:''}
                        <figure style={{float:"left", cursor:"pointer"}}>
                            <img src={imageUrl+row.photo}/>
                            <figcaption style={{textAlign:"center"}}>
                                <b>{row.sp_title}</b>
                            </figcaption>
                        </figure>
                    </div>
                )
            }
        </div>
    );
}

export default ShopList;