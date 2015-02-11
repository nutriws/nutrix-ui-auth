var app = angular.module('nutrixUiAuthDemo', ['nutrixUiAuth']);

app.controller('nutrixUiAuthDemo', ['$scope', function($scope) {
    $scope.invoice = {
        items: [{
            qty: 10,
            description: 'item',
            cost: 9.95}]
    };

}]);