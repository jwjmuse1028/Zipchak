# 집착 : 집에도착

### Q) 집착이란?

A) "집에도착"의 줄임말로, '오늘의집'을 모티브로 한 인테리어 + 중고거래 사이트입니다.

### Q) 기획 의도는?

A) 셀프 인테리어가 유행인 요즘 회원들의 집 인테리어를 소개하면서 필요 없어진 물건들을 직접 인테리어 한 사진과 함께 중고거래를 할 수 있으면 좋을 거 같아서 기획하였습니다.

### Q) 주요 기능을 간단히 설명하자면?

A) 인테리어 소개글에는 사진과 함께 상품을 직접 태그에 추가할 수 있고 상품 페이지에서 관심 있는 상품은 판매자와 직접 소통할 수 있도록 채팅 기능을 구현하였습니다.

---

## 주요 페이지

1. **집들이** : 자신의 집을 소개하면서 좋아요와 댓글로 더욱 원활한 소통을 하고, 사진속에 상품을 태그를 할 수 있습니다.

2. **스토어** : 중고상품을 매매하면서 관심 있는 상품들을 북마크하고 판매자에게 즉시 채팅을 보낼 수 있습니다.

3. **채팅** : 판매자와 구매자끼리 대화를 할 수 있는 공간으로, 직거래시 만날 장소를 태그 할 수 있고 거래완료 후 서로에 대한 후기를 남길 수 있습니다.

4. **마이페이지** : 자신이 작성했거나 좋아요 + 북마크 한 게시물들을 볼 수 있고, 회원정보 수정을 할 수 있습니다.

---

## 나의 기여 파트
* ### 디자인
  * 프로젝트명
  * 메인로고
  * 헤더
  * 푸터
  * 광고이미지 슬라이드 5장 : 2초에 한번씩 슬라이드
  * 퀵메뉴 + TOP버튼
* ### 회원가입 + 로그인
  * 필수기재 항목만 입력해도 가입가능
  * 아이디+닉네임 중복체크
  * 프로필 사진 등록
  * 카카오 주소검색
  * 모달창 로그인
  * 로그인 완료시 헤더에 '(닉네임)님이 로그인중' 메시지와, 글쓰기 버튼 활성화
* ### 스토어
  * 상품게시글 crud
  * 상품목록 + 상세페이지에서 북마크(관심등록)
  * 카테고리별 검색
  * 제목 + 내용 검색
  * 판매완료시 완료표시
  * 관심수, 채팅수, 조회수 출력
  * 페이징
  * 구매자일시 '판매자에게 채팅하기' 버튼
  * 판매자일시 '판매완료 등록' 버튼
  * 판매자 클릭시 해당프로필로 이동

    
<img width="800" alt="image6" src="https://user-images.githubusercontent.com/111737716/209136456-ebcb4fa8-acf8-4f3c-b479-b7bec511a33c.png">
<img width="800" alt="image7" src="https://user-images.githubusercontent.com/111737716/209136721-62628171-a3e3-423b-b317-a5019ac4147f.png">
<img width="800" alt="image8" src="https://user-images.githubusercontent.com/111737716/209136727-c8dc42c5-a238-4f3a-bac0-df9fb5f195f9.png">
<img width="800" alt="image9" src="https://user-images.githubusercontent.com/111737716/209136730-cbe6b90c-8d9d-4ad0-b958-12dab850fe72.png">
<img width="370" alt="image10" src="https://user-images.githubusercontent.com/111737716/209136732-31f42480-ba1e-4f63-9b84-806a530f12e1.png">
<img width="800" alt="image11" src="https://user-images.githubusercontent.com/111737716/209136735-4583df39-9272-4c23-8873-c5cc6eaa9504.png">
<img width="800" alt="image12" src="https://user-images.githubusercontent.com/111737716/209136739-54e74636-de8c-49d4-839e-5d21ec87ba7e.png">

---

## 프로젝트 계획

* 기간 : 2022년 11월 09일 ~ 22년 12월 08일
* 팀원 : 총 4명

|**이름**|**역할**|**담당기능**|**Github 주소**|
|---|---|---|---|
|강재웅|풀스택|세팅, 상품태그|https://github.com/BryanKang9|
|노유선|풀스택|채팅, 마이페이지|https://github.com/GOBAEBAE|
|최진아|풀스택|인테리어 피드|https://github.com/j-a-27|
|정우진|풀스택|회원가입+로그인, 스토어|https://github.com/jwjmuse1028|

---

## 사용기술

* ### **Back** :
   * java
   * SpringBoot
   * MyBatis
   * Axios
   * MySQL
   
* ### **Front** :
   * React
   * Router
   * HTML/CSS
   * JavaScript
   * Material-UI
   
* ### **Tool** :
   * IntelliJ
   * Git
   * AWS S3
   * AWS RDS
   * Workbench
   * Websocket
   * Selenium

* ### **API** :
   * Kakao 지도 API
   * Kakao 주소 API
---

## ERD

<img width="800" alt="2022-12-22 214720" src="https://user-images.githubusercontent.com/111737716/209137688-ea088ec8-cb79-41b5-8436-662de6c08b97.png">
