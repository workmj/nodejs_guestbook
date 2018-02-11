// 내장모듈
var fs = require('fs');

// 외장모듈
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var ejs = require('ejs');


// mysql_데이터베이스 연결
var client = mysql.createConnection({
	user: 'myblog',
	password: 'gwBhCN9igJIXXmhY',
	database: 'myblog'
});

// 서버 생성
var app = express();
app.use(express.static('./'));
app.use(bodyParser.urlencoded({
	extended: false
}));


// 서버 실행
app.listen(3000, function(){
	console.log('Server Running');
})





app.get('/', function(request, response){
	client.query('SELECT * FROM guestbook', function(error, results){
		response.send(results);
		console.log(results);
	});
});
