import React, {useEffect, useRef, useState} from 'react';
import {Button, MenuItem, Select, TextareaAutosize, TextField} from "@mui/material";
import {AddPhotoAlternateOutlined, CancelRounded} from "@material-ui/icons";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import white from "../image/white.png";

function ShopUpdateForm(props) {
    const [data,setData]=useState('');
    const [photo,setPhoto]=useState([]);
    const [newphoto,setNewphoto]=useState([]);

    const {sp_num,currentPage}=useParams();

    const url=sessionStorage.url+"/shop/detail?sp_num="+sp_num+"&currentPage="+currentPage;

    const navi = useNavigate();

    const selectData=()=>{
        axios.get(url)
            .then(res=>{
                setData(res.data);
                if(res.data.spphoto!='no'){
                    setPhoto(res.data.spphoto.split(","));
                }
            })
    }

    useEffect(()=>{
        selectData();
    },[]);

    //파일 업로드 이벤트
    const onUploadChange=(e)=>{
        let uploadUrl=sessionStorage.url+"/shop/upload2";
        //여러개의 파일 업로드시
        const uploadFile=new FormData();
        for(let i=0;i<e.target.files.length;i++)
        {
            uploadFile.append("uploadFile",e.target.files[i]);
        }

        axios({
            method:'post',
            url:uploadUrl,
            data:uploadFile,
            headers:{'Content-Type':'multipart/form-data'}
        }).then(res=>{
            setNewphoto(res.data);
        });

    }

    //수정 버튼 클릭시 호출
    const onSubmit=(e)=>{
        e.preventDefault();//submit의 기본 이벤트 무효화시킴
        let updateUrl=sessionStorage.url+"/shop/update";

        axios.post(updateUrl,data)
            .then(res=>{
                navi(`/shop/detail/${sp_num}/${currentPage}`);
            });

    }

    //img_name이 변경되면 useEffect가 호출, 새로고침할 경우 img_name의 값이 사라지기때문에 백엔드에서도 이미지 데이타가 다 클리어 되도록
    useEffect(() => {
        if(data.img_name.length==0){
            // console.log("image length 0");
            let url = sessionStorage.url+"/shop/imageclear";
            axios.get(url)
                .then(res=>{});
        }
    }, [data.img_name]);

    // const onPhotoDelete=(idx)=>{
    //     setImg_name(img_name.filter((a,i)=>i!==idx));
    //
    //     let url = sessionStorage.url+"/shop/imagedelete?idx="+idx;
    //     axios.delete(url)
    //         .then(res=>{
    //
    //         })
    // }
    const imgerror = (e) => {
        e.target.src = white
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type={"hidden"} value={data.sp_num}/>
                <table className={'table table-bordered'} style={{width:'40%', margin:"auto", borderColor:'white'}}>
                    <caption align={'top'}><h2>상품수정</h2></caption>
                    <tbody>
                    <tr><th></th></tr>
                    <tr>
                        <th style={{width:'20%'}}>제목&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                        <td style={{width:'80%'}}>
                            <TextField type={"text"} required placeholder={"상품 제목을 등록해주세요 (최대 20자)"} value={data.sp_title} variant={"standard"} style={{width:'100%'}}
                                       onChange={(e)=>{
                                           setData({
                                               ...data,
                                               sp_title:e.target.value
                                           })
                                       }}/>
                        </td>
                    </tr>
                    <tr>
                        <th>카테고리&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                        <td>
                            <Select variant={"standard"} style={{width:'50%'}} required>
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
                            <TextField type="number" value={data.pd_price} required placeholder={"숫자만 입력해주세요"} variant={"standard"} style={{width:'50%'}}/><b>원</b>

                        </td>
                    </tr>
                    <tr>
                        <th><br/>사진&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                        <td>
                            <input type={"file"} multiple id={'filephoto'} style={{visibility: 'hidden'}} accept="image/jpg, image/jpeg, image/png"
                                   onChange={onUploadChange}/><br/>
                            <AddPhotoAlternateOutlined onClick={()=>{
                                document.getElementById('filephoto').click();
                            }} style={{cursor:'pointer', color:'gray', fontSize:'5em',float:'left'}}/>
                            {
                                data.img_name.map((img,idx)=>
                                    <figure className={'photos'} key={idx}>
                                        <img alt={''}
                                             src={img} width={'80px'} height={'80px'} onError={imgerror}/>
                                        <figcaption>
                                            {/*<CancelRounded className={'imageclose'} style={{color:'gray'}}*/}
                                            {/*               onClick={()=>{*/}
                                            {/*                   onPhotoDelete(idx);*/}
                                            {/*               }}/>*/}
                                        </figcaption>
                                    </figure>
                                )
                            }

                        </td>
                    </tr>
                    <tr>
                        <th>내용&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                        <td>
                            <TextareaAutosize maxLength={10000} className={'form-control'} required placeholder={"여러 장의 상품 사진과 구입 연도, 브랜드, 사용감, 하자 유무 등 구매자에게 필요한 정보를 꼭 포함해 주세요. (10자 이상)\n" +
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

export default ShopUpdateForm;