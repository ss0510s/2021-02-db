/*서버 실행 코드 및 필요한 라우터 선언*/
/* module 참조 */
import express from "express";
import logger from "morgan";
import path from "path"; //경로

import loginRouter from "../routes/login" //홈화면
import selectRouter from "../routes/select" //조회
import deleteRouter from "../routes/delete" //삭제
const PORT = 3000; //포트번호

const app = express(); //http 서버 연결

app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.set('views', path.join(__dirname, '../views'))
app.set('view engine','hbs')

app.use(logger("dev"));

//기본적인 라우터 설정
app.use('/',loginRouter); //홈화면 의미
app.use('/select',selectRouter); //select 화면 의미
app.use('/delete',deleteRouter);  //delete화면 의미

//서버실행
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
