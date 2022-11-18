import React, {useEffect, useRef, useState} from 'react';
import {Button, MenuItem, Select, TextareaAutosize, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "../css/ShopList.css";
import {AddPhotoAlternateOutlined, CancelRounded} from "@material-ui/icons";
import white from "../image/white.png"

function ShopInsertForm(props) {
    const [sp_title, setSp_title]=useState('');
    const [pd_ctg, setPd_ctg]=useState('');
    const [pd_price, setPd_price]=useState('');
    const [img_name, setImg_name]=useState([]);

    const sp_txtRef = useRef('');

    const navi = useNavigate();

    // const changeEnteredNum = (e: ChangeEvent<HTMLInputElement>) => {
    //     const value: string = e.target.value;
    //     const removedCommaValue: number = Number(value.replaceAll(",", ""));
    //     setPd_price(removedCommaValue.toLocaleString());
    // };

    // const imageUrl = sessionStorage.url+"/image/";
    const uploadPhoto=(e)=>{
        // if(img_name.length==10){
        //     alert("사진은 10장까지만 첨부 가능합니다");
        //     return;
        // }
        let uploadUrl = sessionStorage.url+"/shop/upload";

        let total=img_name.length+e.target.files.length; //사진 10장 제한
        if(total>10){
            alert("사진은 10장까지만 첨부 가능합니다");
            return;
        }

        const uploadFile = new FormData();
        for(let i=0;i<e.target.files.length;i++) {
            uploadFile.append("uploadFile", e.target.files[i]);
        }
        axios({
            method:'post',
            url:uploadUrl,
            data:uploadFile,
            headers:{'Content-Type':'multipart/form-data'}
        }).then(res=>{
            setImg_name(res.data);
        });
    }

    //img_name이 변경되면 useEffect가 호출, 새로고침할 경우 img_name의 값이 사라지기때문에 백엔드에서도 이미지 데이타가 다 클리어 되도록
    useEffect(() => {
        if(img_name.length==0){
            // console.log("image length 0");
            let url = sessionStorage.url+"/shop/imageclear";
            axios.get(url)
                .then(res=>{});
        }
    }, [img_name]);

    const onSubmit=(e)=>{
        e.preventDefault();

        const ur_num=sessionStorage.ur_num;
        const sp_txt=sp_txtRef.current.value;

        let url = localStorage.url+"/shop/insert";

        axios.post(url, {ur_num, sp_title, pd_ctg, pd_price, sp_txt})
            .then(res=>{
                setSp_title('');
                setPd_ctg('');
                setPd_price('');
                sp_txtRef.current.value='';
                navi(`/shop/detail/${res.data.pd_num}/${res.data.sp_num}/1`); //일단 리스트로하고 나중에 바꾼다 디테일로 바로가게 max num
            });
    }

   const onPhotoDelete=(idx)=>{
        setImg_name(img_name.filter((a,i)=>i!==idx));

       let url = sessionStorage.url+"/shop/imagedelete?idx="+idx;
       axios.delete(url)
           .then(res=>{

           })

   }
    // const imgerror = (e) => {
    //     e.target.src = white
    // }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <table className={'table table-bordered'} style={{width:'40%', margin:"auto", borderColor:'white'}}>
                    <caption align={'top'}><h2>상품등록</h2></caption>
                    <tbody>
                        <tr><th></th></tr>
                        <tr>
                            <th style={{width:'20%'}}>제목&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td style={{width:'80%'}}>
                                <TextField type={"text"} required placeholder={"상품 제목을 등록해주세요 (최대 20자)"} inputProps={{ maxLength: 20 }} variant={"standard"} style={{width:'100%'}}
                                           onChange={(e)=>setSp_title(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>카테고리&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td>
                                <Select variant={"standard"} style={{width:'50%'}} required
                                onChange={(e)=>setPd_ctg(e.target.value)}>
                                    {/*<MenuItem value={'선택해주세요'} selected disabled placeholder={"선택해주세요"}>카테고리를 선택해주세요</MenuItem>*/}
                                    <MenuItem value={'남성의류'}>남성의류</MenuItem>
                                    <MenuItem value={'여성의류'}>여성의류</MenuItem>
                                    <MenuItem value={'신발'}>신발</MenuItem>
                                    <MenuItem value={'가방'}>가방</MenuItem>
                                    <MenuItem value={'시계/쥬얼리'}>시계/쥬얼리</MenuItem>
                                    <MenuItem value={'액세서리'}>액세서리</MenuItem>
                                    <MenuItem value={'디지털/가전'}>디지털/가전</MenuItem>
                                    <MenuItem value={'스포츠/레저'}>스포츠/레저</MenuItem>
                                    <MenuItem value={'차량/오토바이'}>차량/오토바이</MenuItem>
                                    <MenuItem value={'스타굿즈'}>스타굿즈</MenuItem>
                                    <MenuItem value={'키덜트'}>키덜트</MenuItem>
                                    <MenuItem value={'예술/희귀/수집품'}>예술/희귀/수집품</MenuItem>
                                    <MenuItem value={'음반/악기'}>음반/악기</MenuItem>
                                    <MenuItem value={'도서/티켓/문구'}>도서/티켓/문구</MenuItem>
                                    <MenuItem value={'뷰티/미용'}>뷰티/미용</MenuItem>
                                    <MenuItem value={'가구/인테리어'}>가구/인테리어</MenuItem>
                                    <MenuItem value={'생활/가공식품'}>생활/가공식품</MenuItem>
                                    <MenuItem value={'유아동/출산'}>유아동/출산</MenuItem>
                                    <MenuItem value={'반려동물용품'}>반려동물용품</MenuItem>
                                    <MenuItem value={'기타'}>기타</MenuItem>
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <th>가격&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td>
                                {/*<TextField type={"number"} required placeholder={"숫자만 입력해주세요"} variant={"standard"} style={{width:'50%'}}/><b>원</b>*/}
                                <TextField type="number" max value={pd_price} required placeholder={"숫자만 입력해주세요 (최대 9자)"} variant={"standard"} style={{width:'50%'}}
                                           onChange={e => setPd_price(e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,9))}/><b>원</b>

                            </td>
                        </tr>
                        <tr>
                            <th><br/>사진&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td>
                                <input type={"file"} multiple id={'filephoto'} required style={{visibility: 'hidden'}} accept="image/jpg, image/jpeg, image/png"
                                       onChange={uploadPhoto}/><br/>
                                <AddPhotoAlternateOutlined onClick={()=>{
                                    document.getElementById('filephoto').click();
                                }} style={{cursor:'pointer', color:'gray', fontSize:'5em',float:'left'}}/>
                                  {
                                       img_name.map((img,idx)=>
                                           <figure className={'photos'} key={idx}>
                                               <img alt={''}
                                                    src={`https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/${img}`} width={'80px'} height={'80px'}/>
                                               <figcaption>
                                                   <CancelRounded className={'imageclose'} style={{color:'gray'}}
                                                   onClick={()=>{
                                                       onPhotoDelete(idx);
                                                   }}/>
                                               </figcaption>
                                               {
                                                   idx==0?
                                                       <span className={'firstimage'}>대표이미지</span>:''
                                               }
                                           </figure>
                                       )
                                   }

                            </td>
                        </tr>
                        <tr>
                            <th>내용&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td>
                                <TextField multiline ref={sp_txtRef} style={{width:'100%'}} required
                                           placeholder={"여러 장의 상품 사진과 구입 연도, 브랜드, 사용감, 하자 유무 등 구매자에게 필요한 정보를 꼭 포함해 주세요. (10자 이상)\n" +
                                    "안전하고 건전한 거래 환경을 위해 과학기술정보통신부, 한국인터넷진흥원과 함께 합니다."}/>
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td align={"center"}>
                                <Button type={"submit"} color={"info"} variant={"contained"}>상품등록</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default ShopInsertForm;