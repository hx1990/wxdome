const express=require('express')
const router=express.Router()
const {db,log,DataBase}=require('../../config.js')

router.get('/',(req,res)=>{
    const DataAIP=new DataBase(db,{table:'orderinfo',req,res,renderPath:'admin/orderinfo.ejs',}) 
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
    let {ptitle,psrc,stepper,user,phone,address,posttime,sendtime,price}=req.body
    const DataAIP=new DataBase(db,{table:'orderinfo',req,res,renderPath:'admin/orderinfo.ejs',})
    if(req.body.mod_id){  //修改数据
     DataAIP.update(req.body.mod_id,{ptitle,psrc,stepper,user,phone,address,posttime,sendtime,price})
    }else{
     DataAIP.insert({ptitle,psrc,stepper,user,phone,address,posttime,sendtime,price})   
    } 
})

module.exports=router