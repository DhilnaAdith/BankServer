//import jsonwebtoken
const jwt = require("jsonwebtoken")
//import db
const db = require('./db')
    // data base
    userDetails = {
    1000:{acno:1000,username:'neeer',password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,username:'beeer',password:1001,balance:6000,transaction:[]},
    1002:{acno:1002,username:'seeer',password:1002,balance:4000,transaction:[]}
     }

   //Register
      const register = (acno, password, username)=> {
        //asynchronus
       return db.User.findOne({acno})
       .then(user=>{
        if(user){
          return {
       statusCode:401,
        status:false,
        message:'User already exist ...please login'
      }
    }
    else{
      const newUser = new db.User({
        acno,
        username,
        password,
        balance:0,
        transaction: []
         })
         newUser.save()
         return {
          statusCode:200,
          status:true,
          message:"successfully register"
         
        }
        }
       })
      }
        // login()
       const login = (acno, pswd)=> {
       //asynchonous
       return db.User.findOne({
        acno,
        password:pswd
      })
      .then(user=>{
        if(user){
          currentUsername = user.username
           currentAcno = acno
        //token generation using jwt
           const token = jwt.sign({
            currentAcno : acno
           },"supersecretkey12345")

           return {
            statusCode:200,
            status:true,
            message:" Login Successfully",
             currentUsername,
             currentAcno,
             token
        }
      }
      else{
        return {
          statusCode:401,
          status:false,
          message:" Incorrect acno/ password "
          }
      }
    })
  }
        //deposit
  const deposit = (acno,pswd,amt)=>{
  var amount = parseInt(amt)
  //asynchronous
  return db.User.findOne({
    acno,
    password:pswd
  })
  .then(user=>{
    if(user){
      user.balance += amount
      user['transaction'].push({
        type: 'CREDIT',
        amount
      }) 
      user.save( )
      return {
        statusCode:200,
        status:true,
        message:`${amount} credited. new balance is ${ user.balance}`
        }
      }
      else {
 return { 
  statusCode:401,
  status:false,
  message:'Incorrect password or Account  Number'
  }
}
  })
  

}
//withdraw
 const withdraw = (acno, pswd, amt)=>{
  var amount = parseInt(amt)
  //asynchronous
  return db.User.findOne({
    acno,
    password:pswd
  })
  .then(user=>{
    if(user){
      if(user.balance>amount){
      user.balance -= amount
      user['transaction'].push({
        type: 'DEBIT',
        amount
      }) 
      user.save()
      return {
        statusCode:200,
        status:true,
        message:`${amount} debited. new balance is ${ user.balance}`
        }
      }
        else {
          return { 
           statusCode:401,
           status:false,
           message:'Insufficient balance'
           }
      }}
      else {
 return  { 
  statusCode:401,
  status:false,
  message:'Incorrect password or Account  Number'
  }
} 
 })
}
 
 //transaction
 const getTransaction =(acno)=> {
  return db.User.findOne({acno})
  .then(user =>{
    if(user){
 return { 
  statusCode: 200,
  status: true,
  transaction: user["transaction"]

 }
}
else{
  return { 
    statusCode:401,
    status:false,
   message:"incorrect account number"
  }}
  })
 }
 //onDelete
 const onDelete = (acno)=>{
  return db.User.deleteOne({acno})
  .then(result=>{
    if(result){
      return {
        statusCode:200,
        status:true,
        message:'Deleted successfully'
      }}
      else{
        return {
        statusCode:401,
        status:false,
        message:'incorrect account number'
        }}
      })}

     //to export
     module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    onDelete
  }
       
 
