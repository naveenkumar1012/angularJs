// index_app.factory('get_array', function($http) { 
//     var obj;
//     $http.get("http://jsonplaceholder.typicode.com/posts/").success(function(data) {
//         obj = data;
//     });    
//     return obj;    
// });

index_app.controller('advance_controller', ['$scope', '$http',
  function ($scope, $http) {
    $http.get("http://jsonplaceholder.typicode.com/posts/")
    .success(function(response) {
      $scope.records = response;
    });
    $scope.checkbox_array={};
    $scope.init = function() {
      $scope.table = true;
      $scope.error = true;
    };
    $scope.init();
    $scope.fetch=function(){
      var m = $scope.records.length, t, i;
      if($scope.fetch_number>0 &&$scope.fetch_number <= m){
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
        
        for(var obj in $scope.random_records)
          $scope.checkbox_array[$scope.random_records[obj]['userId']]=true;
      }
      else{
        $scope.table=true;
        $scope.error=false;
      }
    };
    $scope.filter_user_checkbox = function(userid) {

    };

}]).filter('groupBy', ['$parse', 'pmkr.filterStabilize', function ($parse, filterStabilize) {    
    function groupBy(input, prop) {      
      if (!input) { return; }      
      var grouped = {};      
      input.forEach(function(item) {
        var key = $parse(prop)(item);
        grouped[key] = grouped[key] || [];
        grouped[key].push(item);
      });      
      return grouped;      
    }    
    return filterStabilize(groupBy);    
 }]).factory('pmkr.filterStabilize', [
  'pmkr.memoize',
  function(memoize) {
    function service(fn) {
      function filter() {
        var args = [].slice.call(arguments);
        args = angular.copy(args);
        var filtered = fn.apply(this, args) || args[0];
        return filtered;
      }
      var memoized = memoize(filter);
      return memoized;
    }
    return service;
  }
]).factory('pmkr.memoize', [
  function() {
    function service() {
      return memoizeFactory.apply(this, arguments);
    }
    function memoizeFactory(fn) {
      var cache = {};
      function memoized() {
        var args = [].slice.call(arguments);
        var key = JSON.stringify(args);
        if (cache.hasOwnProperty(key)) {
          return cache[key];
        }
        cache[key] = fn.apply(this, arguments);
        return cache[key];
      }
      return memoized;
    }
    return service;
  }
]);
