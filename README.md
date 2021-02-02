# To-do-list
 Simple To-Do List website

1. 환경 : Nodejs(express) + typescript + MySQL
2. 기능 : 목록, 추가, 삭제, 기한에 따른 표시 ( 완료, 실패 )

# 실행

- npm run dev : app.ts 실행
- npm run build : js파일로 빌드
- npm start : app.js 실행


### 개발 진행

# 2021-02-01

- Express + TS 기본 세팅
- gitignore 설정 : node_modules, dist

# 2021-02-02

- tsconfig.json, package.json 설정

- dotenv 모듈 추가
    - 설치 : npm install --save dotenv
    - .env파일의 환경변수 사용 ( gitignore에 추가 )
    - DB 접속 정보, PORT 저장