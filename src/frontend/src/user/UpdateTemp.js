import React, {useEffect, useState} from 'react';
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
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

function UpdateTemp(props) {
    const {toUser, updateTempOpen,updatetemprate}=props;
    const [uinfo,setUinfo]=useState({});
    const [rate,setRate]=useState(0);
    const classes = useStyles();
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";
    const getUInfo=()=>{
        let uinfoUrl=localStorage.url+"/chat/u_info?u_num="+toUser;
        axios.get(uinfoUrl).then(res=>{
            setUinfo(res.data);
        })
    }
    const handleClose = () => {
        let updateTempUrl=localStorage.url+"/updatetmp?ur_num="+toUser+"&newtmp="+rate;
        axios.get(updateTempUrl).then(res=>"");
        updatetemprate('성공');
    };
    const sendrate=(value)=>{
        setRate(value);
    }

    useEffect(()=>getUInfo(),[toUser]);
    return (
        <div>
            <Dialog aria-labelledby="customized-dialog-title" open={updateTempOpen}>
                <DialogTitle id="customized-dialog-title" >
                    <div style={{display:"flex"}}>
                    <Avatar className={classes.avatar}>
                        <img alt={''} src={prfUrl+uinfo.prf_img} className={'MuiAvatar-img css-1pqm26d-MuiAvatar-img'}/>
                    </Avatar>
                    <div>{uinfo.prf_nick}님과의 거래가 어땠나요?</div></div>
                </DialogTitle>
                <DialogContent dividers>
                    <TempSlider sendrate={sendrate}/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        후기 보내기
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UpdateTemp;