import React, {createElement, useEffect, useRef, useState} from 'react';
import "../css/FeedForm.css";

import {Editor, Viewer} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import axios from "axios";

import {useNavigate} from "react-router-dom";
import {getWidth} from "react-slick/lib/utils/innerSliderUtils";


function FeedInsertForm(props) {

    //이미지 미리보기
    const [pre_img, setPre_img] = useState('');
    const [file, setFile] = useState('');

    //현재로그인한 user 정보
    const ur_num = sessionStorage.ur_num;

    console.log("ur_num:"+ur_num);

    const navi = useNavigate();

    //정규식 표현 - 평수 넣을 때 숫자아닌 것 들어가면 메세지 출력
    const regex = /[0-9]/

    const [dto, setDto] = useState({
        fd_title: '',
        fd_spc: '',
        fd_lvtp: '',
        fd_fml: '',
        fd_style: '',
        fd_txt: '',
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
        setDto({
            ...dto,
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

    // 파일 업로드 이벤트-업로드하면 formData에 사진 넣기 위해 변수 file에 저장,
    // 미리보기 위해 fileReader에 해당 사진 넣고 result를 변수 pre_img에 넣어 미리보기 출력
    const onUploadChange = (e) => {
        e.preventDefault();

        setFile(e.target.files[0]);

        //미리보기 위해 fileReader에 넣기
        const fileReader = new FileReader();

        if (e.target.files[0]) {
            fileReader.readAsDataURL(e.target.files[0])
        }
        fileReader.onload = () => {
            setPre_img(fileReader.result);
        }
    }

    const onSubmitEvent = (e) => {
        e.preventDefault();

        if(!ur_num) {
            alert("로그인 해주세요");
            return;
        }
        if(!file) {
            alert("커버사진을 추가해 주세요");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("dto",new Blob([JSON.stringify(dto)], {
            type: "application/json"
        }));
        
        // 위의 Blob 사용안하면 각각 넣어줘야함->controller에서 @ModelAttribute Dto로 받으면 되긴함
        // formData.append("fd_title",dto.fd_title);
        // formData.append("fd_spc",dto.fd_spc);
        // formData.append("fd_fml",dto.fd_fml);
        // formData.append("fd_lvtp",dto.fd_lvtp);
        // formData.append("fd_style",dto.fd_style);
        // formData.append("ur_num",dto.ur_num);

        // 이렇게 하면 실패
        // formData.append("dto", JSON.stringify(dto));
        // formData.append("dto",dto);

        // insert 메서드로 보내기
        let insertUrl = localStorage.url + "/feed/insert";
        axios({
            method: 'post',
            url: insertUrl,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
            navi("/feed/list");
        });
    }

    const editorRef=useRef();

    const [data,setData]=useState('')

    const onChange=()=>{
        setDto({
            ...dto,
            ["fd_txt"]: editorRef.current?.getInstance().getHTML(),
        })
    }


    return (
        <div className={"form_container"}>
            <form onSubmit={onSubmitEvent} encType={"multipart/form-data"}>
                <h3>피드 게시글 입력 폼</h3>
                <button type={'submit'}>게시글 저장</button>
                <br/><br/>
                {/* 제목입력 */}
                <input type={'text'} className={`form-control ${errors.fd_title}`}
                       style={{height: '60px', fontSize: '25px'}}
                       placeholder={'제목을 입력하세요.'} name={"fd_title"} value={dto.fd_title} required
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
                                    name={"fd_lvtp"} value={dto.fd_lvtp} onChange={onChangeData} onClick={onClickData}>
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
                                    name={"fd_fml"} value={dto.fd_fml} onChange={onChangeData} onClick={onClickData}>
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
                                   name={"fd_spc"} value={dto.fd_spc} onChange={onChangeData} onClick={onClickData}/>
                            {!touched.fd_spc?'':errors.fd_spc=="empty error"?
                                <div className="form_empty_msg">필수 입력 항목입니다.</div>
                                :!regex.test(dto.fd_spc)?<div className="form_empty_msg">숫자만 입력 가능합니다.</div>
                                :''
                            }
                        </div>
                        <div className="form_row_title">스타일<span style={{color: 'rgb(255, 119, 119)'}}>*</span></div>
                        <div style={{width: '220px'}}>
                            <select className={`form-select ${errors.fd_style}`} required
                                    name={"fd_style"} value={dto.fd_style} onChange={onChangeData} onClick={onClickData}>
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
               /* hooks={{
                    addImageBlobHook: async (blob, callback) => {

                        const formData = new FormData()
                        formData.append('file', blob)

                        let url = localStorage.url + "/image/insert"

                        axios.post(url, formData, {
                            header: {"content-type": "multipart/formdata"}
                        })
                            .then(res=>{
                                callback(res.data)
                            })
                    }
                }}*/
                onChange={onChange}
                ref={editorRef}
            />
            {/*<div dangerouslySetInnerHTML={ {__html: data} } id={"editorContent"}/>*/}
            {
                window.document.getElementsByTagName('img').item(0) &&
                window.document.getElementsByTagName('img').item(0)
                    .addEventListener("click",(e)=> {

                        var img =  window.document.getElementsByTagName('img').item(0)

                        createElement("map")
                        console.log(
                            "X 좌표 : " + e.offsetX + ", width : " + img.clientWidth + "percentage" + e.offsetX/img.clientWidth*100 +"%",
                            "Y 좌표 : " + e.offsetY + ", height : " + img.clientHeight + "percentage" + e.offsetY/img.clientHeight*100 +"%"
                        )
                    })
            }

        </div>
    );
}

export default FeedInsertForm;