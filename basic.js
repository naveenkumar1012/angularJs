function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
index_app.controller('basic_controller', ['$scope' ,function ($scope) {
  $scope.init = function() {
      $scope.add_row = true;
      $scope.table = true;
      $scope.error = true;
    };
  $scope.init();
  $scope.people=[ ];
  var edit_index=-1;
  $scope.add_record = function(){
      $scope.add_row=false;
      $scope.error = true;
      $scope.user_name='';
      $scope.email='';
      edit_index=-1;
  };
  $scope.addPerson = function(){
    var valid_email=validateEmail($scope.email);
    if($scope.user_name!='' && valid_email){
      $scope.add_row = true;
      $scope.table = false;
      $scope.error = true;
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
    }
    else{
      $scope.error = false;
      if($scope.user_name=='')
        document.getElementById("error_message").innerHTML = "User Name is required !!!";
      else
        document.getElementById("error_message").innerHTML = "Enter a valid email !!!";
    }
  };
  $scope.remove=function(index){
    edit_index=-1;
    $scope.add_row=true;
    $scope.error = true;
    $scope.people.splice(index,1);
    if($scope.people.length==0)
      $scope.table=true;
  };
  $scope.edit=function(index){
    $scope.add_row=false;
    $scope.error = true;
    $scope.user_name = $scope.people[index].name;
    $scope.email = $scope.people[index].email;
    edit_index=index;
  };
}]);
