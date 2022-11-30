import React, {useEffect, useState} from 'react';
import {Popover} from "@mui/material";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import '../css/FeedTag.css'

function FeedTagPopover(props) {
    const {anchorEl, popoverclose, tagpdnum, sp_num, detail} = props;
    const ur_num = sessionStorage.ur_num;
    const [selllist, setSelllist] = useState([]);
    const spURL = 'https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/';

    const useStyles = makeStyles((theme) => ({
        popover: {
            position: "relative",
            width: 400,
            height: 300,
            borderRadius: 10,
        },
    }));
    const classes = useStyles();

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const getselllist = () => {
        let getselllisturl = localStorage.url + "/getselllist?ur_num=" + ur_num;
        axios.get(getselllisturl).then(res => {
            setSelllist(res.data);
        })
    }
    useEffect(() => getselllist(), [open])

    const saveItem = (e) => {
        let tagsp = e.target.getAttribute("id")
        tagpdnum(tagsp)
        popoverclose()
    }

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={popoverclose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            className={classes.popover}
        >
            {
                sp_num === "0" ?
                    <div style={{marginTop: '15px'}}>
                        <ul className={'tag_ul'}>
                            {selllist && selllist.map((item, i) =>
                                <div key={i}>
                                    <li className={'tag_li'}>
                                        <div style={{display: "flex"}}>
                                            <img alt={''} src={spURL + item.img_name}
                                                 className={'tag_sp_img'}/>
                                            <div className={'tag_sp_title'}>{item.sp_title}</div>
                                            <button className={'tag_btn'} id={item.sp_num} onClick={saveItem}>선택</button>
                                        </div>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                    :
                    <div>
                        {selllist && selllist.map((item, i) =>
                            item.sp_num==sp_num &&
                            <div key={i}>
                                <li className={'tag_li'}>
                                    <div style={{display: "flex"}}>
                                        <img alt={''} src={spURL + item.img_name}
                                             className={'tag_sp_img'}/>
                                        <div className={'tag_sp_title'}>{item.sp_title}</div>
                                        {!detail?
                                            <button className={'tag_btn'} id={"0"} onClick={saveItem}>삭제</button>
                                            :''
                                        }
                                    </div>
                                </li>
                            </div>
                        )}
                    </div>
            }
        </Popover>
    );
}

export default FeedTagPopover;