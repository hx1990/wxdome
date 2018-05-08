const express=require('express')
const router=express.Router()
const {db,log,DataBase}=require('../config.js')
router.get('/',(req,res)=>{
    db.query(`SELECT * FROM userinfo`,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.send(data).end()
        }
    })
})

router.post('/',(req,res)=>{
    let wxname=req.body.wxname
    let name=req.body.name
    let address=req.body.address
    let phone=req.body.phone
    log(req,req.body)
    const DataAIP=new DataBase(db,{table:'userinfo',req,res,})
    DataAIP.insert({wxname,name,address,phone})  
})

module.exports=router