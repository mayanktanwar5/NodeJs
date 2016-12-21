function calc(req,res)
{

var operation = req.body.opr;
var num1 = Number(req.body.num1);
var num2 = Number(req.body.num2);
var result=0;

switch(operation)
{

case "multiply":
try{
result=num1*num2;
res.json({"res":result});
}
catch(e)
{
res.json({"res":e});
}

break;

case "divide":
try{
result=num1/num2;
res.json({"res":result});
}
catch(e)
{

res.json({"res":e});
}
break;

case "add":
result=num1+num2;
res.json({"res":result});
break;

case "subtract":
result=num1-num2;
res.json({"res":result});
break;
}

}

exports.calc=calc;