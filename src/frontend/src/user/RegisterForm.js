import React, {useCallback, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import noprfpic from '../image/noprofilepicture.webp';
import {Button, Dialog, DialogContent, DialogTitle, IconButton, makeStyles, styled, TextField} from "@mui/material";
import {Typography} from "@material-ui/core";
import DaumPostcode from 'react-daum-postcode';
import CloseIcon from '@mui/icons-material/Close';
import "../css/RegisterForm.css";
import {CameraAlt} from "@material-ui/icons";

function RegisterForm(props) {
    const [ur_id, setUr_id] = useState('');
    const [ur_pw, setUr_pw] = useState('');
    const [ur_pw2, setUr_pw2] = useState('');
    const [prf_nick, setPrf_nick] = useState('');
    const [prf_img, setPrf_img] = useState('');
    const [info_name, setInfo_name] = useState('');
    const [info_sex, setInfo_sex] = useState('');
    const [info_addr, setInfo_addr] = useState('');
    const [info_hp, setInfo_hp] = useState('');
    const [info_email, setInfo_email] = useState('');
    const [btnok, setBtnok] = useState(false);
    const [btnok2, setBtnok2] = useState(false);
    const [idmsg, setIdmsg] = useState('');
    const [idmsg2, setIdmsg2] = useState('');
    const [openPostcode, setOpenPostcode] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState(''); //비밀번호 확인 메시지
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false); //비밀번호 일치
    const navi = useNavigate();

    // 비밀번호 확인
    const onChangeUr_pw2 = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const ur_pw2Current = e.target.value
            setUr_pw2(ur_pw2Current);

            if (ur_pw === ur_pw2Current) {
                setPasswordConfirmMessage('비밀번호가 일치합니다');
                setIsPasswordConfirm(true);
            } else {
                setPasswordConfirmMessage('비밀번호를 확인해주세요');
                setIsPasswordConfirm(false);
            }
        },
        [ur_pw]
    )

    const uploadUrl = sessionStorage.url+"/image/upload"
    const photoUploadEvent=(e)=>{
        const uploadFile=e.target.files[0];
        const imageFile=new FormData();
        imageFile.append("uploadFile",uploadFile);

        axios({
            method:'post',
            url:uploadUrl,
            data:imageFile,
            headers:{'Content-Type':'multipart/form-data'}
        }).then(res=>{
            // console.log("이미지먕:"+res.data);
            setPrf_img(res.data);
        })
    }

    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpen(true);
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        selectAddress: (data) => {
            // console.dir(data);
            setInfo_addr(`(${data.zonecode}) ${data.roadAddress},${data.buildingName}`);

            setOpenPostcode(false);
            setOpen(false);
        },
    }

    const handleClose = () => {
        setOpen(false);
        setOpenPostcode(false);
    };

    const btnIdCheck = () => {
        let url = sessionStorage.url + "/user/idcheck?ur_id=" + ur_id;
        axios.get(url)
            .then(res => {
                // console.log(res.data)
                if (res.data === 0) {
                    setIdmsg("사용가능한 ID입니다");
                    setBtnok(true);
                } else {
                    setIdmsg("이미 존재하는 ID입니다");
                    setBtnok(false);
                }
            })
    }
    const inputIdCheck = (e) => {
        setUr_id(e.target.value);
        setBtnok(false);
        setIdmsg('');
    }
    const btnIdCheck2 = () => {
        let url = sessionStorage.url + "/user/nickcheck?prf_nick=" + prf_nick;
        axios.get(url)
            .then(res => {
                // console.log(res.data)
                if (res.data === 0) {
                    setIdmsg2("사용가능한 닉네임입니다");
                    setBtnok2(true);
                } else {
                    setIdmsg2("이미 존재하는 닉네임입니다");
                    setBtnok2(false);
                }
            })
    }
    const inputIdCheck2 = (e) => {
        setPrf_nick(e.target.value);
        setBtnok2(false);
        setIdmsg2('');
    }

    const onSubmitButton = (e) => {
        e.preventDefault();
        if (!btnok || !btnok2) {
            alert("중복체크를 확인해주세요");
            return;
        }
        if (ur_pw !== ur_pw2) {
            return alert('비밀번호를 확인해주세요');
        }
        let url = sessionStorage.url + "/user/insert";
        axios.post(url, {ur_id, ur_pw, prf_nick, prf_img, info_name, info_sex, info_addr, info_hp, info_email})
            .then(res => {
                alert(prf_nick+"님, 가입을 환영합니다!");
                navi("/login");
            })
    }
    const onErrorImg = (e) => {
        e.target.src = noprfpic;
    }
    //다이얼로그에 필요한 코드들
    const BootstrapDialog = styled(Dialog)(({theme}) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));


    function BootstrapDialogTitle(props) {
        const {children, onClose, ...other} = props;

        return (
            <DialogTitle sx={{m: 0, p: 2}} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    }

        return (
            // <div style={{margin:"auto", width:'50%'}}>
            //     <TextField id="standard-basic" label={'ID'}/>
            // </div>
            <div>
                <form onSubmit={onSubmitButton}>
                    <table className={'table table-bordered'} style={{width: '50%', margin:'auto', borderColor:'white'}}>
                        <caption align={'top'}><h1>회원가입</h1><span style={{color:'rgb(255, 119, 119)'}}>*</span>표시는 필수기재 항목입니다</caption>
                        <tbody>
                        <tr>
                            <th style={{width:'20%'}}>아이디&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td style={{width:'40%%'}}>
                                <div className={'input-group'}>
                                    <input className={'form-control'} type={"text"} style={{width: '60%', boxShadow:'none'}} value={ur_id} required autoFocus
                                           onChange={inputIdCheck}/>
                                    <Button color="info" type={"button"} onClick={btnIdCheck}>중복체크</Button>
                                </div>
                                <span style={{color:btnok?"blue":"red"}}>{idmsg}</span>
                            </td>
                            <td colSpan={2} rowSpan={4} style={{width:'40%'}} align={"center"}>
                                <input type={"file"}  id={'filephoto'}
                                       style={{visibility: 'hidden'}}
                                       onChange={photoUploadEvent}/>
                                <img src={prf_img} onError={onErrorImg}
                                     style={{width: '200px',height:'200px', borderRadius: '150px'}}/>

                                <br/><br/>
                                <CameraAlt onClick={()=>{
                                   document.getElementById('filephoto').click();
                                }} style={{cursor:'pointer', color:'gray', fontSize:'4em',position:'relative',top:'-80px',left:'70px'}}/>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td>
                                <input className={'form-control'} type={"password"} name={ur_pw} style={{boxShadow:'none'}} required
                                onChange={(e)=>{
                                    setUr_pw(e.target.value);
                                    setUr_pw2('');
                                    setPasswordConfirmMessage('');
                                }}/>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호 확인&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td>
                                <div className={'input-group'}>
                                <input className={'form-control'} type={"password"} value={ur_pw2} style={{boxShadow:'none'}} required
                                onChange={onChangeUr_pw2}/>&nbsp;&nbsp;
                                    <span style={{color:ur_pw==ur_pw2?"blue":"red"}} className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>회원명&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td>
                                <input className={'form-control'} type={"text"} name={info_name} value={info_name} style={{width:'100%',boxShadow:'none'}} required maxLength={10}
                                       onChange={(e) => setInfo_name(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>닉네임&nbsp;<span style={{color:'rgb(255, 119, 119)'}}>*</span></th>
                            <td>
                                <div className={'input-group'}>
                                    <input className={'form-control'} type={"text"} style={{width: '60%'}} value={prf_nick} style={{boxShadow:'none'}} required maxLength={8}
                                           onChange={inputIdCheck2}/>
                                    <Button color="info" type={"button"} onClick={btnIdCheck2}>중복체크</Button>
                                </div>
                                <span style={{color:btnok2?"blue":"red"}}>{idmsg2}</span>
                            </td>
                            <th>성별</th>
                            <td align={"center"}>
                                <label><input type={"radio"} name={'info_sex'} value={'남자'}
                                              onChange={(e) => setInfo_sex(e.target.value)}/>남자</label>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <label><input type={"radio"} name={'info_sex'} value={'여자'}
                                              onChange={(e) => setInfo_sex(e.target.value)}/>여자</label>
                            </td>
                        </tr>

                        <tr>
                            <th>이메일</th>
                            <td>
                                <input className={'form-control'} type={"email"} name={info_email} value={info_email} style={{boxShadow:'none'}}
                                       onChange={(e) => setInfo_email(e.target.value)}/>
                                {/*<select>*/}
                                {/*    <option selected>gmail.com</option>*/}
                                {/*    <option>naver.com</option>*/}
                                {/*    <option>hanmail.com</option>*/}
                                {/*    <option>hotmail.com</option>*/}
                                {/*    <option>apple.com</option>*/}
                                {/*</select>*/}
                            </td>
                            <th>연락처</th>
                            <td colSpan={2}>
                                <input className={'form-control'} type="tel" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" style={{boxShadow:'none'}}
                                       maxLength={13}
                                       name={info_hp}
                                       value={info_hp}
                                       onChange={(e) => {
                                           if (e.target.value.length === 3 || e.target.value.length === 8) {
                                               e.target.value = e.target.value + '-';
                                           }
                                           setInfo_hp(e.target.value);
                                       }}/>
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td colSpan={3}>
                                <div className={'input-group'}>
                                    <input className={'form-control'} style={{width: '80%'}} name={info_addr} value={info_addr} style={{boxShadow:'none'}}
                                           onChange={(e) => setInfo_addr(e.target.value)}/>
                                    <Button variant="contained" color="info" type='button' onClick={handle.clickButton}>주소검색</Button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} align={"center"}>
                                <button className={'w-btn w-btn-indigo'}>가입하기</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                {/* {
                openPostcode &&
                <DaumPostcode
                    onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    defaultQuery='' // 팝업을 열때 기본적으로 입력되는 검색어
                />} */}

                {/* 다이얼로그 */}
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        카카오 주소 검색
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            {
                                openPostcode &&
                                <DaumPostcode
                                    onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                                    defaultQuery='' // 팝업을 열때 기본적으로 입력되는 검색어
                                />}
                        </Typography>
                    </DialogContent>
                </BootstrapDialog>
            </div>
        );
    }
export default RegisterForm;