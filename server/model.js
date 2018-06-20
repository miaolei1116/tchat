const mongoose = require("mongoose");
// 链接mongo
const DB_URL = 'mongodb://localhost:27017/tchat'	
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
	console.log('mongo connect')
})

const models = {
    user:{
        "user":{type:String, require:true},
        "pwd":{type:String, require:true},
        "type":{type:String, require:true},

        // 头像
        "headerpic":{type:String},
        // 个人/职位简介
        "desc":{type:String},
        // 职位名
        "title":{type:String},


        // BOSS 独有字段
        "company":{type:String},
        "money":{type:String}
    },
    chat:{

    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }

}