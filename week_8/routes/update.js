/*데이터 수정 기능 - 데이터베이스의 데이터 수정 기능 구현 */
import express from "express";
import {selectSql, updateSql} from "../database/sql"; //sql기능 가져오기

const router = express.Router();

//기존의 입력 값 불러오기, employee테이블
router.get('/employee',async(req,res)=>{
    //기존의 값을 조회한 뒤 변수에 저장
    const emp_res = await selectSql.getEmployee();
    
    //views를 이용한 렌더링, view updateEmployee
    //views 폴더의 updateEmployee.hbs파일과 연동하여 테이블에 데이터값을 제시함.
    res.render("updateEmployee", {
        title: "직원 테이블 갱신",
        emp_res
    })
});

//기존의 입력 값 불러오기, department테이블
router.get('/department',async(req,res)=>{
    //기존의 값을 조회한 뒤 변수에 저장
    const dept_res = await selectSql.getDeparment();
    
    //views를 이용한 렌더링, view updateEmployee
    //views 폴더의 updateEmployee.hbs파일과 연동하여 테이블에 데이터값을 제시함.
    res.render("updateDepartment", {
        title: "부서 테이블 갱신",
        dept_res
    })
});

// 수정 버튼을 눌렀을 경우, update query를 실행하며 조회 페이지로 이동
router.post('/employee',async(req, res) => {
    const vars = req.body;
    console.log(vars.salary);
    console.log(vars.ssn);
    const data = {
        Ssn : vars.ssn, //조건
        Salary: vars.salary //변경할 값
    }
    //입력한 데이터를 update
    await updateSql.updateEmployee(data);

    res.redirect('/select');
});

// 수정 버튼을 눌렀을 경우, update query를 실행하며 조회 페이지로 이동
router.post('/department',async(req, res) => {
    const vars = req.body;
    console.log(vars.dname);
    console.log(vars.dnumber);

    const data = {
        Dname: vars.dname, //변경할 값
        Dnumber: vars.dnumber //조건
    };
    //입력한 데이터를 update
    await updateSql.updateDepartment(data);

    res.redirect('/select');
});

//모듈로 반환
module.exports = router;
