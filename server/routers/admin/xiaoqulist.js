const express=require('express')
const router=express.Router()
const {db,log,DataBase}=require('../../config.js')

router.get('/',(req,res)=>{
    const DataAIP=new DataBase(db,{table:'xiaoqulist',req,res,renderPath:'admin/xiaoqulist.ejs',}) 
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
    let name=req.body.name
    const DataAIP=new DataBase(db,{table:'xiaoqulist',req,res,renderPath:'admin/xiaoqulist.ejs',})
    if(req.body.mod_id){  //修改数据
     DataAIP.update(req.body.mod_id,{name})
    }else{
     DataAIP.insert({name})   
    } 
})

module.exports=router