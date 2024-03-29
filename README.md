﻿# 2021-02-database
- 데이터베이스 설계

<br><br>

## 3주차 실습
### 목표
1. 임의의 데이터베이스를 생성하여 student 테이블 생성
2. student 테이블에 여러 개의 값 insert
3. mysql와 연동하여 테이블의 값을 웹페이지에 출력

### 실행 방법
1. 레포지토리 복사(wsl 환경에서 명령어 입력)
    - (SSH 설정한 경우) git clone git@github.com:ss0510s/2021-02-db.git
    - (token을 사용하는 경우) git clone https://github.com/ss0510s/2021-02-db.git
2. week_3 폴더로 이동
    > cd week_3
3. 콘솔창(powershell)에서 npm package 설치
    > npm install 
4. database/sq.js에서 본인의 데이터베이스 정보 입력

<pre>
<code>
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'userid', // 본인의 mysql user id
    database: 'week3', // 본인이 만든 데이터베이스 이름
    password: 'password', // 본인의 mysql password
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);
</code>
</pre>

5. 서버 실행
    > npm run start  

    웹 브라우저에 localhost:3000 입력

<br>

### 테이블 생성

### <span style = "color:blue" >user</span>

Field|Type|Null|Key|Default|Extra|
---|---|---|---|---|---|
studentID|int|NO|PRI|NULL||
studentName|char(20)|YES|PRI|NULL||
department|int|YES||NULL||
grade|int|YES||NULL||
admission_date|int|YES||NULL||
email|YES||NULL||

<br>

### 데이터베이스

### <span style = "color:red" >user</span>

studentID|studentName|department|grade|admission_date|email|
---|---|---|---|---|---|
12181734|김사람|정보통신공학과|4|2018년 3월 2일|123456@inha.edu|
12191732|남아람|정보통신공학과|3|2019년 3월 4일|12191700@inha.edu|
12201512|이사람|기계공학과|2|2021년 3월 2일|113243411@inha.edu|
12201744|박사람|정보통신공학과|2|2020년 3월 2일|11111111@inha.edu|
12211345|이아람|생명공학과|1|NULL|NULL|


## 8주차 실습
### 목표
1. 웹 상에서 데이터 삽입, 조회, 수정 기능 구현

### 실행방법
1. 레포지토리 복사(wsl 환경에서 명령어 입력)
    - (SSH 설정한 경우) git clone git@github.com:ss0510s/2021-02-db.git
    - (token을 사용하는 경우) git clone https://github.com/ss0510s/2021-02-db.git
2. week_3 폴더로 이동
    > cd week_8
3. 콘솔창(powershell)에서 npm package 설치
    > npm install
4. database/sq.js에서 본인의 데이터베이스 정보 입력

<pre>
<code>
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'userid', // 본인의 mysql user id
    database: 'week3', // 본인이 만든 데이터베이스 이름
    password: 'password', // 본인의 mysql password
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);
</code>
</pre>

5. 실행
     > npm run start  

     웹브라우저에 localhost:[port 번호] 입력

### 테이블 생성

### <span style = "color:blue" >employee</span>

Field|Type|Null|Key|Default|Extra|
---|---|---|---|---|---|
Fname|varchar(10)|NO||NULL||
Minit|char(1)|YES||NULL||
Lname|varchar(20)|NO||NULL||
Ssn|varchar(10)|NO|PRI|NULL||
Bdate|date|YES||NULL||
Address|varchar(30)|YES||NULL||
Sex|char(1)|YES||NULL||
Salary|decimal(5,0)|YES||NULL||
Super_ssn|char(9)|YES||NULL||
Dno|int|NO||NULL||

### <span style = "color:blue" >department</span>

Field|Type|Null|Key|Default|Extra|
---|---|---|---|---|---|
Dname|varchar(15)|NO|UNI|NULL||
Dnumber|int|NO|PRI|NULL||
Mgr_ssn|char(9)|NO|MUL|NULL||
Mgr_start_date|date|NO||NULL||

<br>

### 데이터베이스

### <span style = "color:red" >employee</span>

Fname|Minit|Lname|Ssn|Bdate|Address|Sex|Salary|Super_ssn|Dno|
---|---|---|---|---|---|---|---|---|---|
민하|D|아|12121212|2002-02-02|인천|여|34|12191754|1|
철수|M|길|12123456|2000-01-01|인천|남|1000|12191754|2|
수진||남|12191754|2000-05-10|인천 미추홀구|여|100||1|
길동|H|홍|12345678|1999-09-09|서울|남|43||3|
인하||김|87654321|2001-03-02|서울|여|100|12345678|3|

### <span style = "color:red" >department</span>

