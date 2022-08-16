//Import jsonwebtoken
const jwt = require("jsonwebtoken")

//database
userDetails:any = {
  1000:{acno:1000,username:'neeer',password:1000,balance:5000,transaction:[]},
  1001:{acno:1001,username:'beeer',password:1001,balance:6000,transaction:[]},
  1002:{acno:1002,username:'seeer',password:1002,balance:4000,transaction:[]}

}
   //Register
 const register=(acno,password,username)=>{
   
    if(acno in userDetails){
      return {
        statusCode:401,
        status:false,
        message:'user already exist.. please log In'
      }
    }
    else {
      userDetails[acno]={
        acno, // default aayituacno nu paranja key lu acno nu parena variable nakathula value varum 
        username,
        password,
        balance:0,
        transaction:[]
      }
      console.log(userDetails);
       return{
       
        statusCode:200,
        status: true,
        message:"Successfully register"
       }
    }}

    // login()
    const login = (acno,pswd)=>{
      if(acno in userDetails)
     {
      if(pswd == userDetails[acno]['password'])
      {
        currentUsername = userDetails[acno]['username']
        currentAcno=acno
       //token generation using jwt
       const token = jwt.sign({
        currentAcno:acno
       },"supersecretkey12345")

        return {
        statusCode:200,
        status: true,
        message:"Login Successfully",
        currentUsername,
        currentAcno,
        token
      }}
     else{
      return{
      statusCode:401,
      status: false,
      message:'Incorrect password'
}
  }
}
else{
  return{
  statusCode:401,
  status: false,
  message:'user doesnot exist'
  }
}
}
//deposit
 const deposit=(acno, pswd, amt)=> {
 var amount = parseInt(amt)
  if(acno in userDetails)
  {
if(pswd==userDetails[acno]['password'])
{
  userDetails[acno]['balance']+= amount
  userDetails[acno]['transaction'].push({
    type:'CREDIT',
    amount 
   })
  console.log(userDetails);
return {
  statusCode:200,
    status: true,
    message: `${amount} credited.New Balance is ${ userDetails[acno]['balance']}`
} 
}
  else{
  return {
    statusCode:401,
    status: false,
    message: 'Incorrect password'
}}
 }
  else{
    return {
      statusCode:401,
      status: false,
      message: 'User doesnot exist'

  }
}}
//withdraw
const withdraw = (acno,pswd,amt)=>
{
  var amount = parseInt(amt)
  if(acno in userDetails){
if(pswd==userDetails[acno]['password']){

if(userDetails[acno]['balance'] > amount){
   userDetails[acno]['balance'] -= amount
     userDetails[acno]['transaction'].push({
      type:'DEBIT',
      amount
    })
    console.log(userDetails); 
  return  {
    statusCode:200,
    status: true,
    message:`${amount} debited. New Balance is ${ userDetails[acno]['balance']}`
  }
}
else{
  return { 
    statusCode:401,
    status: false,
    message:'insufficeient balance'
  }
  }
}
else{
return{
  statusCode:401,
  status: false,
  message:'incorrect password'
}}}
else{
return {
  statusCode:401,
  status: false,
  message:'user doesnot exist'
}
}
}
//transaction
const getTransaction =(acno)=> {
  return {
    statusCode:200,
  status: true,
  transaction:userDetails[acno]['transaction']
}
}
    //to export
    module.exports={
        register,
        login,deposit,withdraw,
        getTransaction
    }