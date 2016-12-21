var myApp = angular.module("myApp",[]);

var oprSet =false;

myApp.controller("calcController",['$scope','$http',function($scope,$http){


	$scope.message="";
	var number1;
	var number2;
	var operations="" ;
	var oprSet=false;
	var error= false;
	var resultValue="";
	var resultOperations="";
	var clicked=0;
	var resultClick=0;
	var number2Inresult=0;


	$scope.number= function(num){

		

		if(oprSet)

		{
			oprSet=false;
			$scope.message=	"";
			clicked=0;
			resultClick=0;
			// console.log("inside number =====>"+operations)

			// console.log("all set true and resultValue"+resultValue);
			 console.log("new before typing "+resultOperations+"number 1 ===>"+number1+"number 2  "+number2);
			
		}

		//if(resultOperations!=null)
		//{

			//	$scope.message+=num;
		//}
		// else if(resultOperations!=""){

		// 	$scope.message="";
		// }

		if(error)
		{

			error=false;
			$scope.message="";
		}
		
		
			$scope.message+=num;
			console.log("length  "+($scope.message).length);

			 console.log("after typing "+resultOperations+"number 1 ===>"+number1+"number 2  "+number2);

			messageLength();
		
		
	}

	 function messageLength()

	 {

	 	if(($scope.message).length>12)

		{
			document.querySelector("#msg").className="message-long";

		}
		else
		{
			document.querySelector("#msg").className="message-short";

		}

	 }


	$scope.operation=function(opr){

		 if($scope.message!="")
		 {
		 	oprSet=true;
		 console.log("operations value ====>"+operations);
		 
		 console.log("clicked count ====="+clicked);

		 if(clicked==0)
		 {

		 	clicked+=1;
		 	if(operations!="")
		  {
		  	//number1=resultValue;
		  	getResult();
		 	 resultOperations= opr;
		  	 console.log("new operand "+resultOperations+"number 1 ===>"+number1+"number 2"+number2);
		 	 operations=resultOperations;


		  }
		 else
		  {
			 
			 if(resultValue!="")
		{
			number1=resultValue;

		}
		else
		{
		number1=$scope.message;	
		}
			 operations= opr;
			 resultOperations=opr;
			
		 }


		 }
		 else if(clicked>0)
		 {
		 	$scope.message="Malfunction two operations";
			error=true;
			document.querySelector("#msg").className="message-long-error";
			operations="";
			resultValue="";
			number1="";
			number2="";

		 }

	}

	}

	$scope.result=function()
	{

		
		operations="";
		//resultValue="";
		
		console.log("inside result ==>"+resultClick);

		if(resultClick==0)
		{
			 number2Inresult=$scope.message;
			getResult();
			resultClick+=1;
			


		}
		else if(resultClick>0)
		{
			number2=number2Inresult;
			console.log("   result cikc more  "+number2);
			getResult();

		}	

	}

	function getResult()
	{
		if(resultValue!="")
		{
			number1=resultValue;

		}
		if (resultClick<=0)
		{
			number2=$scope.message;

		}


			
			console.log("number1 "+number1+"number 2 ====>"+number2 +"operation====>"+resultOperations);
			var res ={"num1":number1,"num2":number2,"opr":resultOperations};
			if(Number(number2)==0 && Number(number1)>0)
			{

				$scope.message="Infinity/Cant divide with zero";
				error=true;
				document.querySelector("#msg").className="message-long-error";
			}
			else if(Number(number2)==0 && Number(number1)==0)
			{
				$scope.message="NaN num/den can't be  zero ";
				error=true;
				document.querySelector("#msg").className="message-long-error";
			}
			else
			{
				$http.post('/calc',res).success(function(response)

			{
				
				var len=JSON.stringify(response.res);
				if(len.length>12)
				{

					//console.log("length of   ====="+(response.res).length);
					document.querySelector("#msg").className="message-long-error";
					$scope.message=response.res;

				}	
				else
				{
					resultValue=response.res;
					$scope.message=response.res;
					
					number2="";
				}
				
				

			})
			}
			
	}

	$scope.clear= function()

	{
		$scope.message="";	
		number1="";
		number2="";
		operations="";
		resultValue="";
	}
}])