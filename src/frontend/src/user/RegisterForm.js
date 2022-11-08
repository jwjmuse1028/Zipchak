import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import noprfpic from '../image/noprofilepicture.webp';
import {Dialog, DialogContent, DialogTitle, IconButton, styled} from "@mui/material";
import {Typography} from "@material-ui/core";
import DaumPostcode from 'react-daum-postcode';
import CloseIcon from '@mui/icons-material/Close';

function RegisterForm(props) {
    const [ur_num, setUr_num] = useState('');
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
    const [pwmsg, setPwmsg] = useState('');
    const [openPostcode, setOpenPostcode] = useState(false);
    const [open, setOpen] = React.useState(false);
    const navi = useNavigate();

    const imageUrl=sessionStorage.url+"/image/";

    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpen(true);
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        selectAddress: (data) => {
            console.dir(data);
            // console.log(`
            //     주소: ${data.info_addr},
            //     우편번호: ${data.zonecode}
            // `)
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
                console.log(res.data)
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
        // if (lg_tp !== lg_tp2) {
        //     return alert('비밀번호와 비밀번호 확인이 같지 않습니다');
        // }
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
            <div>
                <form onSubmit={onSubmitButton}>
                    <table className={'table table-bordered'} style={{width: '40%', margin:'auto'}}>
                        <caption align={'top'}><h1>회원가입</h1></caption>
                        <tbody>
                        <tr>
                            <th style={{width:'20%'}}>아이디</th>
                            <td style={{width:'40%%'}}>
                                <div className={'input-group'}>
                                    <input type={"text"} style={{width: '60%'}} value={ur_id} required autoFocus
                                           onChange={inputIdCheck}/>
                                    <button type={"button"} onClick={btnIdCheck}>중복체크</button>
                                </div>
                                <b>{idmsg}</b>
                            </td>
                            <td rowSpan={5} style={{width:'20%'}} align={"center"}>
                                <input type={"file"} name={prf_img} value={prf_img} id={'filephoto'}
                                       style={{visibility: 'hidden'}}
                                       onChange={(e) => setPrf_img(e.target.value)}/>
                                <img src={imageUrl+prf_img} onError={onErrorImg}
                                     style={{maxWidth: '300px', borderRadius: '150px'}}/>
                                <br/><br/>
                                <span onClick={() => {
                                    document.getElementById("filephoto").click();
                                    console.log(imageUrl+prf_img);
                                }}>
                                <button type={"button"} style={{justifyContent: 'center'}}>사진선택</button>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input type={"password"} name={ur_pw} required
                                onChange={(e)=>setUr_pw(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호 확인</th>
                            <td>
                                <input type={"password"} name={ur_pw2} required/>
                                <span>{pwmsg}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>회원명</th>
                            <td>
                                <input type={"text"} name={info_name} value={info_name} required
                                       onChange={(e) => setInfo_name(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>닉네임</th>
                            <td>
                                <div className={'input-group'}>
                                    <input type={"text"} style={{width: '60%'}} value={prf_nick} required
                                           onChange={inputIdCheck2}/>
                                    <button type={"button"} onClick={btnIdCheck2}>중복체크</button>
                                </div>
                                <b>{idmsg2}</b>
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td colSpan={2}>
                                <input type={"email"} name={info_email} value={info_email} required
                                       onChange={(e) => setInfo_email(e.target.value)}/>
                                {/*<select>*/}
                                {/*    <option selected>gmail.com</option>*/}
                                {/*    <option>naver.com</option>*/}
                                {/*    <option>hanmail.com</option>*/}
                                {/*    <option>hotmail.com</option>*/}
                                {/*    <option>apple.com</option>*/}
                                {/*</select>*/}
                            </td>
                        </tr>
                        <tr>
                            <th>성별</th>
                            <td colSpan={2}>
                                <label><input type={"radio"} name={'info_sex'} value={'남자'} checked
                                              onChange={(e) => setInfo_sex(e.target.value)}/>남자</label>
                                <label><input type={"radio"} name={'info_sex'} value={'여자'}
                                              onChange={(e) => setInfo_sex(e.target.value)}/>여자</label>
                            </td>
                        </tr>
                        <tr>
                            <th>연락처</th>
                            <td colSpan={2}>
                                <input type="tel" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                                       placeholder='xxx-xxxx-xxxx' maxLength={13}
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
                            <td colSpan={2}>
                                <div className={'input-group'}>
                                    <input style={{width: '80%'}} name={info_addr} value={info_addr}
                                           onChange={(e) => setInfo_addr(e.target.value)}/>
                                    <button type='button' onClick={handle.clickButton}>주소검색</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} align={"center"}>
                                <button>가입하기</button>
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