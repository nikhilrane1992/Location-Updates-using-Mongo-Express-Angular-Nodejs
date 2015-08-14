var locationUpdate = angular.module('locationUpdate', [])

locationUpdate.controller('locationUpdateCtrl', function($scope,$http,$log){
	$http.defaults.headers.post["Content-Type"] = "application/json";
	// $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencsoded";
	$scope.locationResult = null;
	$scope.imei_no = '';
	$scope.getData = function(){
		$http.post('http://localhost:3000/get/latlng', {imei_no:$scope.imei_no}).success(function(result){
			$scope.locationResult = result;
		});
	}

	$scope.imei_no = '';
	$scope.lat = '';
	$scope.lng = '';
	$scope.app_time_stamp = '1439570314721';
	$scope.server_time_stamp = '1439570314721';
	$scope.errormsg = '';

	$scope.saveData = function(){
		$log.log('save data function');
		if ($scope.imei_no==''|$scope.lat == ''|$scope.lng == ''){
			$scope.errormsg = 'Blank value not accepted...';
		}else{
			$http.post('http://localhost:3000/save/location_update/data', {imei_no:$scope.imei_no, lat:$scope.lat,
				lng:$scope.lng, app_time_stamp:$scope.app_time_stamp, server_time_stamp:$scope.server_time_stamp}).
		        success(function(data, status, headers, config) {
		            console.log(data);
		            $scope.errormsg = data.validation;
		        }).
		        error(function(data, status, headers, config) {
		            console.log(data);
		        });
		}
	}
});