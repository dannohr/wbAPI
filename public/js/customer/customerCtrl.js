angular
  .module("app")
  .controller("customerCtrl", function($scope, $stateParams, customerSrvc) {
    $scope.customertest = "Test message from customer service";
    $scope.custsearch = "";

    $scope.customers = [];
    $scope.customerDetail = [];

    //load when page opens
    $scope.getName = customerSrvc.getAllCustomers().then(function(response) {
      $scope.customers = response.data;
      console.log($scope.customers);
      return $scope.customers;
    });
    console.log($scope.customers);

    //runs when button clicked
    $scope.getAllCustomers = function() {
      $scope.custsearch = ""; //clear customer filter input on webpage
      customerSrvc.getAllCustomers().then(function(response) {
        $scope.customers = response.data;
        console.log($scope.customers);
      });
    };

    $scope.getCustomers = function(custsearch) {
      customerSrvc.getCustomers(custsearch).then(function(response) {
        $scope.customers = response.data;
        console.log($scope.customers);
      });
    };

    $scope.deleteCustomer = function(id, lock_version) {
      customerSrvc.deleteCustomer(id, lock_version).then(function(response) {
        //$scope.customers = response.data;
        // console.log($scope.customers)
      });
    };

    console.log(customerSrvc.allCustomers);

    $scope.modalShown = false;

    $scope.toggleModal = function() {
      $scope.modalShown = !$scope.modalShown;
      console.log("Modal: " + $scope.modalShown);
    };
  });
