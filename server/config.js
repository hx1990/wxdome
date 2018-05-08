const mysql=require('mysql')
const db=mysql.createPool({ //数据库配置
    host:'localhost',
    user:'root',
    password:'huang5201314',
    database:'yizhengyilong',
    port:3306,
    timezone:"08:00",
})
class DataBase{
    constructor(db,option){
        this.db=db
        this.option=option
        this.log=console.log.bind(console)
        this.data=null
    }
    select(id){
        let sel
        if(id){
          sel=`SELECT * FROM ${this.option.table} WHERE ID=${id}`
          this.db.query(sel,(err,data)=>{
             if(err){
                 this.log(err)
                 this.option.res.send(err).end()
             }else if(data.length==0){
                 this.option.res.send('data not found')
             }else{
                 this.data=data
                 this.select()
                 return data
             }
          }) 
        }else{
          sel=`SELECT * FROM ${this.option.table}`
          this.db.query(sel,(err,data1)=>{
             if(err){
                 this.log(err)
                 this.option.res.send('database err').end()
             }else{
                 if(this.data){
                     this.option.res.render(this.option.renderPath,{data1,mod_data:this.data[0]})
                 }else{
                     this.option.res.render(this.option.renderPath,{data1})
                 }
             }   
          })
        }
    }
    delete(id){
        this.db.query(`DELETE FROM ${this.option.table} WHERE ID=${id}`,(err,data)=>{
            if(err){
                log(err)
                this.option.res.send('database err').end()
            }else{
                this.option.res.redirect(this.option.table)
            }
        })
    }
    update(id,option){
         let str=''
         for(let item in option){
             if(typeof option[item]==Number){
                str+=`${item}=${option[item]}, `
             }else{
                str+=`${item}="${option[item]}", `
             }
         }
         str=str.trim().slice(0,-1)
         this.db.query(`UPDATE ${this.option.table} SET ${str} WHERE ID=${id}`,(err)=>{
             if(err){
                 this.log(err)
                 this.option.res.send('database err').end()
             }else{
                 this.option.res.redirect(this.option.table)
             }
         })
    }
    insert(option){
         let key=''
         let value=''
         for(let item in option){
             key+=`${item},`
             if(typeof value==Number){
                value+=`${option[item]},`
             }else{
                value+=`"${option[item]}",`
             } 
         }
         key=key.slice(0,-1)
         value=value.slice(0,-1)
         db.query(`INSERT INTO ${this.option.table} (${key}) VALUES(${value})`,(err,data)=>{
             if(err){
                 this.log(err)
                 this.option.res.send(err).end()
             }else{
                 this.option.res.redirect(this.option.table)
             }
         }) 
    }
}
module.exports={
    db,
    DataBase,
    log:console.log.bind(console)
}