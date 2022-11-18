import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import '../css/Menu.css';
import {Avatar, Fab, Menu, MenuItem} from "@mui/material";
import {KeyboardArrowUp} from "@material-ui/icons";

function Menus(props) {
    const [prf_nick, setPrf_nick]=useState('');
    const [prf_img, setPrf_img]=useState('');
    const navi = useNavigate();
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })}
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(()=>{
        setPrf_nick(sessionStorage.prf_nick);
    },[]);
    useEffect(()=>{
        setPrf_img(sessionStorage.prf_img);
    },[]);

    return (
        <ul className='menu'>
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
                <NavLink to={"/shop/list/1"}>중고</NavLink>

            </li>
            <li>
                <NavLink to={"/chat/"}>채팅</NavLink>
            </li>
            {/*<li>*/}
            {/*    <NavLink to={"/board/list"}>게시판</NavLink>*/}
            {/*</li>*/}
            <li>
                <NavLink to={"/feed/list"}>피드목록</NavLink>
            </li>
            <li>
                <NavLink to={"/feed/insertform"}>피드글쓰기</NavLink>
            </li>
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
            <li>
                <NavLink to={"/feed/detail"}>피드상세페이지</NavLink>
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
                    <div style={{float:"right"}}>
                        <Avatar src={prfUrl+prf_img} onClick={handleClick} className={'profilehover'} style={{cursor:"pointer"}}/>&nbsp;&nbsp;
                        <b>{prf_nick}님이 로그인중</b>&nbsp;&nbsp;&nbsp;
                    </div>
            }
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={(e)=>{
                    handleClose();
                    navi("/profile");
                }}>프로필</MenuItem>
                <MenuItem onClick={(e)=>{
                    handleClose();
                    navi("/mypage");
                }}>마이페이지</MenuItem>
                <MenuItem onClick={(e)=>{
                    handleClose();
                    sessionStorage.removeItem("loginok");
                    sessionStorage.removeItem("ur_id");
                    sessionStorage.removeItem("prf_nick");
                    sessionStorage.removeItem("prf_img");
                    sessionStorage.removeItem("ur_num");
                    navi("/");
                }}>로그아웃</MenuItem>
            </Menu>
            <div className="scroll__container">
                <Fab id="top" onClick={scrollToTop} color={"info"}><KeyboardArrowUp/></Fab>
            </div>
        </ul>
    );
}

export default Menus;