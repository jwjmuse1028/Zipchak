import React from 'react';
import '../css/Footer.css';
import {Android, Apple, Facebook, Instagram, Twitter, YouTube} from "@material-ui/icons";

function Footer(props) {
    return (
        <footer className={'footer'}>
            <div className={'contents'}>
                <b>고객센터 ></b>
                <div style={{float:"right",color:'#828C94'}}>
                    <Apple fontSize={"large"}/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Android fontSize={"large"}/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Instagram fontSize={"large"}/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Twitter fontSize={"large"}/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Facebook fontSize={"large"}/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <YouTube fontSize={"large"}/>
                </div>
                <h3><strong>1234-5678</strong></h3>
                <span style={{color:'#2F3438', fontSize:'0.5em'}}>브랜드 | 스토리 | 회사소개 | 채용정보 | 이용약관 | <strong>개인정보처리방침</strong> | 공지사항 | 고객센터 | 고객의 소리 | 전문가 등록 | 사업자 구매 | 회원제휴/광고 문의 | 입점신청 문의 | 안전거래센터 | 상품광고 소개</span><br/><br/>
                <span style={{color:'#828C94', fontSize:'0.5em'}}>상호명 :(주)집에도착 :(고객문의) cs@arrivehome.net (제휴문의) contact@arrivehome.net 대표이사 :강재웅 사업자등록번호 :112-119 통신판매업신고번호 :제2022-서울서초-0460 <b>사업자정보확인</b></span><br/>
                <span style={{color:'#828C94', fontSize:'0.5em'}}>주소 :서울 강남구 강남대로94길 20 삼오빌딩 5-9층 채무지급보증안내 :(주)집에도착은 안전거래를 최대한 보장하고 있습니다. <b>서비스가입사실확인</b></span><br/><br/>
                <span style={{color:'#828C94', fontSize:'0.5em'}}>집에도착은 개별 판매자가 상품을 판매하는 중고마켓이며 (주)집에도착은 통신판매중개자로 거래 당사자가 아니므로, 판매자가 등록한 상품정보 및 거래 등에 대해 일체 책임을 지지 않습니다.</span><br/>
                <span style={{color:'#828C94', fontSize:'0.5em'}}>단 ㈜집에도착이 판매자로 등록 판매한 상품의 경우는 판매자로서 책임을 부담합니다.</span><br/>
                <span style={{color:'#2F3438', fontSize:'0.5em'}}>Copyright 2022. bucketplace, Co., Ltd. All rights reserved</span>
            </div>
        </footer>
    );
}

export default Footer;