(function () {
    "use strict";

    var nutrix = angular.module('nutrixUiAuth', []);

    nutrix.directive('nutrixUiAuthLogin', ['$timeout', function($timeout) {
    	
    	return {
	        restrict: 'E',
	        scope: { records: '=' },
	        templateUrl: 'tmpl/nutrix-ui-auth-login.html',
	        replace: true,
	        link: function($scope, element, attrs) {
	        	
	        }
	    }

    }]);

    nutrix.directive('nutrixUiAuth', ['$timeout', function($timeout) {
    	
    	return {
	        restrict: 'E',
	        scope: { records: '=' },
	        templateUrl: 'tmpl/nutrix-ui-auth.html',
	        replace: true,
	        link: function($scope, element, attrs) {
	        	$scope.addItem = function() {
			        $scope.records.items.push({
			            qty: 1,
			            description: '',
			            cost: 0
			        });
			    },

			    $scope.removeItem = function(index) {
			        $scope.records.items.splice(index, 1);
			    },

			    $scope.total = function() {
			        var total = 0;
			        angular.forEach($scope.records.items, function(item) {
			            total += item.qty * item.cost;
			        })

			        return total;
			    }
	        }
	    }

    }]);
}());

angular.module('nutrixUiAuth').run(['$templateCache', function ($templateCache) {
	$templateCache.put('tmpl/nutrix-ui-auth-login.html', '<div class="nutrix-ui-auth"> <div class="login-form"> </div> blah blah </div>');
	$templateCache.put('tmpl/nutrix-ui-auth.html', '<div> <table class="table"> <tr> <th>Description</th> <th>Qty</th> <th>Cost</th> <th>Total (Number)</th> <th></th> </tr> <tr ng:repeat="item in records.items"> <td><input type="text" ng:model="item.description"class="input-small"></td> <td><input type="number" ng:model="item.qty" ng:required class="input-mini"></td> <td><input type="number" ng:model="item.cost" ng:required class="input-mini"></td> <td>{{item.qty * item.cost | currency}}</td> <td> [<a href ng:click="removeItem($index)">X</a>] </td> </tr> <tr> <td><a href ng:click="addItem()" class="btn btn-small">add item</a></td> <td></td> <td>Total:</td> <td>{{total() | currency}}</td> </tr> </table> </div>');
}]);