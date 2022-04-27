# Project. Muzyme

## Intro

* 개발자: 이의진

* 목적: 음악 과외 선생님들의 홍보를 쉽게 하기 위해서 개발

* 레퍼런스

  - https://www.udemy.com/course/the-complete-react-native-and-redux-course/

* 시작하게 된 이유

  하루는 개인 음악 교사님과 대화를 하는 시간을 가졌습니다. 그분은 본인 일에서 홍보하는 것이 힘들다고 했습니다. 저는 이 문제를 한번 해결해보고 싶었습니다. 왜냐하면 항상 개발자는 어떠한 어려움이 있을 때 기술적으로 해결하는 것이 역할이라고 생각하였고 제 주변에 있는 것부터 시작해보자는 것이 이유였습니다. 

* 기간: 22.04.04 ~ X

* Backend: https://github.com/DevStevenLee/PrivateTeacherAdvertisementBackend

## Stack

React Native, React Context, Axios, React Navigator, React Native Cli



## Contribution

##### React Navigator/Navigation

* navigationRef  만들어 회원가입에서 메인화면으로 이동할 때 switch navigator처럼 이동할 수 있게 함 

  (version 6에는 switch navigator을 지원하지 않기 개발자가 만들어야 함)

* 메인 stackNavigator에 본인 프로필을 위한 TopTab navigator을 자식 스크린으로 추가

* withNavigaton 만들어 랜더링을 안한 컴포넌트에 접근 가능

##### React Context

* 서버 데이터를 하나의 Context로 관리하고 로컬에서 my, teacher의 Context를 각각 만들어 관리하여 state 관리 효율성을 높임

##### Server

- 서버를 axios와 ngrok을 통해 로컬서버를 외부에서도 접속
- 서버에 요청을 보내기 위한 try, catch 구문을 asyncHandler에서 처리하게 함

##### Register

* 회원가입에 필요한 validation 기능 추가
* JWT 기반 인증 방식을 사용해 서버에서 가져온 토큰을 로컬에 저장함

##### Profile

* Image Picker 라이브러리를 이용해 사진 불러오기 기능 구현
* Image  Resizer을 통해 이미지의 크기를 줄여 서버 업로드 시간을 줄임
* Modal dropdown을 이용해 드랍다운 박스기능 구현 
* 시/도 선택에 따라 동적으로 지역 목록창이 바뀌는 기능 구현
* 필수항목들을 다 채울 때 check 아이콘 색깔이 보락색으로 바뀌는 기능 구현
* 항목을 입력할 때 항목의 색깔이 보라색으로 바뀌는 기능 구현
* X 아이콘을 눌렀을 때 입력된 항목들을 초기화하고 초기화면으로 돌아가는 기능 구현
* 본인 프로필 만든 후 "내 프로필" 버튼을 누르면 본인 프로필로 이동하는 기능 구현
* 본인 프로필에서 ... 버튼을 눌러 수정하기, 삭제하기 기능 추가

##### Bookmark

* 즐겨찾기 정보를 로컬에 저장해 데이터 손실을 방지함

##### Card

* 선생님 데이터들을 서버에서 가져와 동적으로 Card를 생성 

  

## Demo

#### 1. 로그인

![signin](https://user-images.githubusercontent.com/50033459/165408665-012f8497-9356-4b57-9b73-18e0630273a0.gif)



#### 2. 회원가입

![signup](https://user-images.githubusercontent.com/50033459/165408916-1c5ab3e7-d76d-408f-9af4-8bc65deff610.gif)



#### 3. 프로필 만들기

![create_my_profile](https://user-images.githubusercontent.com/50033459/165409191-47634f0f-73a6-4e19-b59d-8ae0f100ecb7.gif)



#### 4. 내 프로필

![my_profile](https://user-images.githubusercontent.com/50033459/165409286-48b40478-0aaf-40e6-bc79-e702d0835a3b.gif)



#### 5. 즐겨찾기

![bookmark](https://user-images.githubusercontent.com/50033459/165409313-a98c9515-3ea2-4e3a-8221-c5dc44f8d428.gif)

