## 프로젝트 개요

본 프로젝트는 요리와 관련된 웹을 만들어내는 프로젝트로 총 4명이서 약 2주간 작업을 진행하였습니다. 본 프로젝트의 주요 기능은 제목, 내용, 사진으로 구성된 글을 게시하는
것인데 이를 통해 다른 유저와 요리 레시피를 공유하는 것이 특징입니다. 또한 각 유저가 자신만의 냉장고 기능이 있어 그 안에 자신이 현재 가지고 있는 재료를 추가한 뒤, 검색을 하게
되면 자신이 가진 재료들로 필터링 된 요리 레시피를 볼 수 있습니다. 

본 프로젝트를 위해 데이터베이스는 스키마 설계, API 문서를 제작하는 것을 시작으로, 배포를 위해 RDS, EC2, S3, 도메인 생성을 하였습니다. 또한 전반적인 프로젝트는 
Node.js에서 Express 프레임 워크를 사용했고 데이터베이스로는 MySql을, 그리고 Node.js에서 MySql을 다루기 위해 Sequelize 라이브러리를 사용하였습니다. 전체적인 클라이언트 사이드 설계는 React를 사용하였고 CSS로 UI를 디자인 하였습니다. 보안을 위해서는 로그인 시에 서버에서 토큰을 발급하여 클라이언트에 보내주었고 유저 인증이 필요한
요청 시에 토큰을 서버에 전달하였습니다. 



### 사용한 모듈

1. 프론트엔드                    
- axios                             
- history                           
- react                            
- react-dom                       
- react-google-login                
- react-html-parser                 
- react-router-dom                

2. 백엔드
- axios
- cookie-parser  
- cors
- dotenv
- express                       
- morgan
- sequelize


### 스택

- Node.js
- Express
- MySql
- Sequelize
- React

### 부족했던 부분
프로젝트를 위해 주어진 시간이 약 2주 정도임을 고려하여 기능을 최소화 해, 백엔드와 프론트 엔드 전반적인 작업을 줄이고 버그 수정과 가지고 있는 기능 및 UI 개선을 하였으면
하는 점이 아쉬웠던 부분이였던 것 같습니다. 프론트엔드 부분에서 상태(state) 관리를 위해 본 프로젝트에서는 부모 컴포넌트에서 최종적으로 상태 관리를 하고 props를 통해 자식 컴포넌트에
전달하는 식으로 하였는데 앱의 규모가 커질수록 상태 관리가 미흡했던 것 같아서 다음 프로젝트에서는 Redux를 이용해 상태 관리를 할 계획을 가지고 있습니다. 여러 블로그 플랫폼들을 보면 글을
작성하는 곳에 보통 글과 이미지가 한 번에 기입되는 것을 볼 수 있는데 본 프로젝트에서도 그런 기능을 넣고 싶었지만 시간적으로나 아직 기술적으로도 다소 부족하여 글과 이미지를
따로 기입하는 방식을 이용하였습니다. 처음에 생각했던 기능들에 해시태그 같은 기능이 있었는데 시간 관계상 추가하지 못한 점 또한 아쉬웠던 부분이라고 생각합니다.

### Reference
|제목|url|
|------|---|
|Express 라우팅|https://expressjs.com/ko/guide/routing.html|
|Logo 생성|https://hatchful.shopify.com/|
|Axios API|https://xn--xy1bk56a.run/axios/guide/api.html#http-%EB%A9%94%EC%84%9C%EB%93%9C-%EB%B3%84%EC%B9%AD|
|React로 구글 로그인|https://www.npmjs.com/package/react-google-login|
|React 삼항 연산자|https://dahanweb.tistory.com, https://dev-csa.github.io|
|Git Wiki, README.md 작성|https://coding-factory.tistory.com/620|
|Multer-s3|https://www.npmjs.com/package/multer-s3|