Dname|Dnumber|Mgr_ssn|Mgr_start_data|
---|---|---|---|
전기공학과|1|12191754|2000-01-01|
정보통신공학과|2|12123456|1989-09-01|
컴퓨터공학과|3|12345678|1988-08-08|

<br>

### 파일 설명
  - src/index.js : 서버 실행 코드 및 필요한 라우터 선언, 포트 번호  
  - routes/home.js : 홈 화면, 데이터 삽입 구현  
  - routes/select.js : 조회 화면, 데이터 조회 구현
  - routes/update.js : 수정 화면, 데이터 수정 구현
  - sql.js : 데이터베이스 기능 구현
  - views/layout.hbs : 전체적인 레이아웃 설정
  - views/home.hbs : home.js와 연동하여 form 구현
  - views/select.hbs : select.js와 연동하여 form 구현
  - views/updateEmployee.hbs, views/updateDepartment.hbs : update.js와 연동하여 form 구현, where 조건을 서버에 저장

<br>

## 10주차 실습
### 목표
1. 데이터베이스를 이용해 로그인 화면 구현
2. 웹 상에서 데이터 조회, 삭제 기능 구현

### 실행방법
1. 레포지토리 복사(wsl 환경에서 명령어 입력)
    - (SSH 설정한 경우) git clone git@github.com:ss0510s/2021-02-db.git
    - (token을 사용하는 경우) git clone https://github.com/ss0510s/2021-02-db.git
2. week_10 폴더로 이동
    > cd week_10
3. 콘솔창(powershell)에서 npm package 설치
    > npm install
4. database/sq.js에서 본인의 데이터베이스 정보 입력
<pre>
<code>
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'userid', // 본인의 mysql user id
    database: 'week3', // 본인이 만든 데이터베이스 이름
    password: 'password', // 본인의 mysql password
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);
</code>
</pre>

5. 실행
     > npm run start  

     웹브라우저에 localhost:[port 번호] 입력

<br>

### 테이블 생성
### <span style = "color:blue" >user</span>
Field|Type|Null|Key|Default|Extra|
---|---|---|---|---|---|
id|varchar(20)|NO|PRI|NULL||
Password|varchar(20)|NO||NULL||
Role|varchar(5)|NO||NULL||


### <span style = "color:blue" >department</span>
Field|Type|Null|Key|Default|Extra|
---|---|---|---|---|---|
Dname|varchar(15)|NO|UNI|NULL||
Dnumber|int|NO|PRI|NULL||

### <span style = "color:blue" >univ</span>
Field|Type|Null|Key|Default|Extra|
---|---|---|---|---|---|
univ_num|int|NO|PRI|NULL||
univ_name|varchar(50)|NO||NULL||
univ_address|varchar(50)|YES||NULL||

<br>

### 데이터베이스
### <span style = "color:red" >user</span>

Id|Password|Role|
---|---|---|
admin|admin1234|admin|
test|test1234|users|

### <span style = "color:red" >department</span>
Dname|Dnumber|
---|---|
전기공학과|2|
전자공학과|3|
정보통신공학과|0|
컴퓨터공학과|1|

### <span style = "color:red" >univ</span>
univ_num|univ_name|univ_address|
---|---|---|
1|inha university|incheon|
2|seoul university|seoul|
3|전남대학교|광주|
4|서울과학기술대학교|서울|
5|부산대학교|부산|

### 파일 설명
  - src/index.js : 서버 실행 코드 및 필요한 라우터 선언, 포트 번호  
  - routes/login.js : 로그인 화면, role에 따라 다른 화면으로 이동 
  - routes/select.js : 조회 화면, 데이터 조회 구현
  - routes/delete.js : 삭제 화면, 데이터 삭제 구현
  - sql.js : 데이터베이스 기능 구현
  - views/layout.hbs : 전체적인 레이아웃 설정
  - views/login.hbs : login.js와 연동하여 form 구현
  - views/select.hbs : select.js와 연동하여 form 구현
  - views/delete.hbs : delete.js와 연동하여 form 구현, where 조건을 서버에 저장

## final project
### 목표
항공기 예매 시스템 구현

### 실행방법
1. 레포지토리 복사(wsl 환경에서 명령어 입력)
    - (SSH 설정한 경우) git clone git@github.com:ss0510s/2021-02-db.git
    - (token을 사용하는 경우) git clone https://github.com/ss0510s/2021-02-db.git
2. final_project 폴더로 이동
    > cd final_project
3. 콘솔창(powershell)에서 npm package 설치
    > npm install
4. database/sq.js에서 본인의 데이터베이스 정보 입력
<pre>
<code>
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'userid', // 본인의 mysql user id
    database: 'airline', // 본인이 만든 데이터베이스 이름
    password: 'password', // 본인의 mysql password
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);
</code>
</pre>

5. 실행
     > npm run start  

     웹브라우저에 localhost:[port 번호] 입력

<br>

