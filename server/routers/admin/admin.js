const {log}=require('../../config.js')
const express=require('express')
const router=express.Router()

router.use((req,res,next)=>{
    log(req.session.aaa)
   if(!req.session['session_id']&&req.url!='/login'){//用户没有登录且不是登录页面
        res.redirect('/admin/login')
   }else{
       next() 
   }
})

router.get('/',(req,res)=>{
    res.render('admin/index.ejs',{})
})

router.use('/login',require('./login'))
router.use('/notice',require('./notice'))
router.use('/productlist',require('./productlist'))
router.use('/userinfo',require('./userinfo'))
router.use('/xiaoqulist',require('./xiaoqulist'))
router.use('/orderinfo',require('./orderinfo'))
module.exports=router
