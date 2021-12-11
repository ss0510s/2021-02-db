/*회원가입 화면 */
import express from "express";
import { insertSql } from "../database/sql";

const router = express.Router();

router.get('/',(req,res) => {
    res.render('register');
});

/*form으로 부터 데이터를 받음*/
router.post('/', (req, res) => {
    const vars = req.body; //데이터를 담음

    //데이터를 각각의 변수에 저장
    const data = {
        User_id: vars.id,
        passwd: vars.passwd,
        User_name: vars.User_name,
        User_phone: vars.User_phone,
        ssn: vars.ssn,
        Role: vars.Role
    };

    console.log(data.User_id);
    //user 테이블에 데이터 삽입
    insertSql.setUser(data);
    
    res.redirect('/'); //'/'화면으로 이동, 새로고침
});


//모듈로 반환
module.exports = router;