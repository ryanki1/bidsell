/**
 * Created by ryanki10 on 12/09/15.
 */

class DemoCtrl {
  constructor($scope) {
    $scope.chk = {};
    $scope.items = [1, 2, 3, 4, 5];
    $scope.selected = [];
    $scope.toggle = function(item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) list.splice(idx, 1);
      else list.push(item);
      chk[item] = !chk[item];
    };
    $scope.exists = function(item, list) {
      return list.indexOf(item) > -1;
    };
  }
}

DemoCtrl.$inject = ['$scope'];
export default DemoCtrl;