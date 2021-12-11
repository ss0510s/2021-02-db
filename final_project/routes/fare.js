/*요금 화면*/
import express from "express";
import {insertSql, selectSql, updateSql, deleteSql} from "../database/sql"; //sql 기능 가져오기

const router = express.Router();

/*insert */
router.get('/',async function(req, res) {

    const fare = await selectSql.getFare();
    res.render('fare', {
        fare
    });
    
});

router.post('/', (req, res) => {
    const vars = req.body; //데이터를 담음

    //데이터를 각각의 변수에 저장
    const data = {
        Flight_number : vars.Flight_number,
        Fare_code : vars.Fare_code,
        Amount : vars.Amount
    };
;
    insertSql.setFare(data); //fare insert

    res.redirect('/fare');
});

/* update */
router.get('/update',async function(req, res) {

    const fare = await selectSql.getFare();
    res.render('fare_update', {
        fare
    });
});

router.post('/update', (req, res) => {
    const vars = req.body; //데이터를 담음
    
    //데이터를 각각의 변수에 저장
    const data = {
        Fare_code : vars.delBtn,
        Amount : vars.Amount
    };

    updateSql.updateFare(data); //update
    res.redirect('/fare/update');
});

/* delete */
router.get('/delete',async function(req, res) {

    const fare = await selectSql.getFare();
    res.render('fare_delete', {
        fare
    });
});

router.post('/delete', (req, res) => {

    const vars = req.body; //데이터를 담음
    
    //데이터를 각각의 변수에 저장
    const data = {
        Fare_code : vars.delBtn
    };

    deleteSql.deleteFare(data);
    res.redirect('/fare/delete');
});

//모듈로 반환
module.exports = router;