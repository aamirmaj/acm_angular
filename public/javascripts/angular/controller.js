(function () {
  var app = angular.module('acmAngularApp');

  app.controller('Controller', ['$scope', function($scope) {
    var app = this;
    var scope = $scope;
    var Fruit = Parse.Object.extend('fruit');
    app.fruits = [];

    app.addFruit = function(name, color) {
      var fruit = new Fruit({
        name: name,
        color: color
      });

      fruit.save().then(
        function(fruit) {
          app.fruits.push(fruit);
          scope.$digest();

          document.getElementById("addFruitForm").reset();
        },
        function(error) {
          console.log(error);
        }
      )
    }

    function getFruit() {
      var query = new Parse.Query(Fruit);

      query.find().then(
        function(fruits) {
          app.fruits = fruits;
          scope.$digest();
        },
        function(error) {
          console.log(error);
        }
      )
    }

    getFruit();
  }]);
})();
