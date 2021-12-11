/*항공기 예매 화면*/
import express from "express";
import {selectSql, insertSql, updateSql, deleteSql} from "../database/sql"; //sql 기능 가져오기

const router = express.Router();

router.get('/',async function(req, res) {

    //예매를 위한 항공편 정보
    const leg_instance = await selectSql.getIns();
    const fare = await selectSql.getFare();
    res.render('reserv_insert', {
        leg_instance,
        fare
    }); 
});

router.post('/', async (req, res) => {
    const vars = req.body; //데이터를 담음
    const legs = await selectSql.getIns(); 
    let seat;
    let leg_number;

    //leg_instance의 정보 조회
    legs.map((leg) =>{
        if(vars.Flight_number == leg.Flight_number ) { 
            seat = leg.Number_of_available_seats - 1;
            leg_number = leg.Leg_number;
        }
    })
    //leg_instance 정보 저장
    const data1 = {
        Leg_number :leg_number,
        Number_of_available_seats : seat
    }

    //데이터를 각각의 변수에 저장
    const data = {
        Flight_number: vars.Flight_number,
        Leg_number: leg_number,
        Date: vars.Date,
        Seat_number: vars.Seat_number,
        Customer_name:vars.Customer_name,
        Customer_phone:vars.Customer_phone,
        Customer_id:vars.User_id
    };
    console.log(data);
    insertSql.setSeat(data); //data insert
    updateSql.updateIns(data1); //data update

    res.redirect('/reserv');
});

/* select */
router.get('/select',async function(req, res) {
    const vars = req.body;

    res.render('reserv_select');
});

router.post('/select', async(req, res ) => {
    const vars = req.body;

    const data = {
        Customer_id : vars.User_id
    }
    const seat_reservation = await selectSql.getSeat(data);

    //조건에 성립하는 투플만 보이도록 함
    res.render('reserv_select', {
        seat_reservation
    }); 
});

/*delete*/
router.get('/delete',async function(req, res) {;
    const seat_reservation = await selectSql.getSeat2(); 
    res.render('reserv_delete', {
        seat_reservation
    });
});

router.post('/delete', async(req, res ) => {
    const vars = req.body;

    const data = {
        Seat_number : vars.delBtn
    };

    deleteSql.deleteSeat(data);
    res.redirect('/reserv/delete');
});

//모듈로 반환
module.exports = router;