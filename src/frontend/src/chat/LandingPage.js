import React, { useState } from 'react'
import MapContainer from './MapContainer'
import Button from "@material-ui/core/Button";

function LandingPage({sendselectloc}) {
    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState('')

    const onChange = (e) => {
        setInputText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPlace(InputText)
        setInputText('')
    }

    return (
        < >
            <form className="inputForm" onSubmit={handleSubmit}
                style={{marginBottom:'10px'}}>
                <div style={{display:'flex',width:'100%'}}>
                <input placeholder="공유할 장소를 입력해주세요" style={{width:'100%'}}
                       className={'form-control'} onChange={onChange} value={InputText} />
                    <Button type="submit" color="primary" style={{width:'80px',color:'#35c5f0'}}>장소검색</Button>
                </div>
            </form>
            <div>마커를 클릭하면 위치가 전송됩니다😆</div>
            <MapContainer searchPlace={Place} sendselectloc={sendselectloc} />
        </>
    )
}

export default LandingPage