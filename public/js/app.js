var myApp = angular.module('colorizr', ['ngResource','ngAnimate', 'ngTouch','ui.bootstrap', 'colorpicker.module']);

myApp.factory('colorSrv', ['$resource', function($resource) {
    return $resource('http://localhost:8080/colors/:color');
}]);


myApp.controller('colorizrCtrl', function ($scope, colorSrv) {
    $scope.color = "#009688";
    $scope.colors = [];
    $scope.$watch('color', function () {
        if($scope.color.length == 7){
            colorSrv.get({
                color : $scope.color.replace("#", "")
            }).$promise.then(function (res) {
                $scope.colors = [];
                angular.forEach(res, function (value, key) {
                    if(key != "$promise" && key != "$resolved"){
                        $scope.colors.push(colorcolor("hsla("+Math.round(value.h)+","+ Math.round(value.s)+"%,"+Math.round(value.l)+"%,1)", 'hex'));
                    }
                });
                console.log($scope.colors)
            });

        }

    });


});