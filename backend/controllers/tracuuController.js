const {sql, poolPromise } = require('../config/db.js')
const jwt = require("jsonwebtoken");

async function tracuuthunhapthang(req, res){
  const pool = await poolPromise
  const manv = req.body.manv
  const thangBK = req.body.thangBK
  const namBK = req.body.namBK
  await pool.request()
    .input('MANV',  manv)
    .input('THANGBK', thangBK)
    .input('NAMBK',  namBK)
    .execute(thangBK === 'all' ? 'sp_TraCuuThuNhapThang_All' : 'sp_TraCuuThuNhapThang', (err, result)=>{
      if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({
          result
        });
      });
}
async function tracuuthueTNCN(req, res){
  const pool = await poolPromise
  const manv = req.body.manv
  const namBK = req.body.namBK
  await pool.request()
    .input('MANV',  manv)
    .input('NAMBK',  namBK)
    .execute('sp_TracuuThueTNCN', (err, result)=>{
      if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({
          result
        });
      });
}
async function contact(req, res){
  const pool = await poolPromise
  const manv = req.body.manv
  const tennv = req.body.tennv
  const donvi = req.body.donvi
  const email = req.body.email
  const phone = req.body.phone
  const decription = req.body.decription
  await pool.request()
    .input('MANV',  manv)
    .input('TENNV', tennv)
    .input('DONVI', donvi)
    .input('EMAIL', email)
    .input('PHONE', phone)
    .input('DECRIPTION', decription)
    .execute('sp_contact', (err, result)=>{
      if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({
          result
        });
      });
}

async function getEmployees(req, res){
  try{
    const pool = await poolPromise
    const token = req.body.token
    var manv
    var roles
    jwt.verify(token, 'tracuu', (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      manv = decoded.manv;
      roles = decoded.roles;
    });
    
    if(roles.toLowerCase().trim() === 'user'){
      return res.status(500).send({
        message: 'Không có quyền truy cập!'
      })
    }
    await pool.request()
      .execute('sp_LoadEmployees', (err, result)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(200).send({
            result
          });
        });
    }catch(error){
      res.status(500).send(error.message)
    }
}

module.exports = {
  tracuuthunhapthang,
  tracuuthueTNCN,
  contact,
  getEmployees
} 