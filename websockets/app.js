/**
 * Created by Mak on 4/14/17.
 */
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 8080;

app.use(express.static(path.join(__dirname,"public")));

var score ={};
var runs =[1,4,3,5,6,2];
var commentDict =["Good Shot!!","Missed to Field","Classic Text Book Shot","Hat trick", "Classical Shot", "Unbelievable miss","Very good catch by mid-on player"];

io.on('connection',function(socket){

    console.log('connected socket');

    socket.on('tuneIn',function () {

     console.log("a new user tune IN");

    });
    socket.on('disconnect',function () {

        console.log("disconnected "+ socket.id );
    });

    setInterval(function () {
        socket.emit('matchScore',score);
    },2000);

});

showScore();
function showScore()
{
var currentScore = 0;
setInterval(function () {
    var index=Math.ceil(Math.random()*6)-1;
    currentScore +=runs[index];
    console.log("CURRENt SCORE==>",runs[index]);
    score.currentScore=currentScore;
    if(runs[index]== 4 ||  runs[index]== 6)
    {
        score.comment= commentDict[Math.ceil(Math.random()*commentDict.length)-1];
    }else
    {
        score.comment="";
    }

},2000);



}



server.listen(port,function () {
    console.log("Listening on port "+port);
});

