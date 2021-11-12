import express from "express";
import {selectSql, deleteSql} from "../database/sql";

const router = express.Router();

router.get('/', async(req,res) => {
    //const department = await selectSql.getDeparment();
    const univ = await selectSql.getUniv();
    //data 저장
    res.render('delete', {
        title: "삭제 기능",
        //department,
        univ
    })
});

router.post('/', async(req, res) =>{
    console.log('delete router:', req.body.delBtn);

    //button에서 입력받은 정보 저장
    const data = {
        Univ_num : req.body.delBtn
    };

    //deletesql문 실행, data 전달
    await deleteSql.deleteUniv(data);

    res.redirect('/select'); //select 화면으로 이동
});

//모듈로 반환
module.exports = router;