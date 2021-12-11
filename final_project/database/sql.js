/*데이터 베이스와 관련된 기능 구현 */
import mysql from "mysql2";

const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root', // 본인의 mysql user id
    database: 'airline', // 데이터베이스 이름
    password: 'n20562401n!', // password
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

// async / await 사용
const promisePool = pool.promise();

/* 모든 테이블의 sql문 생성 */
/* select sql문 */
export const selectSql = {
    //airplane select
    getAirplane : async () => {
        //쿼리에 select 명령문 실행한 결과를 변수에 저장
        const [rows] = await promisePool.query(`select * from airplane`);

        return rows;
    },
    //airplane_type select
    getAirplane_type : async () => {
        //select문을 실행한 결과를 변수에 저장 후 반환
        const [rows] = await promisePool.query(`select * from airplane_type`);
        return rows;
    },
    //airport select
    getAirport : async () => {
        //select문을 실행한 결과를 변수에 저장 후 반환
        const [rows] = await promisePool.query(`select * from airport`);
        return rows;
    },
    //flight select
    getFlight : async () => {
        //select문을 실행한 결과를 변수에 저장 후 반환
        const [rows] = await promisePool.query(`select * from flight`);
        return rows;
    },
    //flight_leg
    getLand : async () => {
        //select문을 실행한 결과를 변수에 저장 후 반환
        const [rows] = await promisePool.query(`select * from can_land`);
        return rows;
    },
    //flight_leg
    getLeg : async () => {
        //select문을 실행한 결과를 변수에 저장 후 반환
        const [rows] = await promisePool.query(`select * from flight_leg`);
        return rows;
    },
    getLeg_where : async (data) => {
        //select문을 실행한 결과를 변수에 저장 후 반환
        const [rows] = await promisePool.query(`select * from flight_leg where Flight_number = "${data.Flight_number}"`);
        return rows;
    },
    //leg_instance
    getIns : async () => {
        //select문을 실행한 결과를 변수에 저장 후 반환
        const [rows] = await promisePool.query(`select * from leg_instance`);
        return rows;
    },
    getIns_user : async (data) => {
        //select문을 실행한 결과를 변수에 저장 후 반환
        const [rows] = await promisePool.query(`select * from leg_instance where Flight_number = "${data.Flight_number}"`);
        return rows;
    },
    getSeat : async (data) => {
        //select문을 실행한 결과를 변수에 저장 후 반환
        const [rows] = await promisePool.query(`select * from seat_reservation where Customer_id = "${data.Customer_id}"`);
        return rows;
    },
    getSeat2 : async (data) => {
        //select문을 실행한 결과를 변수에 저장 후 반환
        const [rows] = await promisePool.query(`select * from seat_reservation`);
        return rows;
    },
    getFare : async () => {
        //select문을 실행한 결과를 변수에 저장 후 반환
        const [rows] = await promisePool.query(`select * from fare`);
        return rows;
    },
    getUser : async () => {
        //select문을 실행한 결과를 변수에 저장 후 반환
        const [rows] = await promisePool.query(`select * from user`);
        return rows;
    },
}

/*insert sql문 */
export const insertSql = {
    // data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query문 생성
    setAirport : async (data) => {
        //sql에 insert문 저장
        const sql = `insert into airport values (
            "${data.Airport_code}", "${data.Name}", "${data.City}", "${data.State}")`;
        //query문 생성
            await promisePool.query(sql);
    },
    setAirplane: async (data) => {
        //sql에 insert문 저장
        const sql = `insert into airplane values (
            "${data.Airplane_id}", "${data.Airplane_type}", "${data.Total_number_of_seats}")`;
        //query문 생성
            await promisePool.query(sql);
    },
    setAirplane_type : async (data) => {
        //sql에 insert문 저장
        const sql = `insert into airplane_type values (
            "${data.Airplane_type_name}", "${data.Max_seats}", "${data.Company}")`;
        //query문 생성
            await promisePool.query(sql);
    },
    setLand : async (data) => {
        //sql에 insert문 저장
        const sql = `insert into can_land values (
            "${data.Airport_code}", "${data.Airplane_type_name}")`;
        //query문 생성
            await promisePool.query(sql);
    },
    setFlight : async (data) => {
        //sql에 insert문 저장
        const sql = `insert into flight values (
            "${data.Flight_number}", "${data.Airline}", "${data.Weekdays}")`;
        //query문 생성
            await promisePool.query(sql);
    },
    setLeg : async (data) => {
        //sql에 insert문 저장
        const sql = `insert into flight_leg values (
            "${data.Flight_number}", "${data.Leg_number}", "${data.Departure_airport_code}", 
            "${data.Scheduled_department_time}","${data.Arrival_airport_code}","${data.Scheduled_arrival_time}")`;
        //query문 생성
            await promisePool.query(sql);
    },
    setIns : async (data) => {
        //sql에 insert문 저장
        const sql = `insert into leg_instance values (
            "${data.Flight_number}", "${data.Leg_number}", "${data.Date}", "${data.Number_of_available_seats}","${data.Airplane_id}","${data.Departure_airport_code}", 
            "${data.Departure_time}","${data.Arrival_airport_code}","${data.Arrival_time}")`;
       //query문 생성
            await promisePool.query(sql);
    },
    setFare : async (data) => {
        //sql에 insert문 저장
        const sql = `insert into fare values (
            "${data.Flight_number}", "${data.Fare_code}", "${data.Amount}")`;
        //query문 생성
            await promisePool.query(sql);
    },
    setSeat : async (data) => {
        //sql에 insert문 저장
        const sql = `insert into seat_reservation values (
            "${data.Flight_number}", "${data.Leg_number}", "${data.Date}", "${data.Seat_number}",
            "${data.Customer_name}", "${data.Customer_phone}", "${data.Customer_id}")`;
        //query문 생성
            await promisePool.query(sql);
    },

    setUser : async (data) => {
        //sql에 insert문 저장
        const sql = `insert into user values (
            "${data.User_id}", "${data.passwd}", "${data.User_name}", "${data.User_phone}",
            "${data.ssn}","${data.Role}")`;
        //query문 생성
            await promisePool.query(sql);
    }
}

