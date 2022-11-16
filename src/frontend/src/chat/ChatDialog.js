import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ChatMessageList from "./ChatMessageList";

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

function ChatDialog(props) {
    const {open}=props;
    const [open1, setOpen1] = React.useState(false);

    const dialogOpen = () => {
        setOpen1(true);
    };
    const dialogClose = () => {
        setOpen1(false);
    };
    return (
        <div>
            {/*<Button variant="outlined" color="primary" onClick={dialogOpen}>*/}
            {/*    Open dialog*/}
            {/*</Button>*/}
            <Dialog onClose={dialogClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={dialogClose}>
                    Modal title
                </DialogTitle>
                <DialogContent dividers>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={dialogClose} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ChatDialog;