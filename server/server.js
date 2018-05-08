const express=require('express')
const cookie=require('cookie-parser')
const session=require('cookie-session')
const ejs=require('ejs')
const multer=require('multer')
const bodyParser=require('body-parser')
const path=require('path')
const https=require('https')
const static=require('express-static')
const exsession=require('express-session')
const server=express()
//https.createServer({},server).listen(3000)
server.listen(3000)

//1.解析get、post请求
server.use(bodyParser.urlencoded({extended:false}))

//2.设置cookie session
server.use(cookie('huangxing'))
let arr=[]
for(let i=0;i<1000;i++){
    arr[i]='huangxing'+Math.random()
}
server.use(session({
    keys:arr,
    name:'session_id',
    maxAge:60*100*20
}))

server.use(exsession({
    secret: 'huangxing',//与cookieParser中的一致
    resave: true,
    saveUninitialized:true
}))

//3.模板引擎配置
server.set('views', path.join(__dirname, 'template'));
server.engine('html', ejs.renderFile);
server.set('view engine', 'html');

//4.路由配置

server.use('/notice',require('./routers/notice'))
server.use('/xiaoqulist',require('./routers/xiaoqulist'))
server.use('/orderinfo',require('./routers/orderinfo'))
server.use('/userinfo',require('./routers/userinfo'))
server.use('/productlist',require('./routers/productlist'))
server.use('/admin',require('./routers/admin/admin'))

//5.配置资源
server.use(static('static'))
