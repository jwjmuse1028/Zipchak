import React, {useEffect, useRef, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import '../css/Header.css';
import axios from "axios";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import mainlogo from '../image/mainlogo.png';
import {
    Avatar, Badge,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Menu,
    MenuItem, Slide, TextField
} from "@mui/material";
import {
    AccountBox,
    AccountCircle,
    ForumOutlined, ForumRounded, KeyboardArrowDown,
    KeyboardArrowUp,
    ListAlt,
    PhotoLibrary, SmsRounded,
    Storefront, StoreMallDirectoryRounded
} from "@material-ui/icons";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Header(props) {
    const [prf_nick, setPrf_nick]=useState('');
    const [prf_img, setPrf_img]=useState('');
    const [openUp, setOpenUp] = useState('');
    const handleOpenUp = () => {
        setOpenUp(true);
    };

    const handleCloseDown = () => {
        setOpenUp(false);
    };

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

    const actions = [
        { icon: <AccountBox onClick={()=>{navi("/mypage/1")}}/>, name: '마이페이지' },
        { icon: <ForumRounded onClick={()=>{navi("/chat/0");}}/>, name: '채팅' },
        { icon: <PhotoLibrary onClick={()=>{navi("/feed/list");}}/>, name: '집들이' },
        { icon: <StoreMallDirectoryRounded onClick={()=>{navi("/shop/list/1"); window.location.reload()}}/>, name: '스토어' },
    ];
    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    const [msgCnt,setMsgCnt]=useState(0);

    const getMsgCntNoti=()=>{
        if(ur_num!=null){
            let getMsgCntNotiUrl=localStorage.url+"/chat/cntnoti?ur_num="+ur_num;
            axios.get(getMsgCntNotiUrl).then(res=>{
                setMsgCnt(res.data);
            })
        }
    }
    useEffect(()=>getMsgCntNoti(),[])
    return (
        <header className={"header"}>
        <ul className='menu'>
            <li>
                <img src={mainlogo} style={{width:'80px', cursor:"pointer"}} onClick={()=>{navi("/")}}/>
            </li>
            <li>
                {/*<NavLink to={"/shop/list/1"} onClick={()=>{window.location.reload()}}>중고</NavLink>*/}
                <NavLink onClick={()=>{navi("/shop/list/1"); window.location.reload()}}>스토어</NavLink>
            </li>
            {/*<li>*/}
            {/*    <NavLink to={"/chat/0"}>채팅</NavLink>*/}
            {/*</li>*/}
            <li>
                <NavLink to={"/feed/list"}>집들이</NavLink>
            </li>
            {/*<li>*/}
            {/*    <NavLink to={"/feed/insertform"}>피드글쓰기</NavLink>*/}
            {/*</li>*/}
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
                        <Fab variant="extended" style={{float:"right", margin:'2%', backgroundColor:'#35c5f0'}}
                                onClick={handleClickOpen}>
                            <AccountCircle/>&nbsp;로그인
                        </Fab>
                    </div>
                    :
                    <div className={'loginavt'}>
                        <div onClick={()=>navi("/chat/0")} style={{cursor:"pointer"}}>
                        <b>집톡</b>&nbsp;
                        <Badge badgeContent={msgCnt} color={"error"} style={{color:'#828C94'}}>
                            <SmsRounded />
                        </Badge>
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Avatar src={prfUrl+prf_img} onClick={handleClick} className={'profilehover'} style={{cursor:"pointer"}}/>&nbsp;&nbsp;
                        <b>{prf_nick}님이 로그인중</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {/*<Button variant={"contained"} style={{backgroundColor:'#35c5f0'}}>글쓰기<KeyboardArrowDown/></Button>*/}
                        <Fab style={{backgroundColor:'#35c5f0', color:'white'}} variant="extended"
                        //     onClick={()=>{
                        //         if (sessionStorage.loginok!=null){
                        //             handleClick2();
                        //         }else {
                        //             alert("로그인 후 이용해주세요");
                        //             return;
                        //         }
                        //     }
                        //     }
                            onClick={handleClick2}
                        >
                            글쓰기<KeyboardArrowDown/>
                        </Fab>
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
                <DialogTitle>{<img src={mainlogo} style={{width:'200px'}}/>}</DialogTitle>
                <DialogContent>
                    {/*<DialogContentText>*/}
                        <TextField label={'ID'} name={'ur_id'} value={ur_id} required onKeyPress={handleOnKeyPress} onChange={(e)=>setUr_id(e.target.value)}/><br/><br/>
                        <TextField label={'Password'} name={'ur_pw'} value={ur_pw} type={"password"} onKeyPress={handleOnKeyPress} required
                                   onChange={(e)=>setUr_pw(e.target.value)}/><br/>
                    {/*</DialogContentText>*/}
                </DialogContent>
                <DialogActions>
                    <Button type={"button"} fullWidth variant={"contained"} color={"info"}
                            ref={loginRef}
                            onClick={onBtnLogin}>로그인</Button>
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
                    navi("/mypage/1");
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

            <Menu
                id="simple-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
            >
                <MenuItem onClick={(e)=>{
                    handleClose2();
                    navi("/feed/insertform");
                }}><b>집들이글</b><br/><br/><span>나의 공간과 나의 일상을 기록해보세요</span></MenuItem>
                <MenuItem onClick={(e)=>{
                    handleClose2();
                    navi("/shop/insert");
                }}><b>스토어글</b></MenuItem>
            </Menu>

            <SpeedDial
                style={{color:'#35c5f0'}}
                onClick={scrollToTop}
                className="scroll__container"
                ariaLabel="SpeedDial openIcon example"
                icon={<SpeedDialIcon openIcon={<KeyboardArrowUp />} />}
                onClose={handleCloseDown}
                onOpen={handleOpenUp}
                open={openUp}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        // onClick={handleCloseDown}
                    />
                ))}
            </SpeedDial>
            {/*<div>*/}
            {/*    <Fab id="top" onClick={scrollToTop} color={"info"}><KeyboardArrowUp/></Fab>*/}
            {/*</div>*/}
        </ul>
        </header>
    );
}

export default Header;