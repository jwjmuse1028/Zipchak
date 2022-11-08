import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function LoginForm(props) {
    const [ur_id, setUr_id]=useState('');
    const [lg_tp, setLg_tp]=useState('');
    const navi = useNavigate();

    const onSubmitLogin=(e)=>{
        e.preventDefault();
        let url=sessionStorage.url+"/login/check";
        axios.post(url,{ur_id,lg_tp})
            .then(res=>{
                if (res.data.check===1){
                    sessionStorage.loginok='yes';
                    sessionStorage.ur_id=ur_id;
                    sessionStorage.prf_nick=res.data.prf_nick;
                    navi("/");
                    window.location.reload();
                } else {
                    alert("아이디 또는 비밀번호를 확인해주세요");
                    setUr_id('');
                    setLg_tp('');
                }
            })
    }
    return (
        <div>
            <form>
                <table className={'table table-bordered'} style={{width:'300px'}}>
                    <caption align={'top'}><h1>로그인</h1></caption>
                    <tbody>
                    <tr>
                        <th>아이디</th>
                        <td>
                            <div>
                                <input type={'text'} required autoFocus value={ur_id}
                                       onChange={(e)=>setUr_id(e.target.value)}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td>
                            <div>
                                <input type={'password'} required value={lg_tp}
                                       onChange={(e)=>setLg_tp(e.target.value)}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} align={"center"}>
                            <button type={"submit"} onClick={onSubmitLogin}>로그인</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default LoginForm;