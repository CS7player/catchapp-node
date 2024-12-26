const routes = require('express').Router()

const user = require('./user')
const friends = require('./friendslist')
const chat = require('./chat')

routes.use('/user', user)
routes.use('/friends',friends)
routes.use('/chat',chat)


routes.get('/healthCheck', (req, res) => {
 res.status(200).json({ data: "working" });
});


routes.get('/',(req,res)=>{
    res.status(200).json({status:true,msg:"working Fine!!"})
})


module.exports = routes