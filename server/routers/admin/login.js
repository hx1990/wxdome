const express=require('express')
const router=express.Router()
const {db,log}=require('../../config.js')
const Com=require('../../common')

router.get('/',(req,res)=>{ //get请求渲染到用户登录模板
    res.render('admin/login.ejs',{})
})

router.post('/',(req,res)=>{ //提交用户登录信息
    const username=req.body.username;   
    const password=Com.md5(req.body.password+Com.MD5_SUFFIX);
    db.query(`SELECT * FROM admin WHERE user='${username}'`,(err,data)=>{
        if(err){ //访问数据库出错
            log(err)
            res.send({OK:fasle,msg:'database errr'}).end()
        }else{
            if(data.length==0){ //管理员不存在
              res.send({OK:fasle,msg:'not find user'}).end()  
            }else{
                if(data[0].password==password){//登陆成功
                     req.session['session_id']=data[0].ID
                     req.session.aaa=99
                     //res.render('admin/index.ejs',{})
                    res.redirect('/admin')
                }else{//密码错误
                     res.send({OK:false,msg:'password error'}).end()  
                }
            }
        }
    })
})
module.exports=router