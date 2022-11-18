import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import axios from "axios";
import UpdateTemp from "../user/UpdateTemp";
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});
function BuyerList(props) {
    const {buyerlistOpen,buyerlistClose,sp_num}=props;
    const [buyers,setBuyers]=useState([]);
    const [toUser,setToUser]=useState(0);
    const [updateTempOpen,setUpdateTempOpen]=useState(false);
    const classes = useStyles();
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";

    const handleListItemClick = (buyer) => {
        setToUser(buyer);
        setUpdateTempOpen(true);

    };

    const getbuyer=()=>{
        let getbuyerUrl=localStorage.url+"/getbuyer?sp_num="+sp_num;
        axios.get(getbuyerUrl).then(res=>
            setBuyers(res.data)
        )
    }
    const updatetemprate=(val)=>{
        setUpdateTempOpen(false);
        buyerlistClose(toUser);
    }
    useEffect(()=>getbuyer(),[]);
    return (
        <Dialog aria-labelledby="simple-dialog-title" open={buyerlistOpen}>
            <DialogTitle id="simple-dialog-title">판매하신 분을 선택해주세요 </DialogTitle>
            <List>
                {
                    buyers &&
                    buyers.map((buyer) => (
                    <ListItem button onClick={() => handleListItemClick(buyer.buyer_num)} key={buyer.buyer_num}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <img alt={''} src={prfUrl+buyer.prf_img} className={'MuiAvatar-img css-1pqm26d-MuiAvatar-img'}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={buyer.buyer_nick} />
                    </ListItem>
                ))}
            </List>
            <UpdateTemp toUser={toUser} updateTempOpen={updateTempOpen} updatetemprate={updatetemprate}/>
        </Dialog>
    );
}

export default BuyerList;