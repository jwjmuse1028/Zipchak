import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";

function Menu(props) {
    const [prf_nick, setPrf_nick]=useState('');
    useEffect(()=>{
        setPrf_nick(sessionStorage.prf_nick);
    },[]);
    return (
        <ul className='menu'>
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
                <NavLink to={"/member/list"}>회원목록</NavLink>
            </li>
            <li>
                <NavLink to={"/market/list"}>중고</NavLink>
            </li>

            {
                sessionStorage.loginok==null?
                    <div>
                        <li>
                            <NavLink to={'/register'}>회원가입</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/login"}>로그인</NavLink>
                        </li>
                    </div>
                    :
                    <div>
                        <b>{prf_nick}님이 로그인중</b>
                        <button type={"button"} onClick={(e)=>{
                            sessionStorage.removeItem("loginok");
                            sessionStorage.removeItem("ur_id");
                            sessionStorage.removeItem("prf_nick");
                                    window.location.reload();
                                }}>로그아웃</button>
                    </div>
            }
        </ul>
    );
}

export default Menu;