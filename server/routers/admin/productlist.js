const express=require('express')
const router=express.Router()
const {db,log,DataBase}=require('../../config.js')
const multer=require('multer')
const multerObj=multer({dest:'./static/pic'})
router.use(multerObj.any())
const fs=require('fs')
const path=require('path')

router.get('/',(req,res)=>{
    const DataAIP=new DataBase(db,{table:'productlist',req,res,renderPath:'admin/productlist.ejs',}) 
    switch(req.query.act){
       case 'mod':
       DataAIP.select(req.query.id)
       break;
       case 'del':
       //删除图片资源
       db.query(`SELECT * FROM productlist WHERE ID=${req.query.id}`,(err,data)=>{
           if(err){
               log(err)
               res.status(500).send('database err').end()
           }else{
                fs.unlink('static/pic/'+path.parse(data[0].src).base,(err)=>{ 
                    if(err){
                        console.error(err)
                        res.status(500).send('file opration err').end()
                    }else{
                        DataAIP.delete(req.query.id)
                    }
                })
           }
       })
       break;
       default:
       DataAIP.select(req.query.id)
    }
})

router.post('/',(req,res)=>{
    let {name,type,price,src,sales,details,evaluate,specification}=req.body
    if(req.files){
        var ext=path.parse(req.files[0].originalname).ext;
        var oldpath=req.files[0].path
        var newpath=req.files[0].path+ext
        var newFileName=req.files[0].filename+ext;
    }else{
        var newFileName=null
    }
    const DataAIP=new DataBase(db,{table:'productlist',req,res,renderPath:'admin/productlist.ejs',})
    if(req.body.mod_id){  //修改数据
        if(newFileName){  //上传文件
            fs.rename(oldpath,newpath,(err)=>{   //修改上传的文件名后缀
               if(err){
                   console.error(err)
                   res.status(400).send('flie opration err').end()
               }else{
                   //删除之前文件
                   db.query(`SELECT * FROM productlist WHERE ID=${req.body.mod_id}`,(err,data)=>{
                    if(err){
                        log(err)
                        res.status(500).send('database err').end()
                    }else{
                        log(data[0])
                        fs.unlink('static/pic/'+path.parse(data[0].src).base,(err)=>{
                            if(err){
                                console.error(err)
                                res.status(500).send('file opration err').end()
                            }else{
                                DataAIP.update(req.body.mod_id,{name,type,price,src:`/pic/${newFileName}`,sales,details,evaluate,specification})
                            }
                        })
                    }
                })
                    
               }
            })
        }else{ //不上传文件直接修改
            DataAIP.update(req.body.mod_id,{name,type,price,src,sales,details,evaluate,specification})
        }
    }else{ //添加数据
        fs.rename(oldpath,newpath,(err)=>{   //修改上传的文件名后缀
            if(err){
                console.error(err)
                res.status(400).send('flie opration err').end()
            }else{
                DataAIP.insert({name,type,price,src:`/pic/${newFileName}`,sales,details,evaluate,specification})
            }
          
        }) 
    } 
})

module.exports=router