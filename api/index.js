const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User  = require('./models/User.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config()


const bcryptSalt = bcrypt.genSaltSync(10);//10 is the cost
//creating secret key
const jwtSecret = 'dsfjei3430493fejrij';

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }));

// const corsOptions = {
//   credentials: true,
//   ///..other options
// };

// app.use(cors(corsOptions));


//define route(way) for handling GET request
app.get('/test',(req,res)=>{
    res.json("test ok")
})

//if consoled it means server(express) is connected to database(mongodb)
// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);
//passwrd- nUXk6x5SCb7Ga2Pp

// Middleware to parse JSON requests
app.use(express.json()); 
//middleware to parse url-encode request
app.use(express.urlencoded({ extended: true }));


//define route(way) for handling POST request
app.post('/register',async (req,res) => {
    console.log("the body is :",req.body);
    const{name,email,password} = req.body;
    const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password,bcryptSalt),
    });
    res.json(userDoc);
    // res.json('succesfully received data');
});

//define route(way) for handling POST request
app.post('/login', async (req, res) => {
    // console.log('server');
    const { email, password } = req.body;
    // console.log(req);
    //finding document from database of this <email> and storing in userDoc 
    const userDoc = await User.findOne({email});
    // console.log('the userdoc is',userDoc);

    if(userDoc){
      //compare login password with database stored password
      const passOk = bcrypt.compareSync(password,userDoc.password);
      // passOk is bool console.log(passOk);

      if(passOk){
        
        //signing jwt for digital signature
        jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret,{},(err,token) => {
          // console.log('helo');
          // console.log( 'the token is :',token,'>>>>>>');
          if(err) throw err;
          //setting cookie in response (<nameoftoken>,<tokenvalue>,<objectspecifyingaboutcookie>)
          res.cookie('token',token,{httpOnly:true,maxAge:1000000}).json(userDoc);
          // console.log(token);
        // console.log('the cookie is : ',cookiesres);
        })
      }else {
        res.status(422).json('pass not ok');
      }
    }
    else {
      res.json('password not found');
    }
  });

  //define route(way) for handling GET request
  app.get('/profile',(req,res) => {
    // res.json('user info');
    // console.log(req.cookies);
    // console.log(req);

    //destructuring(extracting) token from req.cookies
    const {token} = req.cookies;
    if(token){
      jwt.verify(token,jwtSecret,{},async(err,userData) =>{
        if(err) throw err;
       const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
      });
    }else {
      res.json(null);
    }
  });
  


app.listen(4000);
console.log(`the server is running on port ${4000}`);
