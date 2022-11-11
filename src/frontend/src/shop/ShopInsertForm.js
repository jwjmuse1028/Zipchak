import React, {useRef, useState} from 'react';
import {Button, MenuItem, Select, TextareaAutosize, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "../css/Shop.css";



function ShopInsertForm(props) {
    const [sp_title, setSp_title]=useState('');
    const [pd_ctg, setPd_ctg]=useState('');
    const [pd_price, setPd_price]=useState('');
    const [img_name, setImg_name]=useState('');
    const sp_txtRef = useRef('');

    const navi = useNavigate();

    const imageUrl = sessionStorage.url+"/image/";
    const uploadPhoto=(e)=>{
        let uploadUrl = sessionStorage.url+"/image/upload";

        const uploadFile = new FormData();
        uploadFile.append("uploadFile", e.target.files[0]);

        axios({
            method:'post',
            url:uploadUrl,
            data:uploadFile,
            headers:{'Content-Type':'multipart/form-data'}
        }).then(res=>{
            setImg_name(res.data);
        });
    }

    const onSubmit=(e)=>{
        e.preventDefault();

        const ur_id=sessionStorage.ur_id;
        const prf_nick=sessionStorage.prf_nick;
        const prf_img=sessionStorage.prf_img;
        const sp_txt=sp_txtRef.current.value;

        let url = localStorage.url+"/shop/insert";

        axios.post(url, {ur_id, prf_nick, prf_img, sp_title, pd_ctg, pd_price, img_name, sp_txt})
            .then(res=>{
                setSp_title('');
                setPd_ctg('');
                setPd_price('');
                setImg_name('');
                sp_txtRef.current.value='';
                navi("/shop/list");
            });
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <table className={'table table-bordered'} style={{width:'40%', margin:"auto", borderColor:'white'}}>
                    <caption align={'top'}><h1>상품등록</h1></caption>
                    <tbody>
                        <tr><th></th></tr>
                        <tr>
                            <th style={{width:'20%'}}>제목&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td style={{width:'80%'}}>
                                <TextField id="standard-basic" required placeholder={"상품 제목을 등록해주세요"} variant={"standard"} style={{width:'100%'}}
                                           onChange={(e)=>setSp_title(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>카테고리&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td>
                                <Select variant={"standard"} style={{width:'50%'}} required>
                                    <MenuItem value={''} selected disabled>카테고리를 선택해주세요</MenuItem>
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
                                <TextField type={"number"} required placeholder={"숫자만 입력해주세요"} variant={"standard"} style={{width:'50%'}}
                                           onChange={(e)=>setPd_price(e.target.value)}/><b>원</b>
                            </td>
                        </tr>
                        <tr>
                            <th>사진&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td>
                                <input type={"file"} variant={"standard"} multiple onChange={uploadPhoto}/>
                                <br/>
                                <img src={imageUrl+img_name}/>
                            </td>
                        </tr>
                        <tr>
                            <th>내용&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td>
                                <TextareaAutosize className={'form-control'} ref={sp_txtRef} required placeholder={"여러 장의 상품 사진과 구입 연도, 브랜드, 사용감, 하자 유무 등 구매자에게 필요한 정보를 꼭 포함해 주세요. (10자 이상)\n" +
                                    "안전하고 건전한 거래 환경을 위해 과학기술정보통신부, 한국인터넷진흥원과 함께 합니다."} style={{width:'100%', height:'300px', boxShadow:"none"}}/>
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