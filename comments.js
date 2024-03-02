// Create Web Server
var http = require('http');
var url = require('url');
var fs = require('fs');
var comments = [];
http.createServer(function(req, res){
    var parseObj = url.parse(req.url, true);
    var pathName = parseObj.pathname;
    if(pathName === '/'){
        fs.readFile('./views/index.html', function(err, data){
            if(err){
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    }else if(pathName === '/post'){
        fs.readFile('./views/post.html', function(err, data){
            if(err){
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    }else if(pathName === '/comments'){
        var comment = parseObj.query;
        comment.dateTime = '2018-10-10 10:10:10';
        comments.unshift(comment);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }else if(pathName.indexOf('/public/') === 0){
        fs.readFile('.' + pathName, function(err, data){
            if(err){
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    }else{
        fs.readFile('./views/404.html', function(err, data){
            if(err){
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    }
}).listen(3000, function(){
    console.log('Server is running...');
});