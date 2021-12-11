/*항공기 화면 */
import express from "express";
import {insertSql, selectSql, updateSql, deleteSql} from "../database/sql"; //sql 기능 가져오기

const router = express.Router();

/*insert */
router.get('/',async function(req, res) {

    //테이블 조회
    const airplane_type = await selectSql.getAirplane_type();
    const airplane = await selectSql.getAirplane();
    //데이터 전달
    res.render('airplane', {
        airplane_type,
        airplane
    }); 
});

router.post('/', (req, res) => {
    const vars = req.body; //데이터를 담음
    console.log(vars);
    
    //데이터를 각각의 변수에 저장
    const data1 = {
        Airplane_type_name : vars.Airplane_type_name,
        Max_seats:vars.Max_seats,
        Company:vars.Company,
    };
    insertSql.setAirplane_type(data1); //airplane type에 데이터 삽입

    const data2 = {
        Airplane_id:vars.Airplane_id,
        Airplane_type:vars.Airplane_type,
        Total_number_of_seats:vars.Total_number_of_seats
    };
    insertSql.setAirplane(data2); //airplane에 데이터 삽입
    res.redirect('/airplane');
});

/* update */
router.get('/update',async function(req, res) {

    //테이블 조회
    const airplane_type = await selectSql.getAirplane_type();
    const airplane = await selectSql.getAirplane();
    //데이터 전달
    res.render('airplane_update', {
        airplane_type,
        airplane
    }); 
});

router.post('/update', (req, res) => {
    const vars = req.body; //데이터를 담음
    //데이터를 각각의 변수에 저장
    const data1 = {
        Airplane_type_name : vars.delBtn1,
        Max_seats:vars.Max_seats,
    };

    const data2 = {
        Airplane_id : vars.delBtn2,
        Total_number_of_seats: vars.Total_number_of_seats
    };

    //데이터 수정
    updateSql.updateAirplane_type(data1);
    updateSql.updateAirplane(data2);
    res.redirect('/airplane/update');
});

/*delete */
router.get('/delete',async function(req, res) {
    //데이터 조회
    const airplane_type = await selectSql.getAirplane_type();
    const airplane = await selectSql.getAirplane();
    res.render('airplane_delete', {
        airplane_type,
        airplane
    }); 
});

router.post('/delete', (req, res) => {

    const vars = req.body; //데이터를 담음
    //데이터를 각각의 변수에 저장
    const data1 = {
        Airplane_type_name : vars.delBtn1,
    };

    const data2 = {
        Airplane_id : vars.delBtn2,
    };
    //데이터 삭제
    deleteSql.deleteAirplane_type(data1);
    deleteSql.deleteAirplane(data2);
    res.redirect('/airplane/delete');
});

//모듈로 반환
module.exports = router;