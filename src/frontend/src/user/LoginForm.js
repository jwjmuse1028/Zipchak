import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function LoginForm(props) {
    const [ur_id, setUr_id]=useState('');
    const [ur_pw, setUr_pw]=useState('');
    const navi = useNavigate();

    const onSubmitLogin=(e)=>{
        e.preventDefault();
        let url=sessionStorage.url+"/login/check";
        axios.post(url,{ur_id,ur_pw})
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
                    setUr_pw('');
                }
            })
    }
    return (
        <div>
            <form>
                <table className={'table table-bordered'} style={{width:'300px', margin:'auto'}}>
                    <caption align={'top'}><h1>로그인</h1></caption>
                    <tbody>
                    <tr>
                        <td>
                            <div>
                                <input type={'text'} className={'form-control'} style={{boxShadow:'none'}} required autoFocus value={ur_id} placeholder={"ID"}
                                       onChange={(e)=>setUr_id(e.target.value)}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <input type={'password'} className={'form-control'} style={{boxShadow:'none'}} required value={ur_pw} placeholder={"Password"}
                                       onChange={(e)=>setUr_pw(e.target.value)}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} align={"center"}>
                            <button type={"submit"} className={'btn btn-outline-dark'} style={{boxShadow:'none'}}
                                    onClick={onSubmitLogin}>로그인</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default LoginForm;