/* delete sql 문 */
export const deleteSql = {
    deleteAirport : async (data) => {
        //where 조건을 만족하는 행에 대하여 delete
        const sql = `delete from airport where Airport_code = "${data.Airport_code}"`;
        await promisePool.query(sql);
    },
    deleteAirplane : async (data) => {
        //where 조건을 만족하는 행에 대하여 delete
        const sql = `delete from airplane where Airplane_id = "${data.Airplane_id}"`;
        await promisePool.query(sql);
    },
    deleteAirplane_type : async (data) => {
        //where 조건을 만족하는 행에 대하여 delete
        const sql = `delete from airplane_type where Airplane_type_name = "${data.Airplane_type_name}"`;
        await promisePool.query(sql);
    },
    deleteLand : async (data) => {
        //where 조건을 만족하는 행에 대하여 delete
        const sql = `delete from can_land where Airport_code = "${data.Airport_code}"`;
        await promisePool.query(sql);
    },
    deleteFare : async (data) => {
        //where 조건을 만족하는 행에 대하여 delete
        const sql = `delete from fare where Fare_code = "${data.Fare_code}"`;
        await promisePool.query(sql);
    },
    deleteFlight : async (data) => {
        //where 조건을 만족하는 행에 대하여 delete
        const sql = `delete from flight where Flight_number = "${data.Flight_number}"`;
        await promisePool.query(sql);
    },
    deleteLeg : async (data) => {
        //where 조건을 만족하는 행에 대하여 delete
        const sql = `delete from flight_leg where Leg_number = "${data.Leg_number}"`;
        await promisePool.query(sql);
    },
    deleteIns : async (data) => {
        //where 조건을 만족하는 행에 대하여 delete
        const sql = `delete from leg_instance where Leg_number = "${data.Leg_number}"`;
        await promisePool.query(sql);
    },
    deleteSeat : async (data) => {
        //where 조건을 만족하는 행에 대하여 delete
        const sql = `delete from seat_reservation where Seat_number = "${data.Seat_number}"`;
        await promisePool.query(sql);
    },
}
//update query
export const updateSql = {
    updateAirport : async (data) => {
        const sql = `update airport set Name = "${data.Name}" where Airport_code = "${data.Airport_code}"`;
        await promisePool.query(sql);
    },
    updateFlight : async (data) => {
        const sql = `update flight set Airline = "${data.Airline}" where Flight_number = "${data.Flight_number}"`;
        await promisePool.query(sql);
    },
    updateAirplane : async (data) => {
        const sql = `update airplane set Total_number_of_seats = "${data.Total_number_of_seats}" where Airplane_id = "${data.Airplane_id}"`;
        await promisePool.query(sql);
    },
    updateAirplane_type : async (data) => {
        const sql = `update airplane_type set Max_seats = "${data.Max_seats}" where Airplane_type_name = "${data.Airplane_type_name}"`;
        await promisePool.query(sql);
    },
    updateLeg : async (data) => {
        const sql = `update flight_leg set Scheduled_arrival_time = "${data.Scheduled_arrival_time}" where Leg_number = "${data.Leg_number}"`;
        await promisePool.query(sql);
    },
    updateIns: async (data) => {
        const sql = `update leg_instance set Number_of_available_seats = "${data.Number_of_available_seats}" where Leg_number = "${data.Leg_number}"`;
        await promisePool.query(sql);
    },
    updateFare: async (data) => {
        const sql = `update fare set Amount = "${data.Amount}" where Fare_code = "${data.Fare_code}"`;
        await promisePool.query(sql);
    },
}
