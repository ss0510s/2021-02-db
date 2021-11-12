import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get('/',(req,res) => {
    res.render('login');
});

router.post('/',async(req,res) =>{
    const vars = req.body;
    const users = await selectSql.getUsers(); //user의 정보 select
    
    let whoAmI = '';
    let checkLogin = false;

    users.map((user) =>{ //user 정보와 입력한 정보 map
        console.log(user.Id);
        if(vars.id === user.Id && vars.password === user.Password) { //user table에 존재하는 정보인 경우
            console.log('login success!');
            checkLogin = true;
            if(vars.id ==='admin') { //user의 id match
                whoAmI = 'admin';
            } else {
                whoAmI = 'user';
            }
        }
    })

    //user의 id와 match하여 redirect
    if(checkLogin && whoAmI === 'admin') {
        res.redirect('/delete');
    } else if(checkLogin && whoAmI ==='user') {
        res.redirect('/select');
    } else { //user 테이블에 없는 정보인 경우
        console.log('login falied!');
        res.send("<script>alert('로그인에 실패했습니다.'); location.href='/';</script>");
    }
})

//모듈로 반환
module.exports = router;