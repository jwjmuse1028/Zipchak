import React, {useEffect, useState} from 'react';
import "../css/FeedForm.css";

import {Editor} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import axios from "axios";

import {useNavigate} from "react-router-dom";


function FeedInsertForm(props) {

    //이미지 미리보기
    const [pre_img, setPre_img] = useState('');
    const [img, setImg] = useState('');

    //현재로그인한 user 정보
    const ur_num = sessionStorage.ur_num;

    const navi = useNavigate();

    //정규식 표현 - 평수 넣을 때 숫자아닌 것 들어가면 메세지 출력
    const regex = /[0-9]/

    const [data, setData] = useState({
        fd_title: '',
        fd_spc: '',
        fd_lvtp: '',
        fd_fml: '',
        fd_style: '',
        ur_num:ur_num
    })

    const [errors, setErrors] = useState({
        fd_title: '',
        fd_spc: '',
        fd_lvtp: '',
        fd_fml: '',
        fd_style: ''
    })


    //onClick 시 touched=true로 변경
    const [touched, setTouched] = useState({
        fd_title: false,
        fd_spc: false,
        fd_lvtp: false,
        fd_fml: false,
        fd_style: false
    })

    const onChangeData = (e) => {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value,
        })

        //빈 값 없는지 확인
        validate(e);

    }

    //onClick 시 touched=true로 변경
    const onClickData=(e)=>{
        setTouched({
            ...touched,
            [e.target.name]: true,
        })
        validate(e);
    }

    const validate=(e)=>{

        if(!e.target.value)
        {
            setErrors({
                ...errors,
                [e.target.name]:"empty error",
            });
        }
        else{
            setErrors({
                ...errors,
                [e.target.name]:"",
            });
        }

    }

    const url = localStorage.url;

    //파일 업로드 이벤트-업로드하면 프론트 pre_img에 저장 및 미리보기
    //백 Service에 MultipartFile로 저장해놓고 업로드는 insert 할때 하기
    const onUploadChange = (e) => {
        e.preventDefault();

        const file = e.target.files[0];

        //upload 메서드로 보내기
        const imageFile = new FormData();
        imageFile.append("file", file);

        let uploadUrl = url + "/feed/upload";

        axios({
            method: 'post',
            url: uploadUrl,
            data: imageFile,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
            console.log("file 저장 성공");
        });

        //미리보기 위해 fileReader에 넣기
        const fileReader = new FileReader();

        if (file) {
            fileReader.readAsDataURL(file)
        }
        fileReader.onload = () => {
            setPre_img(fileReader.result);
        }

    }

    const onSubmitEvent = (e) => {
        e.preventDefault();

        //insert 메서드로 보내기

        let insertUrl = localStorage.url + "/feed/insert";

        const config = {"Content-Type": 'application/json'};

        axios.post(insertUrl, data, config)
            .then(res => {
                navi("/feed/list");
            })
    }

    return (
        <div className={"form_container"}>
            <form onSubmit={onSubmitEvent}>
                <h3>피드 게시글 입력 폼</h3>
                <button type={'submit'}>게시글 저장</button>
                <br/><br/>
                {/* 제목입력 */}
                <input type={'text'} className={`form-control ${errors.fd_title}`}
                       style={{height: '60px', fontSize: '25px'}}
                       placeholder={'제목을 입력하세요.'} name={"fd_title"} value={data.fd_title} required
                       onChange={onChangeData} onClick={onClickData}/>
                {touched.fd_title && errors.fd_title &&
                    <div className="form_empty_msg">필수 입력 항목입니다.</div>
                }
                {/* 셀렉트 */}
                <div className={'form_box'}>
                    <div className="form_row">
                        <div className="form_row_title">주거형태<span style={{color: 'rgb(255, 119, 119)'}}>*</span></div>
                        <div style={{width: '130px', marginRight: '80px'}}>
                            <select className={`form-select ${errors.fd_lvtp}`} required
                                    name={"fd_lvtp"} value={data.fd_lvtp} onChange={onChangeData} onClick={onClickData}>
                                <option value="" selected disabled></option>
                                <option value="본인 방">본인 방</option>
                                <option value="원룸">원룸</option>
                                <option value="오피스텔">오피스텔</option>
                                <option value="빌라&연립">빌라&연립</option>
                                <option value="아파트">아파트</option>
                                <option value="단독주택">단독주택</option>
                                <option value="협소주택">협소주택</option>
                                <option value="상업공간">상업공간</option>
                                <option value="사무공간">사무공간</option>
                                <option value="기타">기타</option>
                            </select>
                            {touched.fd_lvtp && errors.fd_lvtp &&
                                <div className="form_empty_msg">필수 입력 항목입니다.</div>
                            }
                        </div>
                        <div className="form_row_title">가족형태<span style={{color: 'rgb(255, 119, 119)'}}>*</span></div>
                        <div style={{width: '220px'}}>
                            {/* 필수 입력항목 입력 안했을 시 에러 */}
                            <select className={`form-select ${errors.fd_fml}`} required
                                    name={"fd_fml"} value={data.fd_fml} onChange={onChangeData} onClick={onClickData}>
                                <option value="" selected disabled></option>
                                <option value="싱글라이프">싱글라이프</option>
                                <option value="신혼/부부가 사는집">신혼/부부가 사는집</option>
                                <option value="자녀가 있는 집">자녀가 있는 집</option>
                                <option value="부모님과 함께 사는 집">부모님과 함께 사는 집</option>
                                <option value="룸메이트와 함께 사는 집">룸메이트와 함께 사는 집</option>
                                <option value="기타">기타</option>
                            </select>
                            {touched.fd_fml && errors.fd_fml&&
                                <div className="form_empty_msg">필수 입력 항목입니다.</div>
                            }
                        </div>
                    </div> {/* form_row */}
                    <div className="form_row">
                        <div className="form_row_title">평수<span style={{color: 'rgb(255, 119, 119)'}}>*</span></div>
                        <div style={{width: '130px' ,marginRight: '80px', display: 'block'}}>
                            <input type={'text'}  className={`form-control ${errors.fd_spc}`} required
                                   name={"fd_spc"} value={data.fd_spc} onChange={onChangeData} onClick={onClickData}/>
                            {!touched.fd_spc?'':errors.fd_spc=="empty error"?
                                <div className="form_empty_msg">필수 입력 항목입니다.</div>
                                :!regex.test(data.fd_spc)?<div className="form_empty_msg">숫자만 입력 가능합니다.</div>
                                :''
                            }
                        </div>
                        <div className="form_row_title">스타일<span style={{color: 'rgb(255, 119, 119)'}}>*</span></div>
                        <div style={{width: '220px'}}>
                            <select className={`form-select ${errors.fd_style}`} required
                                    name={"fd_style"} value={data.fd_style} onChange={onChangeData} onClick={onClickData}>
                                <option value="" selected disabled></option>
                                <option value="모던">모던</option>
                                <option value="미니멀&심플">미니멀&심플</option>
                                <option value="내추럴">내추럴</option>
                                <option value="북유럽">북유럽</option>
                                <option value="빈티지&레트로">빈티지&레트로</option>
                                <option value="클래식&앤틱">클래식&앤틱</option>
                                <option value="러블리&로맨틱">러블리&로맨틱</option>
                                <option value="한국&아시아">한국&아시아</option>
                            </select>
                            {touched.fd_style && errors.fd_style &&
                                <div className="form_empty_msg">필수 입력 항목입니다.</div>
                            }
                        </div>
                    </div>
                </div>
            </form>
            {/* 사진 선택--form 밖에 넣어야함! 안에 넣으면 버튼누를시 submit 돼버림 */}
            <div className={'form_img_box'} style={{backgroundImage: `url(${pre_img})`}}>
                <input type={'file'} id="fileimg" multiple required
                       style={{visibility: 'hidden'}} onChange={onUploadChange}/>
                {
                    // img가 공백이면(초기값,사진선택 안된상태)안내문구+추가하기버튼, 있으면 변경하기 버튼
                    pre_img == '' ?
                        <div className={'css-fvirbu'}>
                            <p className="css-1idkie2">
                                <span className="css-1wclmit">추가하기 버튼으로<br/></span>
                                커버 사진을 업로드해주세요.
                            </p>
                            <button className="form_bl_button" onClick={() => {
                                document.getElementById("fileimg").click();
                            }}>커버 사진 추가하기
                            </button>
                        </div>
                        :
                        <div className={'css-fvirbu'} style={{height: '70%'}}>
                            <button className="form_bl_button" onClick={() => {
                                document.getElementById("fileimg").click();
                            }}>커버 사진 변경
                            </button>
                        </div>
                }
            </div>


            <Editor
                previewStyle="vertical" // 미리보기 스타일 지정
                height="500px" // 에디터 창 높이
                initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
                plugins={[colorSyntax]}
                hideModeSwitch={true}
                toolbarItems={[
                    // 툴바 옵션 설정
                    ['heading', 'bold', 'italic', 'strike'],
                    ['hr', 'quote'],
                    ['ul', 'ol', 'task', 'indent', 'outdent'],
                    ['table', 'image', 'link'],
                ]}
                hooks={{
                    addImageBlobHook: async (blob, callback) => {

                        console.log(blob)

                        console.log(blob.name)

                        const formData = new FormData()
                        formData.append('file', blob)
                        formData.append('dirName', 'fd_img')

                        let url = localStorage.url + "/image/insert"

                        axios.post(url, formData, {
                            header: {"content-type": "multipart/formdata"}
                        })
                            .then(res=>{

                                callback(res.data)
                            })
                    }
                }}
            />

        </div>
    );
}

export default FeedInsertForm;