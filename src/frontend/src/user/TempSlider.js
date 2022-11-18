import React, {useRef, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
const useStyles = makeStyles({
    root: {
        width: 300
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

const valuetext=(value)=> {
    return value;
}
function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) *10 +'°C';
}
function TempSlider(props) {
    const {sendrate}=props;

    const handleChange = (event, newValue) => {
        //console.log(newValue)
        sendrate(newValue);
    };
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div style={{height:'30px'}}></div>
            <Slider
                defaultValue={36.5}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks={marks}
                min={0}
                max={100}
                onChange={handleChange}
            />
        </div>
    );
}

export default TempSlider;