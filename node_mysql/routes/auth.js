const express = require("express");
const authController = require('../controllers/auth');
const router = express.Router();
const mysql = require("mysql");
var methodOverride = require("method-override")
var db = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


router.post('/register', authController.register);
router.get('/login',(req,res)=>{
    res.render('login');
})
router.post('/login',authController.login);
router.post('/adminLogin',authController.adminLogin);
router.get('/logout',authController.logout);
router.get('/addbook',(req,res)=>{
    res.render('addbook');
})

 
module.exports = router;