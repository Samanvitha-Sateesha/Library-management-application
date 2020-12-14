const express = require("express");
const router = express.Router();
const mysql = require("mysql");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var db = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
router.use(express.json());
router.get("/", (req,res) =>{
    res.render("login");
});

router.get("/login",(req,res)=>{
    res.render("login");
});

router.get("/register",(req,res)=>{
    res.render("register");
});
router.get('/adminHome',(req,res)=>{
    res.render("adminHome");
});
router.get("/adminLogin",(req,res)=>{
    res.render("adminLogin");
});

// router.get("/index",(req,res)=>{
//     db.query('SELECT * from book', (error,results)=>{
//         if(error) throw error;
//         res.render("index",{books:results});
//     });
// });
router.get("/index",(req,res)=>{
    res.render("index");
});

router.post('/purchase',(req,res)=>{
    var book_id = req.body.book_id;
    console.log(book_id);
    const sql = "INSERT INTO purchase VALUES (?,?);";
    db.query(sql,[req.body.book_id,req.body.id],(error,results)=>{
        if(error)
            throw error;
        console.log("Added successfully"+results);    
    });
});
router.post('/deletebook', function (req, res) {
    console.log(req.body);
    db.query('DELETE FROM book WHERE book_id=?', [req.body.book_id], function (error, results, fields) {
        if (error) throw error;
        res.render('adminHome', {
            message: 'Book Deleted Successfully.'
        });
    });
});

router.post('/book',function(req,res){
    var params  = req.body;
    console.log(params);
    db.query('INSERT INTO book SET ?', params, function (error, results, fields) {
	    if (error) throw error;
	    // res.end(JSON.stringify(results),{
        //     message: 'Details added successfully.'
        // });
        res.render('addbook', {
            message: 'Details added Successfully.'
        });
	});
});
router.post('/author',function(req,res){
    var params  = req.body;
    console.log(params);
    db.query('INSERT INTO author SET ?', params, function (error, results, fields) {
	    if (error) throw error;
	    // res.end(JSON.stringify(results),{
        //     message: 'Details added successfully.'
        // });
        res.render('addbook', {
            message: 'Details added Successfully.'
        });
	});
});
router.post('/auth_book',function(req,res){
    var params  = req.body;
    console.log(params);
    db.query('INSERT INTO auth_book SET ?', params, function (error, results, fields) {
	    if (error) throw error;
	    // res.end(JSON.stringify(results),{
        //     message: 'Details added successfully.'
        // });
        res.render('addbook', {
            message: 'Details added Successfully.'
        });
	});
});

module.exports = router;