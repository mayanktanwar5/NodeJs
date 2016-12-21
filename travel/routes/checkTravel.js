function destination(req, res)
{

var des = req.body.destination;
var source =req.body.source;

if(des==source)
{

	res.json({"msg":"match"});
	res.end();
}
else
{

	res.json({"msg":"nomatch",
				"des":des,
				"source":source
				});
	res.end();
}

}

exports.destination=destination;