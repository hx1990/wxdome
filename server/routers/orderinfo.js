const express=require('express')
const router=express.Router()
const {db,log,DataBase}=require('../config.js')
router.get('/',(req,res)=>{
    db.query(`SELECT * FROM orderinfo`,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.send(data).end()
        }
    })
})

router.post('/',(req,res)=>{
    
    let {ptitle,psrc,stepper,user,phone,address,posttime,sendtime,price}=req.body
    const DataAIP=new DataBase(db,{table:'orderinfo',req,res,})
    DataAIP.insert({ptitle,psrc,stepper,user,phone,address,posttime,sendtime,price})  
})

module.exports=router