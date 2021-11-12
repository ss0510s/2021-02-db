/*조회하는 화면 기능 - 데이터베이스의 데이터 조회 구현 */
import express from "express";
import {selectSql} from "../database/sql"; //sql 기능 가져오기

const router = express.Router();

router.get('/',async function(req, res) {
    //각각의 테이블에서 조회한 데이터를 변수에 저장
    const department = await selectSql.getDeparment();
    const univ = await selectSql.getUniv();
    //view를 이용한 렌더링
    //views 폴더의 select.hbs파일과 연동하여 테이블에 데이터값을 제시함.
    res.render('select',{
        title1: 'IT 공대',
        title2: '대학교',
        department,
        univ
    });
});

//모듈로 반환
module.exports = router;