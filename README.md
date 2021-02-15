# To-do-list
 Simple To-Do List website

1. 환경 : Nodejs(express) + typescript + MySQL
2. 기능 : 목록, 추가, 삭제, 기한에 따른 표시 ( 완료, 실패 )
    추가된 기능 : 수정, 오늘의 할일 조회
3. API서버 : https://github.com/Jisue/To-do-list-api

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
- 기능 보완
    - 수정시 취소 버튼 생성
    - 삭제,완료시 재확인

## 2021-02-07
- Navigation Bar 수정
    - Add, List, Delete 항목으로 이동 가능
- 휴지통 기능 구현
    - 영구 삭제 가능
    - 복원 가능

## 2021-02-08
- Mysql SP(Stored Procedure)작성
```
DELIMITER //

CREATE PROCEDURE `procedure`(
    IN value INT,
    ...
)
BEGIN
    SELECT,INSERT,UPDATE,DELETE 
    ...;
END //

DELIMITER ;

```
    - DELIMITER : 문법의 끝을 나타내는 역할, 구문 문자
- query문들을 Call Procedure로 변경

## 2021-02-09

## REST API 서버 설계
```
- get : 
    - /todos	        : 프론트 파일을 제공, 전체 목록을 불러옴
    - /trashs	        : 휴지통 불러옴
    - /edited 	        : 수정 완료 페이지
    - /editing          : 수정 페이지 불러옴
    - /todos/:id        : id값으로 특정 todo를 찾음
- post
    - /todos	        : list 목록을 추가
- put
    - /todos/:id        : id값으로 특정 list 수정
    - /todos/:id/status : 상태 수정
    - /todos/:id/on     : 목록 on off 수정
    - /trashs/:id       : id 값으로 특정 휴지통 리스트 수정
    - /trashs/:id/on    : id 값으로 목록 복구
- delete
    - /todos/:id        : id값으로 특정 list 제거
```