const {sql, poolPromise } = require('../config/db.js')

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

async function tracuuthuetncn(req, res){

}

module.exports = {
  tracuuthunhapthang,
  tracuuthuetncn,
  contact
} 