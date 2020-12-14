var express = require("express");
const path = require("path");
var mysql = require("mysql");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
var app = express();
dotenv.config({path : './.env'});
// Create Connection
var db = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
// Connect
db.connect(function(err,result){
    if(err){
        throw err;
    }
    console.log("MySQL connected!");
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(cookieParser());
app.set('view engine','ejs');
// CREATE DB
// app.get('/createdb',function(req,res){
//     let sql = 'CREATE DATABASE nodemysql';
//     db.query(sql,function(err,result){
//         if(err){
//             console.log(err);
//         }           
//         console.log(result);
//         res.send('Database Created');   
//     });
// });

// CREATE Tables

// app.get('/createpoststable',function(req,res){
//     let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title varchar(255),body varchar(255), PRIMARY KEY (id))';
//     db.query(sql,function(err,result){
//         if(err){
//             throw err;
//         }
//         console.log(result);
//         res.send('Posts Table Created');
//     });
// });

// Define Routes

app.use('/', require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

// CREATE POST 1
app.get('/addpost1',function(req,res){
    let post = {title: 'Post 1',body: 'This is post numner 1'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, function(err,result){
        if(err)
            throw err;
        console.log("Inserted");
        res.send("Post 1 added");    
    });
});

// CREATE POST 2
app.get('/addpost2',function(req,res){
    let post = {title: 'Post 2',body: 'This is post numner 2'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, function(err,result){
        if(err)
            throw err;
        console.log(result);
        res.send("Post 2 added");    
    });
});

// Select Posts
app.get('/getposts',function(req,res){
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql,function(err,results){
        if(err)
            throw err;
        console.log(results);
        res.send("Posts Fetched");
    });
});


// Select Single Post
app.get('/getpost/:id',function(req,res){
    let sql = `SELECT * FROM posts where id = ${req.params.id}`;
    let query = db.query(sql,function(err,result){
        if(err)
            throw err;
        console.log(result);
        res.send("Post Fetched");
    });
});

// Update Single Post
app.get('/updatepost/:id',function(req,res){
    let newTitle = 'Updated Title Again';
    let sql = `UPDATE posts SET title = '${newTitle}' where id = ${req.params.id}`;
    let query = db.query(sql,function(err,result){
        if(err)
            throw err;
        console.log(result);
        res.send("Post updated");
    });
});

// DELETE POST
app.get('/deletepost/:id',function(req,res){
    let sql = `DELETE FROM posts where id = ${req.params.id}`;
    let query = db.query(sql,function(err,result){
        if(err)
            throw err;
        console.log(result);
        res.send("Post deleted");
    });
});

app.listen(3000, function(){
    console.log("Server running");
});


