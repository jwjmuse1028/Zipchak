import React, {useEffect, useRef, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import '../css/Menu.css';
import {
    Avatar,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Menu,
    MenuItem, Slide, TextField
} from "@mui/material";
import {AccountCircle, KeyboardArrowUp} from "@material-ui/icons";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Menus(props) {
    const [prf_nick, setPrf_nick]=useState('');
    const [prf_img, setPrf_img]=useState('');
    const navi = useNavigate();
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";
    const ur_num=sessionStorage.ur_num;
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
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const loginClose = () => {
        setOpen(false);
    };
    useEffect(()=>{
        setPrf_nick(sessionStorage.prf_nick);
    },[]);
    useEffect(()=>{
        setPrf_img(sessionStorage.prf_img);
    },[]);

    const [ur_id, setUr_id]=useState('');
    const [ur_pw, setUr_pw]=useState('');
    const loginRef=useRef();
    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            loginRef.current.click(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    const onBtnLogin=(e)=>{
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
                    window.location.reload();
                } else {
                    alert("아이디 또는 비밀번호를 확인해주세요");
                    setUr_id('');
                    setUr_pw('');
                }
            })
    }

    return (
        <ul className='menu'>
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
                {/*<NavLink to={"/shop/list/1"} onClick={()=>{window.location.reload()}}>중고</NavLink>*/}
                <NavLink onClick={()=>{navi("/shop/list/1"); window.location.reload()}}>중고</NavLink>
            </li>
            <li>
                <NavLink to={"/chat/0"}>채팅</NavLink>
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
            <li>
                <NavLink to={"/feed/addtag"}>태그 추가</NavLink>
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

            {
                sessionStorage.loginok==null?
                    <div>
                        <li>
                            <NavLink to={'/register'}>회원가입</NavLink>
                        </li>
                        {/*<li>*/}
                        {/*    <NavLink to={"/login"}>로그인</NavLink>*/}
                        {/*</li>*/}
                        <Fab variant="extended" color="info" style={{float:"right", marginRight:'2%'}}
                                onClick={handleClickOpen}>
                            <AccountCircle/>&nbsp;로그인
                        </Fab>
                    </div>
                    :
                    <div style={{float:"right"}}>
                        <Avatar src={prfUrl+prf_img} onClick={handleClick} className={'profilehover'} style={{cursor:"pointer"}}/>&nbsp;&nbsp;
                        <b>{prf_nick}님이 로그인중</b>&nbsp;&nbsp;&nbsp;
                    </div>
            }
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={loginClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {/*<h1>로그인</h1>*/}
                {/*<TextField label={'ID'} name={'ur_id'} value={ur_id} required  onChange={(e)=>setUr_id(e.target.value)}/><br/><br/>*/}
                {/*<TextField label={'Password'} name={'ur_pw'} value={ur_pw} type={"password"} onKeyPress={handleOnKeyPress} required*/}
                {/*           onChange={(e)=>setUr_pw(e.target.value)}/><br/><br/>*/}
                {/*<Button type={"submit"}  variant={"contained"} color={"info"} onClick={onSubmitLogin}>Sign In</Button>*/}
                <DialogTitle>{"로그인"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField label={'ID'} name={'ur_id'} value={ur_id} required onKeyPress={handleOnKeyPress} onChange={(e)=>setUr_id(e.target.value)}/><br/><br/>
                        <TextField label={'Password'} name={'ur_pw'} value={ur_pw} type={"password"} onKeyPress={handleOnKeyPress} required
                                   onChange={(e)=>setUr_pw(e.target.value)}/><br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button type={"button"} fullWidth variant={"contained"} color={"info"}
                            ref={loginRef}
                            onClick={onBtnLogin}>Sign In</Button>
                </DialogActions>
            </Dialog>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={(e)=>{
                    handleClose();
                    navi("/profile/"+ur_num);
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