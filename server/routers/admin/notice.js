const express=require('express')
const router=express.Router()
const {db,log,DataBase}=require('../../config.js')

router.get('/',(req,res)=>{
    const DataAIP=new DataBase(db,{table:'notice',req,res,renderPath:'admin/notice.ejs',}) 
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
    let content=req.body.content
    let title=req.body.title
    const DataAIP=new DataBase(db,{table:'notice',req,res,renderPath:'admin/notice.ejs',})
    if(req.body.mod_id){  //修改数据
     DataAIP.update(req.body.mod_id,{title,content})
    }else{
     DataAIP.insert({title,content})   
    } 
})

module.exports=router