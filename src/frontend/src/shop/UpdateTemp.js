import React, {useEffect, useRef, useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {blue} from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import TempSlider from "./TempSlider";
import {TextField, ThemeProvider} from "@material-ui/core";

const styles = (theme) => ({
    root: {

    },

});
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
        </MuiDialogTitle>
    );
});
const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        margin:'auto'
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

function UpdateTemp(props) {
    const {touser, updateTempOpen,updatetemprate,sp_num,fromseller}=props;
    const [uinfo,setUinfo]=useState({});
    const [rv_tmp,setRv_tmp]=useState(50);
    const [rv_txt,setRv_txt]=useState();
    const classes = useStyles();
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";
    const getUInfo=()=>{
        //console.log(touser+","+sp_num+","+fromseller);
        let uinfoUrl=localStorage.url+"/chat/u_info?u_num="+touser;
        axios.get(uinfoUrl).then(res=>{
            setUinfo(res.data);
        })
    }
    const sendReview = () => {
        let updateTempUrl=localStorage.url+"/updatetmp";
        //console.log(rv_tmp);
        //console.log(rv_txt);
        axios.post(updateTempUrl,{sp_num,touser,rv_tmp,rv_txt,fromseller})
       .then(res=>{
           updatetemprate(sp_num);
       });

    };
    const onClose=()=>{
        updatetemprate(0);
    }
    const sendrate=(value)=>{
        setRv_tmp(value);
        console.log('setRv_tmp'+rv_tmp);
    }
    useEffect(()=>getUInfo(),[touser]);
    return (
        <Dialog aria-labelledby="customized-dialog-title"
                open={updateTempOpen} >
            <DialogTitle id="customized-dialog-title" >
                <div style={{display:"flex",justifyContent: 'space-between'}}>
                    <div style={{display:"flex"}}>
                        <Avatar className={classes.avatar}>
                            <img alt={''} src={prfUrl+uinfo.prf_img} className={'MuiAvatar-img css-1pqm26d-MuiAvatar-img'}/>
                        </Avatar>
                        <div>&nbsp;{uinfo.prf_nick}님과의 거래가 어땠나요?</div>
                    </div>
                        <IconButton aria-label="close" style={{position:'relative',top:'-5px'}}
                                    onClick={onClose}>
                          <CloseIcon />
                        </IconButton>
                </div>
            </DialogTitle>
            <DialogContent className={classes.root} >
                <TempSlider sendrate={sendrate} rv_tmp={rv_tmp} />
                <TextField type={'text'}
                           id="standard-basic" label="간단한 후기를 남겨주세요"
                           onChange={(e)=>setRv_txt(e.target.value)}  style={{width:'500px',marginTop:'30px'}}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={sendReview} color="primary">
                    후기 보내기
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateTemp;