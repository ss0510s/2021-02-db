/*데이터 베이스와 관련된 기능 구현 */
import mysql from "mysql2";

const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root', // 본인의 mysql user id
    database: 'week8', // 데이터베이스 이름
    password: 'n20562401n!', // password
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

// async / await 사용
const promisePool = pool.promise();

//select query
export const selectSql = {
    //employee select
    getEmployee : async () => {
        //쿼리에 select 명령문 실행한 결과를 변수에 저장
        const [rows] = await promisePool.query(`select * from employee`);
        console.log(rows);
        return rows;
    },
    //department select
    getDeparment : async () => {
        //select문을 실행한 결과를 변수에 저장 후 반환
        const [rows] = await promisePool.query(`select * from department`);
        return rows;
    },
}

//insert query
export const insertSql = {
    // data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query문 생성
    setEmployee : async (data) => {
        //sql에 insert문 저장
        const sql = `insert into employee values (
            "${data.Fname}", "${data.Minit}", "${data.Lname}", "${data.Ssn}", "${data.Bdate}",
            "${data.Address}", "${data.Sex}", "${data.Salary}", "${data.Super_ssn}", "${data.Dno}" )`;
        //query문 생성
            await promisePool.query(sql);
    },
    setDepartment : async (data) => {
        //sql에 insert문 저장
        const sql = `insert into department values (
            "${data.Dname}", "${data.Dnumber}", "${data.Mgr_ssn}", "${data.Mgr_start_date}")`;

            //query문 생성
            await promisePool.query(sql);
    }
}

//update query
export const updateSql = {
    updateEmployee : async (data) => {
        //where 조건을 만족하는 행에 대하여 salary 수정
        const sql = `update employee set Salary = "${data.Salary}" where Ssn = "${data.Ssn}"`;
        await promisePool.query(sql);
    },
    updateDepartment : async (data) => {
        const sql = `update department set Dname = "${data.Dname}" where Dnumber = "${data.Dnumber}"`;
        await promisePool.query(sql);
    }
}