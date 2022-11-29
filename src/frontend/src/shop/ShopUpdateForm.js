import React, {useEffect, useRef, useState} from 'react';
import {Button, MenuItem, Select, TextareaAutosize, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
// import "../css/ShopList.css";
import {AddPhotoAlternateOutlined, CancelRounded} from "@material-ui/icons";
import white from "../image/white.png"

function ShopUpdateForm(props) {

    const [shopdata, setShopdata]=useState('');
    const [img_name, setImg_name]=useState([]);
    const [newImage, setNewImage]=useState([]);

    const navi = useNavigate();
    const {pd_num,sp_num, currentPage} = useParams();
    // console.log("spnum="+sp_num+"pdnum="+pd_num+"cp="+currentPage);
    const url=sessionStorage.url+"/shop/updateform?sp_num="+sp_num;

    const getShopData=()=>{ //해당 디테일의 기존의 데이타 불러옴
        axios.get(url)
            .then(res=>{
                // console.dir(res.data);
                setShopdata(res.data);
                // console.log("sp_num="+res.data.sp_num);
                // console.log("pd_num="+res.data.pd_num);

                setImg_name(res.data.images);
            })
        }
    useEffect(()=>{
        getShopData();
    },[]);

    // const uploadPhoto=(e)=>{
    //
    //     let uploadUrl = sessionStorage.url+"/shop/upload2";
    //
    //     let total=img_name.length+e.target.files.length; //사진 10장 제한
    //     if(total>10){
    //         alert("사진은 10장까지만 첨부 가능합니다");
    //         return;
    //     }
    //
    //     const uploadFile = new FormData();
    //     for(let i=0;i<e.target.files.length;i++) {
    //         uploadFile.append("uploadFile", e.target.files[i]);
    //     }
    //     axios({
    //         method:'post',
    //         url:uploadUrl,
    //         data:uploadFile,
    //         headers:{'Content-Type':'multipart/form-data'}
    //     }).then(res=>{
    //         // setImg_name(res.data);
    //         //setNewImage(res.data);
    //         setImg_name([
    //             ...img_name,
    //             res.data
    //         ])
    //     });
    // }

    // useEffect(() => {
    //     if(img_name.length==0){
    //         // console.log("image length 0");
    //         let url = sessionStorage.url+"/shop/imageclear";
    //         axios.get(url)
    //             .then(res=>{});
    //     }
    // }, [img_name]);

    // const onPhotoDelete=(idx)=>{
    //     setImg_name(img_name.filter((a,i)=>i!==idx));
    //
    //     let url = sessionStorage.url+"/shop/imagedelete?idx="+idx;
    //     axios.delete(url)
    //         .then(res=>{
    //
    //         })
    // }

    const onSubmit=(e)=>{
        e.preventDefault();
        let url = sessionStorage.url+"/shop/update";

        axios.post(url, shopdata)
            .then(res=>{
                navi(`/shop/detail/${pd_num}/${sp_num}/${currentPage}`);
            })
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <table className={'table table-bordered'} style={{width:'40%',minWidth:'500px', margin:"auto", borderColor:"white"}}>
                    <caption align={'top'}><h2>상품수정</h2></caption>
                    <tbody>
                    <tr><th></th></tr>
                    <tr>
                        <th style={{width:'20%'}}>제목&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                        <td style={{width:'80%'}}>
                            <TextField type={"text"} required placeholder={"상품 제목을 등록해주세요 (최대 20자)"} inputProps={{ maxLength: 20 }} variant={"standard"} style={{width:'100%'}}
                                       value={shopdata.sp_title}
                                       onChange={(e)=>{
                                           setShopdata({
                                               ...shopdata,
                                               sp_title:e.target.value
                                           });
                                       }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>카테고리&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>

                        <td>{
                            shopdata &&
                            <Select variant={"standard"} style={{width: '50%'}} required
                                // renderValue={pd_ctg !== "" ? undefined : () => "카테고리를 선택해주세요"} displayEmpty
                                    defaultValue={shopdata.pd_ctg}
                                    onChange={(e) => {
                                        setShopdata({
                                            ...shopdata,
                                            pd_ctg: e.target.value
                                        })
                                    }}
                            >
                                {/*<MenuItem value={'선택해주세요'} selected disabled placeholder={"선택주세요"}>카테고리를 선택해주세요</MenuItem>*/}
                                <MenuItem value={'가구'}>가구</MenuItem>
                                <MenuItem value={'데코'}>데코</MenuItem>
                                <MenuItem value={'식물'}>식물</MenuItem>
                                <MenuItem value={'패브릭'}>패브릭</MenuItem>
                                <MenuItem value={'가전·디지털'}>가전·디지털</MenuItem>
                                <MenuItem value={'주방용품'}>주방용품</MenuItem>
                                <MenuItem value={'조명'}>조명</MenuItem>
                                <MenuItem value={'수납·정리'}>수납·정리</MenuItem>
                                <MenuItem value={'생활용품'}>생활용품</MenuItem>
                                <MenuItem value={'생필품'}>생필품</MenuItem>
                                <MenuItem value={'유아·아동'}>유아·아동</MenuItem>
                                <MenuItem value={'반려동물'}>반려동물</MenuItem>
                                <MenuItem value={'실내운동'}>실내운동</MenuItem>
                                <MenuItem value={'캠핑용품'}>캠핑용품</MenuItem>
                                <MenuItem value={'공구·DIY'}>공구·DIY</MenuItem>
                                <MenuItem value={'기타'}>기타</MenuItem>
                            </Select>
                        }
                        </td>
                    </tr>
                    <tr>
                        <th>가격&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                        <td>
                            {/*<TextField type={"number"} required placeholder={"숫자만 입력해주세요"} variant={"standard"} style={{width:'50%'}}/><b>원</b>*/}
                            <TextField type="number" max required placeholder={"숫자만 입력해주세요 (최대 9자)"} variant={"standard"} style={{width:'50%'}}

                                       value={shopdata.pd_price}
                                       onChange={(e) => {
                                           setShopdata({
                                               ...shopdata,
                                               pd_price:e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,9)
                                           });
                                           // setShopdata(e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,9))
                                           }}
                            /><b>원</b>

                        </td>
                    </tr>
                    <tr>
                        <th rowSpan={2}><br/>사진&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                        <td>
                            {/*<input type={"file"} multiple id={'filephoto'} required style={{visibility: 'hidden'}} accept="image/jpg, image/jpeg, image/png"*/}
                            {/*       onChange={uploadPhoto}/><br/>*/}
                            {/*<AddPhotoAlternateOutlined onClick={()=>{*/}
                            {/*    document.getElementById('filephoto').click();*/}
                            {/*}} style={{cursor:'pointer', color:'gray', fontSize:'5em',float:'left'}}/>*/}
                            {
                                img_name.map((img,idx)=>
                                    <figure className={'photos'} key={idx}>
                                        <img alt={''}
                                             src={`https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/${img}`} width={'80px'} height={'80px'}/>
                                        {/*<figcaption>*/}
                                        {/*    <CancelRounded className={'imageclose'} style={{color:'gray'}}*/}
                                        {/*                   onClick={()=>{*/}
                                        {/*                       onPhotoDelete(idx);*/}
                                        {/*                   }}/>*/}
                                        {/*</figcaption>*/}
                                        {/*{*/}
                                        {/*    idx==0?*/}
                                        {/*        <span className={'firstimage'}>대표이미지</span>:''*/}
                                        {/*}*/}
                                    </figure>
                                )
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style={{color:'red'}}>
                                <b>※사기 방지를 위해 첨부 이미지 수정 및 삭제는 불가합니다.</b><br/>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th><br/><br/>내용&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                        <td>
                                <textarea className={'form-control'} style={{width:'100%', height:'200px', boxShadow:"none"}} required
                                          placeholder={"여러 장의 상품 사진과 구입 연도, 브랜드, 사용감, 하자 유무 등 구매자에게 필요한 정보를 꼭 포함해 주세요. (10자 이상)\n" +
                                              "안전하고 건전한 거래 환경을 위해 과학기술정보통신부, 한국인터넷진흥원과 함께 합니다."}
                                          value={shopdata.sp_txt}
                                          onChange={(e)=>{
                                              setShopdata({
                                                  ...shopdata,
                                                  sp_txt:e.target.value
                                              })
                                          }}/>
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td align={"center"}>
                            <Button type={"submit"} style={{backgroundColor:'#35c5f0'}} variant={"contained"}>상품수정</Button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default ShopUpdateForm;