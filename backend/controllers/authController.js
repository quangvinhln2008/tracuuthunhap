const {sql, poolPromise } = require('../config/db.js')
const helper = require('../ultility/helper');
const jwt = require("jsonwebtoken");

async function signin(req, res) {
  try{
    const email = req.body.email
    const password = req.body.password
    const pool = await poolPromise
    await pool.request()
    .input('EMAIL', sql.VarChar, email)
    .query('SELECT * FROM MEMBER WHERE ID = @EMAIL', (err, user)=>{
      if (err) {
          res.status(500).send({ message: err });
          return;
        }
      if (user.recordset.length===0) {
      
          return res.status(404).send({ message: "Tên đăng nhập không đúng." });
        }
      var passwordIsValid = user?.recordset[0]?.PASSWORD === helper.hashPassword(req.body.password) ? true : false;

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mật khẩu không đúng!"
        });
      }
      // res.status(200).send(user)
      if(user.recordset.length!==0){
        var token = jwt.sign({ email: user?.recordset[0]?.EMAIL, manv: user?.recordset[0]?.MEMBERID}, 'tracuu', {
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
  }catch(error){
    res.status(500).send(error.message)
  }
};

  async function profile(req, res){
    const pool = await poolPromise
    const token = req.body.token
    var manv
    jwt.verify(token, 'tracuu', (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      manv = decoded.manv;
    });

    await pool.request()
      .input('MANV',  manv)
      .execute('sp_LoadProfile', (err, result)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(200).send({
            result
          });
        });
  }
  async function changePassword(req, res){
    const pool = await poolPromise
    const token = req.body.token
    const newPassword = req.body.newPassword

    var manv
    jwt.verify(token, 'tracuu', (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      manv = decoded.manv;
    });

    await pool.request()
      .input('MANV',  manv)
      .input('NEWPASSWORD',  helper.hashPassword(newPassword))
      .execute('sp_ChangePassword', (err, result)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(200).send({
            result
          });
        });
  }

  async function changeEmail(req, res){
    const pool = await poolPromise
    const token = req.body.token
    const emailNew = req.body.emailNew

    var manv
    jwt.verify(token, 'tracuu', (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      manv = decoded.manv;
    });

    await pool.request()
      .input('MANV',  manv)
      .input('NEWEMAIL',  emailNew)
      .execute('sp_ChangeEmail', (err, result)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(200).send({
            result
          });
        });
  }
  async function changeId(req, res){
    const pool = await poolPromise
    const token = req.body.token
    const idNew = req.body.idNew

    var manv
    jwt.verify(token, 'tracuu', (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      manv = decoded.manv;
    });

    await pool.request()
      .input('MANV',  manv)
      .input('NEWID',  idNew)
      .execute('sp_ChangeId', (err, result)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(200).send({
            result
          });
        });
  }

  async function changePhone(req, res){
    const pool = await poolPromise
    const token = req.body.token
    const phoneNew = req.body.phoneNew

    var manv
    jwt.verify(token, 'tracuu', (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      manv = decoded.manv;
    });

    await pool.request()
      .input('MANV',  manv)
      .input('NEWPHONE',  phoneNew)
      .execute('sp_ChangePhone', (err, result)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(200).send({
            result
          });
        });
  }
  function getFilePdf (req, res) {
    try {
        res.contentType("application/pdf");
        res.sendFile(path.join(__dirname + `HDSD.pdf`))

    } catch (error) {
      ErrorHandler(res, 500, error.message)
    }
  }

  module.exports = {
    signin,
    profile,
    changePassword,
    changeEmail,
    changePhone,
    changeId,
    getFilePdf
  }