import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../css/LoginForm.css";
import {Button, TextField} from "@mui/material";

function LoginForm(props) {
    const [ur_id, setUr_id]=useState('');
    const [ur_pw, setUr_pw]=useState('');
    const navi = useNavigate();

    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSubmitLogin(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    const onSubmitLogin=(e)=>{
        e.preventDefault();
        let url=sessionStorage.url+"/login/check";
        axios.post(url,{ur_id,ur_pw})
            .then(res=>{
                if (res.data.check===1){
                    sessionStorage.loginok='yes';
                    sessionStorage.ur_num=res.data.ur_num;
                    sessionStorage.ur_id=ur_id;
                    sessionStorage.prf_nick=res.data.prf_nick;
                    sessionStorage.prf_img=res.data.prf_img;
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
        <div style={{width:'20%', margin:"auto"}}>
            <h1>로그인</h1>
            <TextField label={'ID'} name={'ur_id'} value={ur_id} required fullWidth onChange={(e)=>setUr_id(e.target.value)}/><br/><br/>
            <TextField label={'Password'} name={'ur_pw'} value={ur_pw} type={"password"} onKeyPress={handleOnKeyPress} required fullWidth
                       onChange={(e)=>setUr_pw(e.target.value)}/><br/><br/>
            <Button type={"submit"} fullWidth variant={"contained"} color={"info"} onClick={onSubmitLogin}>Sign In</Button>
        </div>
        // <div>
        //     <table className={'table'} style={{borderColor:'white', margin:"auto", width: '20%'}}>
        //         <caption align={'top'}><h1>로그인</h1></caption>
        //         <tbody>
        //         <tr>
        //             <td>
        //                 <TextField label={'ID'} name={'ur_id'} value={ur_id} autoFocus required fullWidth
        //                            onChange={(e)=>setUr_id(e.target.value)}/>
        //             </td>
        //         </tr>
        //         <tr>
        //             <td>
        //                 <TextField label={'Password'} name={'ur_pw'} value={ur_pw} type={"password"} required fullWidth
        //                            onChange={(e)=>setUr_pw(e.target.value)}/>
        //             </td>
        //         </tr>
        //         <tr>
        //             <td>
        //                 <Button type={"submit"} fullWidth variant={"contained"} onClick={onSubmitLogin}>Sign In</Button>
        //             </td>
        //         </tr>
        //         </tbody>
        //     </table>
        // </div>
    );
}

export default LoginForm;