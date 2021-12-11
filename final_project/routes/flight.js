/*항공편 화면*/
import express from "express";
import {insertSql, selectSql, updateSql, deleteSql} from "../database/sql"; //sql 기능 가져오기

const router = express.Router();

/* insert*/
router.get('/',async function(req, res) {
    //데이터 조회
    const flight = await selectSql.getFlight();
    const flight_leg = await selectSql.getLeg();
    const leg_instance = await selectSql.getIns();
    res.render('flight', {
        flight,
        flight_leg,
        leg_instance
    }); 
});

router.post('/', async(req,res) =>{
    const vars = req.body; //데이터를 담음
    const var_length = Object.keys(req.body).length; //키 배열의 길이

    //데이터를 각각의 변수에 저장
    if(var_length < 4) {
        //flight 테이블
        const data1 = {
            Flight_number : vars.Flight_number,
            Airline:vars.Airline,
            Weekdays:vars.Weekdays,
        };
        insertSql.setFlight(data1);
    } else if(var_length< 7){
        //flight_leg 테이블
        const data2 = {
            Flight_number : vars.Flight_number,
            Leg_number : vars.Leg_number,
            Departure_airport_code : vars.Departure_airport_code,
            Scheduled_department_time : vars.Scheduled_department_time,
            Arrival_airport_code : vars.Arrival_airport_code,
            Scheduled_arrival_time: vars.Scheduled_arrival_time
        };
        insertSql.setLeg(data2);
    }else {
        //leg_instance 테이블
        const data3 = {
            Flight_number : vars.Flight_number,
            Leg_number : vars.Leg_number,
            Date : vars.Date,
            Number_of_available_seats: vars.Number_of_available_seats,
            Airplane_id: vars.Airplane_id,
            Departure_airport_code : vars.Departure_airport_code,
            Departure_time : vars.Departure_time,
            Arrival_airport_code : vars.Arrival_airport_code,
            Arrival_time: vars.Arrival_time
        };
        insertSql.setIns(data3);

    }
    res.redirect('/flight');
});

/*update */
router.get('/update',async function(req, res) {

    const flight = await selectSql.getFlight();
    const flight_leg = await selectSql.getLeg();
    const leg_instance = await selectSql.getIns();
    res.render('flight_update', {
        flight,
        flight_leg,
        leg_instance
    }); 
});

router.post('/update', (req, res) => {
    const vars = req.body; //데이터를 담음
    //데이터를 각각의 변수에 저장
    //flight 테이블
    const data1 = {
        Flight_number : vars.delBtn1,
        Airline:vars.Airline
    };
    updateSql.updateFlight(data1);
    //flight_leg 테이블
    const data2 = {
        Leg_number : vars.delBtn2,
        Scheduled_arrival_time: vars.Scheduled_arrival_time
    };
    updateSql.updateLeg(data2);
    //leg_instance 테이블
    const data3 = {
        Leg_number : vars.delBtn3,
        Number_of_available_seats: vars.Number_of_available_seats
    };
    updateSql.updateIns(data3);
    res.redirect('/flight/update');
});
/*delete*/
router.get('/delete',async function(req, res) {

    const flight = await selectSql.getFlight();
    const flight_leg = await selectSql.getLeg();
    const leg_instance = await selectSql.getIns();
    res.render('flight_delete', {
        flight,
        flight_leg,
        leg_instance
    }); 
});

router.post('/delete', (req, res) => {

    const vars = req.body; //데이터를 담음
    //데이터를 각각의 변수에 저장
    const data1 = {
        Flight_number : vars.delBtn1,
    };

    const data2 = {
        Leg_number : vars.delBtn2,
    };

    const data3 = {
        Leg_number : vars.delBtn3,
    };

    deleteSql.deleteFlight(data1);
    deleteSql.deleteLeg(data2);
    deleteSql.deleteIns(data3);
    res.redirect('/flight/delete');
});

//모듈로 반환
module.exports = router;