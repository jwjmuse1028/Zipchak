import React, {useEffect, useState} from 'react'

const MapContainer = ({ searchPlace,sendselectloc }) => {
    const { kakao } = window
    const mapfunction=()=>{
        const container = document.getElementById('myMap')
        const options = {
            center: new kakao.maps.LatLng(37.4994078625536,127.029037792462),
            level: 3,
        }
        const map = new kakao.maps.Map(container, options)
        const ps = new kakao.maps.services.Places()
        ps.keywordSearch(searchPlace, placesSearchCB)

        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                let bounds = new kakao.maps.LatLngBounds()

                for (let i = 0; i < data.length; i++) {
                    displayMarker(data[i])
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
                }
                map.setBounds(bounds)
            }
        }
        function displayMarker(place) {
            let marker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(place.y, place.x),
                })
            ;
            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function (e) {
                sendselectloc(place);
            });

        }

    }


    useEffect(() => {
        mapfunction();
    }, [searchPlace])

    return (
        <div
            id="myMap"
            style={{
                width: '500px',
                height: '500px',
            }}>
        </div>
    )
}

export default MapContainer