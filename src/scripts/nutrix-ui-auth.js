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
