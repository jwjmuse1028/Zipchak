import React, {useEffect} from 'react';

function MapOnly(props) {
    const { kakao } = window
    const {locy,locx}=props;
    const mapscript = () => {
        let container = document.getElementById(`kakaomap_${locy}`);
        let options = {
            center: new kakao.maps.LatLng(locy, locx),
            level: 2,
        };
        //map
        const map = new kakao.maps.Map(container, options);

        //마커가 표시 될 위치
        let markerPosition = new kakao.maps.LatLng(
            locy, locx
        );

        // 마커를 생성
        let marker = new kakao.maps.Marker({
            position: markerPosition,
        });

        // 마커를 지도 위에 표시
        marker.setMap(map);
    };
    useEffect(() => {
        mapscript();
    }, [locy]);

    return (
        <a href={`https://map.kakao.com/link/map/전송 받은 위치🏠,${locy},${locx}`} target={"_blank"}>
            <div id={`kakaomap_${locy}`} style={{ width: "100%", height: "170px",marginTop:'10px' }}></div></a>)
        ;
}

export default MapOnly;