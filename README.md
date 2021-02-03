# To-do-list
 Simple To-Do List website

1. 환경 : Nodejs(express) + typescript + MySQL
2. 기능 : 목록, 추가, 삭제, 기한에 따른 표시 ( 완료, 실패 )

# 실행

- npm run dev : app.ts 실행
- npm run build : js파일로 빌드
- npm start : app.js 실행


# 내역


## 2021-02-01

- Express + TS 기본 세팅
- gitignore 설정 : node_modules, dist

## 2021-02-02

- tsconfig.json, package.json 설정

- dotenv 모듈 추가
    - 설치 : npm install --save dotenv
    - .env파일의 환경변수 사용 ( gitignore에 추가 )
    - PORT 저장

- DB 연동
    - Node.js와 MySQL 연동
    - mysql 모듈 사용 : npm install --save mysql
    - DB connection 모듈화 : src/config/db.ts
    - .env파일에 DB 접속 정보 저장하여 외부 노출 방지

```
export class DB {       
    public connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    })
}

```

- view추가
    - bootstrap을 이용해 간단한 UI 추가
    - DB 데이터 출력 테스트

## 2021-02-03

- To-Do목록 불러오기 구현

- POST시 req.body값이 {}로 넘어온 문제 해결
    - <form enctype = "multipart/form-data"> 는 파일이나 이미지를 서버로 전송할 때 사용
    - multer 미들웨어를 사용해야함
    - 파일은 전송하지 않으므로, enctype 요소를 제거하고 app.ts에 코드를 추가함

```
app.use(express.urlencoded({ extended: false }));

```

- To-Do목록에 새로운 할일 추가 기능 구현