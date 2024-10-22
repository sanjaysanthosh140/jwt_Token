const { ObjectId } = require('mongodb')
const db = require('../config/config.js')
const bcript  = require('bcrypt')
module.exports ={
    adduser: (userdata)=>{
        return new Promise(async(resolve,reject)=>{
            try {
           
            let  userIn  = await db.get().collection('users').findOne({ email : userdata.email })
                if(!userIn){
                    const salt = await bcript.genSalt()
                    userdata.password = await bcript.hash(userdata.password,salt)
                 await db.get().collection('users').insertOne(userdata).then((data)=>{
                     if(!data){
                         console.log('data is not inserted properly')
                         

                     }else{
                        resolve(data.insertedId)
                        console.log(data)
                        console.log('inserted')
                     }
                })
             }else{
                console.log('user already exist')
             }
             } catch (error) {
                        reject(error)
             }
     })
    },

    loguser : (userdata)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                let data = await db.get().collection('users').findOne({email : userdata.email})
                if(data){
                    var matchPassword = await bcript.compare(userdata.password , data.password)
                }
                if(matchPassword){
                       resolve(data)
                }else{
                    console.log('password is not matched')
                }
            } catch (error) {
                console.log(error)
                reject(error)
            }
        })
    }
}