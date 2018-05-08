const express=require('express')
const router=express.Router()
const {db,log,DataBase}=require('../../config.js')

router.get('/',(req,res)=>{
    const DataAIP=new DataBase(db,{table:'userinfo',req,res,renderPath:'admin/userinfo.ejs',}) 
    switch(req.query.act){
       case 'mod':
       DataAIP.select(req.query.id)
       break;
       case 'del':
       DataAIP.delete(req.query.id)
       break;
       default:
       DataAIP.select(req.query.id)
    }
})

router.post('/',(req,res)=>{
    let {wxname,name,address,phone}=req.body
    const DataAIP=new DataBase(db,{table:'userinfo',req,res,renderPath:'admin/userinfo.ejs',})
    if(req.body.mod_id){  //修改数据
     DataAIP.update(req.body.mod_id,{wxname,name,address,phone})
    }else{
     DataAIP.insert({wxname,name,address,phone})   
    } 
})

module.exports=router