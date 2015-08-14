var chat = angular.module('chat', [])

chat.controller('chatCtrl', function($scope,$http,$log){
	$http.defaults.headers.post["Content-Type"] = "application/json";
	// $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencsoded";
	$scope.chatResult = null;
	$http.get('http://localhost:3000/chat').success(function(result){
		$scope.chatResult = result;
	});

	$scope.message = '';
	$scope.username = '';

	$scope.saveData = function(){
		$log.log('save data function');
		$http.post('http://localhost:3000/save/chat/data', {message:$scope.message, username:$scope.username}).
	        success(function(data, status, headers, config) {
	            console.log(data);
	        }).
	        error(function(data, status, headers, config) {
	            console.log(data);
	        });
	}
});