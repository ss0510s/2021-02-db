/*데이터 베이스와 관련된 기능 구현 */
import mysql from "mysql2";

const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root', // 본인의 mysql user id
    database: 'week10', // 데이터베이스 이름
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
    getUsers : async () => {
        //쿼리에 select 명령문 실행한 결과를 변수에 저장
        const [rows] = await promisePool.query(`select * from user`);

        return rows;
    },
    //department select
    getDeparment : async () => {
        //select문을 실행한 결과를 변수에 저장 후 반환
        const [rows] = await promisePool.query(`select * from department`);
        return rows;
    },
    //univ select
    getUniv : async () => {
        //select문을 실행한 결과를 변수에 저장 후 반환
        const [rows] = await promisePool.query(`select * from univ`);
        return rows;
    },
}

export const deleteSql = {
    /*deleteDepartment : async (data) => {
        //where 조건을 만족하는 행에 대하여 delete
        console.log('deleteSql.deleteDepartment: ',data.Dnumber);
        const sql = `delete from department where Dnumber = ${data.Dnumber}`;
        await promisePool.query(sql);
    },*/
    deleteUniv : async (data) => {
        //where 조건을 만족하는 행에 대하여 delete
        console.log('deleteSql.deleteUniv: ',data.Univ_num);
        const sql = `delete from univ where univ_num = ${data.Univ_num}`;
        await promisePool.query(sql);
    },
}