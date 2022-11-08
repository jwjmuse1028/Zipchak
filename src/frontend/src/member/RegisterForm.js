import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import noprfpic from '../image/noprofilepicture.webp';

function RegisterForm(props) {
    const [ur_id, setUr_id] = useState('');
    const [lg_tp, setLg_tp] = useState('');
    const [lg_tp2, setLg_tp2] = useState('');
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
    const photoUrl = localStorage.url + "/image/";
    const navi = useNavigate();

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
            axios.post(url, {ur_id, lg_tp, prf_nick, prf_img, info_name, info_sex, info_addr, info_hp, info_email})
                .then(res => {
                    alert("가입을 환영합니다!");
                    navi("/login");
                })
        }
        const onErrorImg = (e) => {
            e.target.src = noprfpic;
        }
        return (
            <div>
                <form onSubmit={onSubmitButton}>
                    <table className={'table table-bordered'} style={{width: '800px'}}>
                        <caption align={'top'}><h1>회원가입</h1></caption>
                        <tbody>
                        <tr>
                            <th>아이디</th>
                            <td>
                                <div className={'input-group'}>
                                    <input type={"text"} style={{width: '100px'}} value={ur_id} required autoFocus
                                           onChange={inputIdCheck}/>
                                        <button type={"button"} onClick={btnIdCheck}>중복체크</button>
                                </div>
                                <b>{idmsg}</b>
                            </td>
                            <td rowSpan={5}>
                                <input type={"file"} name={prf_img} value={prf_img} id={'filephoto'} style={{visibility: 'hidden'}}
                                       onChange={(e) => setPrf_img(e.target.value)}/>
                                <img src={photoUrl + prf_img} onError={onErrorImg}
                                     style={{maxWidth: '300px', borderRadius: '150px'}}/>
                                <br/><br/>
                                <span onClick={() => {
                                    document.getElementById("filephoto").click();
                                }}>
                                <button type={"button"} style={{justifyContent: 'center'}}>사진선택</button>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input type={"password"} name={lg_tp} required/>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호 확인</th>
                            <td>
                                <input type={"password"} name={lg_tp2} required/>
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
                                <input type={"text"} style={{width:'100px'}} value={prf_nick} required
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
                                <label><input type={"radio"} name={'info_sex'} value={info_sex} checked
                                              onChange={(e) => setInfo_sex(e.target.value)}/>남자</label>
                                <label><input type={"radio"} name={'info_sex'} value={info_sex}
                                              onChange={(e) => setInfo_sex(e.target.value)}/>여자</label>
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td colSpan={2}>
                                <input style={{width: '100%'}} name={info_addr} value={info_addr}
                                       onChange={(e) => setInfo_addr(e.target.value)}/>
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
                            <td colSpan={3} align={"center"}>
                                <button>가입하기</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
export default RegisterForm;