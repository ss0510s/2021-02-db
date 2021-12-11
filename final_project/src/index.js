/*서버 실행 코드 및 필요한 라우터 선언*/
/* module 참조 */
import express from "express";
import logger from "morgan";
import path from "path"; //경로

import loginRouter from "../routes/login" //로그인
import registerRouter from "../routes/register" //회원가입
import airportRouter from "../routes/airport" //공항
import airplaneRouter from "../routes/airplane" //항공기
import flightRouter from "../routes/flight" //항공편
import fareRouter from "../routes/fare" //요금
import reservRouter from "../routes/reserv" //예약

const PORT = 3021; //포트번호

const app = express(); //http 서버 연결

app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.set('views', path.join(__dirname, '../views'))
app.set('view engine','hbs')

app.use(logger("dev"));

//기본적인 라우터 설정
app.use('/',loginRouter);
app.use('/register',registerRouter);
app.use('/airport',airportRouter); 
app.use('/airplane',airplaneRouter);
app.use('/flight',flightRouter);
app.use('/fare',fareRouter);
app.use('/reserv',reservRouter);

//서버실행
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
