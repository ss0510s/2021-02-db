/*홈 화면 기능 - 데이터베이스에 데이터 삽입하는 코드 구현*/
import express from "express";
import {insertSql, selectSql} from "../database/sql" //sql 기능 가져오기

const router = express.Router();//라우터 핸들러

// 라우터 경로 : /, define the home page route
router.get('/', (req, res) => {
    res.render('home');
});

//버튼 클릭시 데이터를 저장
router.post('/', (req, res) => {
    const vars = req.body; //데이터를 담음
    const var_length = Object.keys(req.body).length; //키 배열의 길이

    if(var_length > 4) {
        //데이터를 각각의 변수에 저장
        const data = {
            Fname: vars.fname,
            Minit: vars.minit,
            Lname: vars.lname,
            Ssn: vars.ssn,
            Bdate: vars.bdate,
            Address: vars.address,
            Sex:vars.sex,
            Salary: vars.salary,
            Super_ssn: vars.super_ssn,
            Dno: vars.dno
        };

        //employee테이블에 데이터 삽입
        insertSql.setEmployee(data);
    } else {
        //데이터 저장
        const data = {
            Dname: vars.dname,
            Dnumber: vars.dnumber,
            Mgr_ssn: vars.mgr_ssn,
            Mgr_start_date: vars.mgr_start_date
        };
        //department 테이블에 데이터 삽입
        insertSql.setDepartment(data);
    }
    res.redirect('/'); //'/'화면으로 이동, 새로고침
});

//모듈로 반환
module.exports = router;