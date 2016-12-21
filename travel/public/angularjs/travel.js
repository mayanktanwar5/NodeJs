var myApp = angular.module("myApp",[]);

console.log("insisde travel app ==>");

var count=0;

myApp.controller('travelController',['$scope','$http', function($scope,$http)

{
	

	console.log("insisde travel controller");
	console.log($scope.travel);


	//console.log("ye before  wala hai"+allItems);
	 $scope.allItems =[];

	$scope.bookTravel = function()
	{

		// console.log($scope.travel.source);
		// console.log($scope.travel.destination);

		if($scope.travel.source==null || $scope.travel.destination==null)
		{

			$scope.selecterror=1
		}

		else
		{

			$scope.selecterror=0;
			$http.post('/travel', $scope.travel).success(function(res){


			if(res.msg=="match")

			{

				console.log("its a match at client side ");
				$scope.error=1;
			}

			else if(res.msg=="nomatch")
			{
				$scope.error=0;
				console.log("destination and source are different");
				$scope.allItems.push({"src":res.source,"des":res.des});
				count+=1;
				console.log($scope.allItems);


			}

		})

		}
		
	}

}



	]);

console.log("Ye count hai bhai"+count);
console.log("ye bilkul abhara  wala hai"+allItems);