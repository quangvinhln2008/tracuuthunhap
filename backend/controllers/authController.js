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
      if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = helper.hashPassword(req.body.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.email }, process.env.SECRET_KEY, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user?.roles?.length; i++) {
        authorities.push("ROLE_" + user.roles[i].roleName.toUpperCase());
      }

      res.status(200).send({
        id: user._id,
        userName: user.MEMBERNAME,
        email: user.EMAIL,
        roles: authorities,
        accessToken: token
      });
    })
  };

  module.exports = {signin}