import React, {useRef, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
const useStyles = makeStyles({
    root: {
        width: 400,
        margin:'auto'
    }
});
const marks = [
    {value: 0, label: '🤬'},
    {value: 10, label: '😡'},
    {value: 20, label: '️😠'},
    {value: 30, label: '🙁'},
    {value: 40, label: '😐'},
    {value: 50, label: '🙂'},
    {value: 60, label: '😄'},
    {value: 70, label: '😆'},
    {value: 80, label: '😘'},
    {value: 90, label: '🥰'},
    {value: 100, label: '😍'}
];
function valuetext(value) {
    return value;
}
function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) *10 +'°C';
}
function TempSlider(props) {
    const {sendrate, rv_tmp}=props;
    const classes = useStyles();
    //const [value, setValue] = React.useState(36.5);

    const handleSliderChange = (event, newValue) => {
        console.log('slider'+newValue);
        sendrate(newValue);
    };

    return (
        <div className={classes.root}>
            <div style={{height:'20px'}}></div>
            <Slider
                defaultValue={rv_tmp}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="on"
                step={10}
                marks={marks}
                min={0}
                max={100}
                onChange={handleSliderChange}
            />
        </div>
    );
}

export default TempSlider;