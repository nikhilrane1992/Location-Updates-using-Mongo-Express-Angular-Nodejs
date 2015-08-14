var locationUpdate = angular.module('locationUpdate', [])

locationUpdate.controller('locationUpdateCtrl', function($scope,$http,$log){
	$http.defaults.headers.post["Content-Type"] = "application/json";
	// $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencsoded";
	$scope.locationResult = null;
	$http.get('http://localhost:3000//get/latlng').success(function(result){
		$scope.locationResult = result;
	});

	$scope._id = '';
	$scope.lat = '';
	$scope.lng = '';
	$scope.app_time_stamp = '1439570314721';
	$scope.server_time_stamp = '1439570314721';

	$scope.saveData = function(){
		$log.log('save data function');
		$http.post('http://localhost:3000/save/location_update/data', {_id:$scope._id, lat:$scope.lat,
			lng:$scope.lng, app_time_stamp:$scope.app_time_stamp, server_time_stamp:$scope.server_time_stamp}).
	        success(function(data, status, headers, config) {
	            console.log(data);
	        }).
	        error(function(data, status, headers, config) {
	            console.log(data);
	        });
	}
});