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

async function tracuuthuetncn(req, res){

}

module.exports = {
  tracuuthunhapthang,
  tracuuthuetncn
} 