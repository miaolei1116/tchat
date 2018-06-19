const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = { 'pwd':0 }


Router.get('/list',function(req, res){
    const { type } = req.query
    // User.remove({},function(e,d){})
    User.find({type}, function(err, doc){
        return res.json({code:0, data:doc})
    })
})

Router.post('/update', function(req,res){
    const userid = req.cookies.userid
    if ( !userid ) {
        return json.dumps({code:1})
    }
    const body = req.body
    // console.log(body)
    User.findByIdAndUpdate(userid, body, function(err,doc) {
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        // console.log(data)
        return res.json({code:0, data})
    })
})

Router.post('/login',function(req, res){
    const {user, pwd} = req.body
    User.findOne({user, pwd:md5Pwd(pwd)},_filter, function(err, doc){
        if ( !doc ) {
            return res.json({code:1, msg:"用户名或者密码错误"})
        }
        res.cookie('userid', doc._id)
        // console.log(doc)
        return res.json({code:0,data:doc})
    })
})

Router.post('/register', function(req, res){
    console.log(req.body)
    const {user, type, pwd} = req.body
    User.findOne({user}, function(err, doc){
        if(doc) {
            return res.json({code:1, msg:"用户名已经存在"})
        }

        const userModel = new User({user,pwd:md5Pwd(pwd),type})
        userModel.save(function(e, d){
            if(e) {
                return res.json({code:1, msg:'后端上厕所去了，稍等一会'})
            }
            const {user, type, _id} = d
            res.cookie('userid', _id)
            return res.json({code:0, data: {user, type, _id}})
        })

        // User.create(function(e, d){
        //     if(e) {
        //         return res.json({code:1, msg:"服务器开小差了"})
        //     }
        //     return res.json({code:0})
        // })
    })
})

Router.get('/info',function(req, res){
    // 检查用户的cookie
    const {userid} = req.cookies
    if ( !userid ) {
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter, function(err, doc){
        if (err) {
            return res.json({code:1, msg:"服务器出差了"})
        }
        if (doc) {
            return res.json({code:0, data:doc})
        }
    })
})
function md5Pwd(pwd) {
    const salt = 'wieurotiutiooozcvbdfbergwe41515fqwqwfqsadcefq#$@sdfavwergqwfwrgqwddq';
    return utils.md5(pwd + salt)
}

// User.remove({},function(){})


module.exports = Router