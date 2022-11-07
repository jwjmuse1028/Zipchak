import React from 'react';
import {NavLink} from "react-router-dom";

function Menu(props) {
    return (
        <ul className='menu'>
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            {/*<li>*/}
            {/*    <NavLink to={"/member/form"}>회원가입</NavLink>*/}
            {/*</li>*/}
            <li>
                <NavLink to={"/member/list"}>회원목록</NavLink>
            </li>
            {/*<li>*/}
            {/*    <NavLink to={"/board/list"}>게시판</NavLink>*/}
            {/*</li>*/}
            {/*{*/}
            {/*    localStorage.loginok==null?*/}
            {/*        <li>*/}
            {/*            <NavLink to={"/login"}>로그인</NavLink>*/}
            {/*        </li>:*/}
            {/*        <div>*/}
            {/*            &nbsp;&nbsp;&nbsp;*/}
            {/*            <b>{myname}님</b>&nbsp;&nbsp;*/}
            {/*            <button type='button' className='btn btn-outline-primary'*/}
            {/*                    onClick={(e)=>{*/}
            {/*                        localStorage.removeItem("loginok");*/}
            {/*                        localStorage.removeItem("myid");*/}
            {/*                        localStorage.removeItem("myname");*/}
            {/*                        window.location.reload(); //새로고침*/}

            {/*                    }}>로그아웃</button>*/}
            {/*        </div>*/}
            {/*}*/}
        </ul>
    );
}

export default Menu;