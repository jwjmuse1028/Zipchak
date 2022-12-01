import React, {useEffect, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {CameraAlt} from "@material-ui/icons";
import axios from "axios";
import swal from 'sweetalert';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
function UserUpdateForm(props) {
    const {open, dialogClose,uinfo}=props;
    const [prf_nick,setPrf_nick]=useState(sessionStorage.prf_nick);
    const [chknickstatus,setChknickstatus]=useState(0);
    const [ischangenick,setIschangenick]=useState(false);
    const [ischangeimg,setIschangeimg]=useState(0);
    const [preimg,setPreimg]=useState('');
    const [file, setFile] = useState(null);
    const pre_nick=sessionStorage.prf_nick;
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";
    const ur_num=sessionStorage.ur_num;
    const prev_prf_img=sessionStorage.prf_img;
    const updateImg=()=>{
        document.getElementById('img_file').click();
    }
    const onUploadChange = (e) => {
        e.preventDefault();
        setIschangeimg(1);
        setFile(e.target.files[0]);
        //미리보기 위해 fileReader에 넣기
        const fileReader = new FileReader();

        if (e.target.files[0]) {
            fileReader.readAsDataURL(e.target.files[0])
        }
        fileReader.onload = () => {
            setPreimg(fileReader.result);
        }
    }
    const chknick=()=>{
        if (prf_nick===''){
            swal('닉네임을 입력해주세요',{ icon: "warning",});
            return;}
        let chknickurl = sessionStorage.url + "/user/nickcheck?prf_nick=" + prf_nick;
        axios.get(chknickurl).then(res=>{
            if (prf_nick===pre_nick){
                setChknickstatus(0);
            }else {
                setChknickstatus(res.data);
                setIschangenick(true);
            }
        })
        //console.log(prf_nick);
    }
    const changenick=(e)=>{
        setPrf_nick(e.target.value);
        setIschangenick(false);
    }
    const noupdateDialogClose=()=>{
        dialogClose(pre_nick,uinfo.prf_img,false);
    }
    const updateprf=()=>{
        if (ischangenick===false ){
            swal('닉네임 중복체크를 해주세요',{ icon: "warning",});
            return;}
        if (chknickstatus===1){
            return;
        }
        let updateprfUrl=localStorage.url+"/updateprf";
        const formdata=new FormData();
        formdata.append("file",file);
        formdata.append("ur_num",ur_num);
        formdata.append("prf_nick",prf_nick);
        axios({
            method: 'post',
            url: updateprfUrl,
            data: formdata,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res =>{
            if (res.data.prf_img==null){
                swal('프로필이 변경되었습니다.',{ icon: "success",});
                dialogClose(res.data.prf_nick,prev_prf_img,true);
            }
            else {
            swal('프로필이 변경되었습니다.',{ icon: "success",});
                dialogClose(res.data.prf_nick,res.data.prf_img,true);}
        } );

    }
    useEffect(()=>setPrf_nick(pre_nick),[open]);
    return (
        <div>
            <Dialog onClose={dialogClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={noupdateDialogClose}>
                    프로필 수정하기
                </DialogTitle>
                <DialogContent dividers >
                    <div className={'mypage_update_img_box'} >
                        <img className={(ischangeimg===0?'card_show':'card_hide')+' mypage_update_img'}
                             alt={''} src={prfUrl+uinfo.prf_img}/>
                        {/*사진 변경했을 때 미리 보기 하는 이미지로 변경하기*/}
                        <img className={(ischangeimg===1?'card_show':'card_hide')+' mypage_update_img'}
                             alt={''} src={preimg}/>
                    </div>
                    <div className={'mypage_update_img_btn'} onClick={updateImg}>
                        <CameraAlt style={{display:'block',margin:'auto'}}/>
                    </div>
                    <input type={"file"} id={'img_file'} style={{display:"none"}} onChange={onUploadChange}/>
                    <div style={{display:'flex'}}>
                        <input type={'text'} defaultValue={prf_nick} className={'form-control'}
                            onChange={changenick} style={{width:'200px'}}/>
                        <Button color="primary" onClick={chknick} style={{width:'70px',color:'#35c5f0'}}>중복체크</Button>
                    </div>
                    <div style={{color:chknickstatus===1?"red":"green", fontSize:'12px', marginLeft:'5px'}}>
                        {chknickstatus===1?"이미 존재하는 닉네임입니다":"사용 가능한 닉네임입니다"}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={updateprf} color="primary" style={{color:'#35c5f0'}}>
                        수정하기
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default UserUpdateForm;