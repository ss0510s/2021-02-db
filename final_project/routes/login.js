/*로그인 화면 */
import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

//처음 화면
router.get('/',(req,res) => {
    res.render('login'); //login.hbs 파일과 연결
});

//버튼 클릭시 event
router.post('/',async(req,res) =>{
    const vars = req.body;
    const users = await selectSql.getUser(); //user의 정보 select
    
    let whoAmI = '';
    let checkLogin = false;

    //user의 역할 판단
    users.map((user) =>{ //user 정보와 입력한 정보 map
        console.log(user.User_id);
        if(vars.id === user.User_id && vars.password === user.passwd) { //user table에 존재하는 정보인 경우
            console.log('login success!');
            checkLogin = true;
            if(user.Role ==='admin') { //user의 role match
                whoAmI = 'admin';
            } else {
                whoAmI = 'user';
            }
        }
    })
    //user의 id와 match하여 redirect
    if(checkLogin && whoAmI === 'admin') {
        res.redirect('/airport'); //관리자 화면으로 이동
    
    } else if(checkLogin && whoAmI ==='user') {
        res.redirect('/reserv'); //고객 화면으로 이동
    } else { //user 테이블에 없는 정보인 경우
        console.log('login falied!');
        res.send("<script>alert('로그인에 실패했습니다.'); location.href='/';</script>");
    }
})

//모듈로 반환
module.exports = router;
