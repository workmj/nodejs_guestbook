// 내장모듈
var fs = require('fs');

// 외장모듈
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var ejs = require('ejs');


// mysql_데이터베이스 연결
var client = mysql.createConnection({
	user: 'root',
	password: 'w0o8r1k9mj',
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





app.get('/', function(request, response){ // 모든 데이터 조회
	console.log('=== 모든 데이터 조회 ===');
	fs.readFile('guestbook.html', 'utf8', function(error, data){
		client.query('SELECT * FROM guestbook ORDER BY no DESC', function(error, results){
			// console.log(results);
			response.send(ejs.render(data, {
				data: results,
				srhMod: false
			}));
		});
	});
});

app.get('/delete/:no', function(request, response){
	// console.log(request.params.no);
	client.query('DELETE FROM guestbook WHERE no=?', [ request.params.no ], function(error, results){
		response.redirect('/');
	});
});

app.post('/', function(request, response){
	var body = request.body;
	if( body.modifyMod ){
		console.log('=== 데이터 수정 ===');
		client.query('UPDATE guestbook SET content=? WHERE no=?', [
			body.content, body.no
		], function(error, results){
			response.redirect('/');
		});
	} else if( body.addMod ) {
		console.log('=== 데이터 추가 ===');
		var date = new Date(); // YYYY-MM-DD HH:MM:SS
		var nowDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
		// console.log(body, nowDate);
		client.query('INSERT INTO guestbook (nickname, content, writedate, personacon) VALUES (?, ?, ?, ?)', [
			body.nickname, body.content, nowDate, body.personacon
		], function(error, results){
			response.redirect('/');
		});
	} else if( body.searchMod ){
		console.log('=== 데이터 검색_sort ===');
		if( body.searchTxt ){
			fs.readFile('guestbook.html', 'utf8', function(error, data){
				var queryTxt = 'SELECT * FROM guestbook WHERE '+body.sort+' LIKE "%'+body.searchTxt+'%" ORDER BY no DESC';
				client.query(queryTxt, function(error, results){
					response.send(ejs.render(data, {
						data: results,
						srhMod: true
					}));
				});
			});
		} else { // 검색단어가 없는 경우(=input text가 빈 값인 경우)
			response.redirect('/');
		}
	}
});


