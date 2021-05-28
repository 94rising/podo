router.post('/write', function(req,res,next){
    var content = req.body.content;
    var datas = [content];
 
 
    var sql = "insert into board(content, regdate, modidate,hit) values(?,now(),now(),0)";
    conn.query(sql,datas, function (err, rows) {
        if (err) console.error("err : " + err);
        res.redirect('/diary/list');
    });
});
