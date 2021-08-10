# 제목: 감정 분석 다이어리 podo
<img src = "https://user-images.githubusercontent.com/79087007/128679660-36e7defa-726d-4957-98c1-13d00f9ec5f4.png">

# 간략소개
객관적으로 판단하기 어려운 본인의 감정을 일기 내용에 기반한 감정분석을 통해 자연스럽게 받아들이게 하는 것을 목표로 두었다. 해당 분석 결과는 감정마다 매칭되어 있는 이모티콘별로 사용자에게 출력시킨 웹 어플리케이션

# 개발 기간 및 작업 기여도
2021.05.18 ~ 2021.08 Front / Back 100% (개인 프로젝트)

# 개발 환경
+ Cloud
    + AWS - EC2
+ WEB Server
    + Nginx (Proxy)
+ Front
    + HTML, CSS , Javascript (ES6)
+ Back
    + Javascript, Node.js (REST-API)
+ DB
    + MySQL2
# 오픈 API 사용 현황
+ Kakao Login REST API (카카오 로그인)
+ AWS comprehends (AWS 텍스트 분석)
+ 외 chart.js 오픈 소스 사용 그 외비밀번호 저장 방식(Node.js 모듈 Crypto 이용): 개인정보보호법, 정보통신망법에 따른 해시암호(단방향) 저장.

# 서비스 주요 기능

### #0 로그인 & 회원가입 & 아이디, 비밀번호 찾기

<img src="https://user-images.githubusercontent.com/79087007/128834919-169dae4e-b730-46e2-8597-a9cc13e17dd0.png">

+ Node.js 모듈 Crypto 이용해 로그인과 회원가입 패스워드, 이메일 인증 시 개인정보보호법, 정보통신망법에 따른 해시암호(단방향) 저장.
+ 카카오 로그인 REST API 를 통해 간편한 가입 가능
+ 로그인 성공 시 ID,Nickname 서버 세션에 저장 (세션 관리)
+ 회원가입시 주요 항목별로 유효성 검사 진행 (패스워드, 이메일 정규식 사용)


### #1 메인(홈) & 일기 작성 & 일기 분석

<img src="https://user-images.githubusercontent.com/79087007/128833503-5d5a0a2f-f012-4491-9f7f-3b288efdd683.png">

+ 캘린더에 감정분석을 통한 데이터 중 주요 감정을 Emoji로 표현해 날짜와 함께 조회
+ main 페이지에서 저장한 date 세션을 가져와 dateBar에 입력시켰고, 해당 날짜가 아닐 시에는 일기 작성 및 수정 불가 
+ 작성된 일기를 바탕으로 AWS API comprehend를 이용해 감정 분석, 핵심키워드 데이터를 추출한 후 chat.js 오픈소스를 통해 도넛차트로 ㅣ시각화해서 보여줌.
+ 일기분석 후에 작성된 일기 목록이 있는 곳으로 이동

### #2 일기 목록 & 일기 수정 & 메인(홈) 

<img src="https://user-images.githubusercontent.com/79087007/128860671-b6e863d6-e97a-4731-af34-149b4d8908fc.png">

+ 최근 작성한 일기 부터 조회 (게시물 단위 첫 10개 스크롤시 5개 추가로 설정)
+ 날짜별(최근, 과거) / 감정별(긍정,부정,보통,복잡) 조회가 가능함.
+ 무한스크롤을 통해 조회한 데이터를 직관적으로 확인 가능
+ 선택한 날짜에 작성한 일기 페이지로 이동
+ 과거 작성을 통해 분석된 감정 및 핵심 키워드를 하단에 도넛 차트 형식으로 보여줌.

    
