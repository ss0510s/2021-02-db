/*항공기 화면 */
import express from "express";
import {insertSql, selectSql, updateSql, deleteSql} from "../database/sql"; //sql 기능 가져오기

const router = express.Router();

/* select 쿼리 */
router.get('/',async function(req, res) {

    const airport = await selectSql.getAirport();
    //ariprot.hbs 파일와 연결, form의 airport에 데이터 전송
    res.render('airport', {
        airport
    }); 
});

//form에서 데이터를 받음
router.post('/', (req, res) => {
    const vars = req.body; //데이터를 담음

    //데이터를 각각의 변수에 저장
    const data = {
        Airport_code : vars.Airport_code,
        Name:vars.Name,
        City:vars.City,
        State:vars.State
    };

    insertSql.setAirport(data); //airport 데이터 삽입
    res.redirect('/airport');
});

/*update 쿼리 */
router.get('/update',async function(req, res) {

    const airport = await selectSql.getAirport();
    res.render('airport_update', {
        airport
    }); 
});

router.post('/update', (req, res) => {
    const vars = req.body; //데이터를 담음

    //데이터를 각각의 변수에 저장
    const data = {
        Airport_code : req.body.delBtn,
        Name:vars.Name,
    };

    updateSql.updateAirport(data); //데이터 update
    res.redirect('/airport/update');
});

/*delete 쿼리*/
router.get('/delete',async function(req, res) {

    const airport = await selectSql.getAirport();
    res.render('airport_delete', {
        airport
    }); 
});

router.post('/delete', (req, res) => {

    //데이터를 각각의 변수에 저장
    const data = {
        Airport_code : req.body.delBtn
    };

    deleteSql.deleteAirport(data); // 데이터 삭제
    res.redirect('/airport/delete');
});

//모듈로 반환
module.exports = router;