# 집착 : 집에도착

### Q) 집착이란?

A) "집에도착"의 줄임말로, '오늘의집'을 모티브로 한 인테리어+중고거래 사이트입니다.

### Q) 기획 의도는?

A) 셀프 인테리어가 유행인 요즘 회원들의 집 인테리어를 소개하면서 필요 없어진 물건들을 직접 인테리어 한 사진과 함께 중고거래를 할 수 있으면 좋을 거 같아서 기획하였습니다.

### Q) 주요 기능을 간단히 설명하자면?

A) 인테리어 소개글에는 사진과 함께 상품을 직접 태그에 추가할 수 있고 상품 페이지에서 관심 있는 상품은 판매자와 직접 소통할 수 있도록 채팅 기능을 구현하였습니다.

---

## 주요 페이지

1. **집들이** : 찾고자하는 과목의 수업을 한눈에 보기 쉽게 찾을 수 있고, 강좌의 정보와 강사의 평점을 확인 할 수 있습니다.

2. **스토어** : 회원들끼리 자유롭게 질문을 하거나 정보를 공유 할 수 있고, 좋아요와 댓글 등으로 더욱 원활한 소통을 할 수 있습니다.

3. **채팅** : 관리자에게 문의하고 답변을 받을 수 있습니다.

4. **마이페이지** : 회원이 장바구니에 담아놓은 강좌들을 확인 할 수 있고, 직접 작성한 글이나 회원정보 및 비밀번호 등을 확인하고 수정 할 수 있습니다.

---

## 나의 기여 파트

* ### 회원가입 + 로그인
  * 게시글 crud (회원만)
  * 자유 + 질문 두가지로 분류
  * 좋아요와 조회수를 기반으로 매주 새로운 인기게시글 TOP5 출력
  * 페이징 처리
  * 게시글 + 작성자 검색
  * 이미지 업로드
  * 좋아요 (회원만)
  * 좋아요한 회원들 수와 목록 출력
  * 댓글 작성+삭제 (회원만)
  * 게시글 신고 (회원만)
  * 이전글 + 다음글로 이동
  * 탈퇴한 회원명 '탈퇴회원'으로 변경
* ### 마이커뮤니티 (마이페이지)
  * 작성한 글 출력
  * 좋아요 한 글 출력
  * 댓글 단 글 출력
  * 클릭시 해당글로 이동
    
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
