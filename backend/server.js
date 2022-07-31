var express = require('express');
const authRouter = require('./routes/authRouter');

const port = process.env.PORT === 'production' ? (dotenv.PORT || 80) : 3001;
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT || port , (err) => {
    if(err)
  console.log('Unable to start the server!')
  else
  console.log('Server started running on : ' + port)
  })
//user login router in /routes/loginRouter.js
app.use('/user/', authRouter)
