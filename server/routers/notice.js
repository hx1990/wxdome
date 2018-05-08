const express=require('express')
const router=express.Router()
const {db}=require('../config.js')
router.use('/',(req,res)=>{
    db.query(`SELECT * FROM notice`,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.send(data).end()
        }
    })
})
module.exports=router