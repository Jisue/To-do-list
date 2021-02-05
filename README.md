# To-do-list
 Simple To-Do List website

1. 환경 : Nodejs(express) + typescript + MySQL
2. 기능 : 목록, 추가, 삭제, 기한에 따른 표시 ( 완료, 실패 )
    추가된 기능 : 수정, 오늘의 할일 조회

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
    - form태그의 enctype = "multipart/form-data" 는 파일이나 이미지를 서버로 전송할 때 사용
    - multer 미들웨어를 사용해야함
    - 파일은 전송하지 않으므로, enctype 요소를 제거하고 app.ts에 코드를 추가함

```
app.use(express.urlencoded({ extended: false }));
```

- To-Do목록에 새로운 할일 추가 기능 구현
    - add 버튼 클릭시 DB에 새로운 메모 저장

## 2021-02-04

- 삭제 기능 구현
    - delete 버튼 클릭시 DB에거 논리적으로 제거됨 
    - ( on요소가 0이 됨 )
- Date 생성자를 이용하여 오늘 할일 구분

```
let newDate = new Date();
let time = newDate.toJSON().slice(0,10);
```

- 추가 기능을 구현하여 DB와 연동 완료
    - 완료 기능 구현
        - 오른쪽 하단 버튼을 누르면 Done으로 처리됨
    - 실패 기능 구현
        - Date()가 현재 날짜 이전이면 Failed처리됨
    - 수정 기능 구현
        - Edit버튼을 누르면 수정창으로 이동함
        - 완료 버튼은 누르면 원래 페이지로 돌아감


## 2021-02-05
- routes 세분화
- 수정시, 기존 내용이 보이도록함

## 보완할 내역들
- 목록 이름 중복 처리
- 실패한 항목 다시 도전하기
- 삭제시 물어보기 or 휴지통만들기
- add 할때도 물어보기..?
- sp로 바꿔보기
- sql 인젝션 공격 찾아보기..
- api서버를 만들고 ( 디비를 분리 해서 )