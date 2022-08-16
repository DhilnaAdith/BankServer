//server creation
//1. import express
const express= require('express') 
//Import jsonwebtoken
const jwt = require("jsonwebtoken")

const dataService = require('./service/data.service') 

//2.create server app
const app = express()
//to parse JSON
app.use(express.json())
//Application specific middleware
const appMiddleware = (req,res,next)=>{
    
    next()
}
app.use(appMiddleware)
//router specific middleware - token validation
const jwtMiddleware = (req,res,next)=>{
  try { console.log('Router specific Middleware');
  const token = req.headers['x-access-token']
  const data = jwt.verify(token,"supersecretkey12345")
  console.log(data);
  next()
}
  catch {
    res.status(422).json({
      statusCode:422,
      status:false,
      message:'Please Log In'
    })
  }
}

3.//http request resolving
//bank app request resolving
//register api
app.post('/register',(req,res)=>{
    console.log(req.body);
    const result=dataService.register(req.body.acno,req.body.password,req.body.username)
   res.status(result.statusCode).json(result)
})
//login api
app.post('/login',(req,res)=>{
    console.log(req.body);
    const result=dataService.login(req.body.acno,req.body.pswd)
   res.status(result.statusCode).json(result)
})
//deposit api
 app.post('/deposit',jwtMiddleware,(req,res )=>{
    console.log(req.body);
    const result=dataService.deposit(req.body.acno,req.body.pswd,req.body.amt)
   res.status(result.statusCode).json(result)
})
//withdraw api
 app.post('/withdraw',(req,res)=>{
   console.log(req.body);
   const result=dataService.withdraw(req.body.acno,req.body.pswd,req.body.amt)
  res.status(result.statusCode).json(result)
})
//transaction api
app.post('/transaction',(req,res )=>{
   console.log(req.body);
   const result=dataService.deposit(req.body.acno)
  res.status(result.statusCode).json(result)})

//4.set up port number

app.listen(3000,()=>{
    console.log('serve stared at port 3000');
})

