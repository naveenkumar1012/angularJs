var advance_cntrl = angular.module('advance', []);
var basic_cntrl = angular.module('basic', []);

advance_cntrl.controller('advance_controller', ['$scope', '$http',
  function ($scope, $http) {
    $http.get("http://jsonplaceholder.typicode.com/posts/").success(function(response) {$scope.records = response;});
  	$scope.fetch=function(){
  		var m = $scope.records.length, t, i;
  		if($scope.fetch_number>1 &&$scope.fetch_number <= m){
  			$scope.error=true;
	  		$scope.random_records=$scope.records.slice();
			while (m) {
			    i = Math.floor(Math.random() * m--);
			    t = $scope.random_records[m];
			    $scope.random_records[m] = $scope.random_records[i];
			    $scope.random_records[i] = t;
			}
			$scope.random_records.length=$scope.fetch_number;
			$scope.table=false;
			//alert($scope.records.length);
		}
		else{
			$scope.table=true;
			$scope.error=false;
		}
     };
  }]);

basic_cntrl.controller('basic_controller', ['$scope' ,function ($scope) {
	$scope.people=[ ];
    $scope.user_name = 'Your Name';
    $scope.email = 'example@example.com';
    var edit_index=-1;
    $scope.addPerson = function(){
    	if(edit_index==-1){
		    var person = {
		        name: $scope.user_name,
		        email: $scope.email
		    };
		  	$scope.people.push(person);
	  	}
	  	else{
	  		$scope.people[edit_index].name=$scope.user_name;
	  		$scope.people[edit_index].email=$scope.email;
	  		edit_index=-1;
	  	}
	 	$scope.user_name = 'Your Name';
    	$scope.email = 'example@example.com';
	};
	$scope.remove=function(index){
		$scope.people.splice(index,1);
		if($scope.people.length==0)
			$scope.table=true;
     };
     $scope.edit=function(index){
     	$scope.user_name = $scope.people[index].name;
    	$scope.email = $scope.people[index].email;
    	$scope.add_row = !$scope.add_row;
    	edit_index=index;
     };
}]);

var index_app = angular.module('angular', [
  'ngRoute',
  'index_controller'
]);

index_app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/basic', {
        templateUrl: 'basic.html',
        controller: 'basic_controller'
      }).
      when('/advance', {
        templateUrl: 'advance.html',
        controller: 'advance_controller'
      }).
      otherwise({
        redirectTo: '/index.html'
      });
  }]);
