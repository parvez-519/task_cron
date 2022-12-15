
const user=require('./controller/user')
const router = require("express").Router();

//CRUD OPERATIONS USING USER
router.post("/adduser", user.adduser);
// router.delete("/deleteuser", user.deleteuser);


module.exports=router