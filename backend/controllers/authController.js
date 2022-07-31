const {sql, poolPromise } = require('../config/db.js')
const helper = require('../ultility/helper');
const jwt = require("jsonwebtoken");

async function signin(req, res) {
    const email = req.body.email
    const pool = await poolPromise
    await pool.request()
    .input('EMAIL', sql.VarChar, email)
    .query('SELECT * FROM MEMBER WHERE EMAIL = @EMAIL', (err, user)=>{
      if (err) {
          res.status(500).send({ message: err });
          return;
        }
      if (user.recordset.length===0) {
      
          return res.status(404).send({ message: "Tên đăng nhập không đúng." });
        }
        var passwordIsValid = helper.hashPassword(req.body.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mật khẩu không đúng!"
        });
      }

      if(user.recordset.length!==0){
        var token = jwt.sign({ id: user.email }, process.env.SECRET_KEY, {
          expiresIn: 86400 // 24 hours
        });
  
        res.status(200).send({
          id: user.recordset[0]?.MEMBERID,
          userName: user.recordset[0]?.MEMBERNAME,
          email: user.recordset[0]?.EMAIL,
          roles: user.recordset[0]?.ROLE.trim(),
          accessToken: token
        });
      }
    })
  };

  module.exports = {signin}