angular.module('app').controller('custDetailsCtrl', function ($scope, $stateParams, customerSrvc, $http, $state) {
  
  
     
       $scope.getCustomersDetails = function(id) {
         if (id === '' || typeof id === 'undefined') {
          $scope.customersDetails = {}

         } else {
       
           customerSrvc.getCustomerDetail(id).then (function(response) {
            $scope.customersDetails = response.data[0];
            // console.log(response.data[0])
            // console.log(typeof id)
            $scope.address = response.data[0]["main_location[street_address]"];
            $scope.city = response.data[0]["main_location[town]"];
            $scope.state = response.data[0]["main_location[county_province_state]"];
            $scope.zip = response.data[0]["main_location[postcode]"];
            $scope.phone = response.data[0]["main_location[telephone]"];
                      
          })
        }
      }

      $scope.getCustomersDetails($stateParams.id)

    
      console.log($scope.custForApi)

      $scope.save = function(id) {
              

        $scope.custForApi = {
          id: $scope.customersDetails.id,
          lock_version: $scope.customersDetails.lock_version,
          name: $scope.customersDetails.name,
          address: $scope.address,
          city: $scope.city,
          state: $scope.state,
          zip: $scope.zip,
          phone: $scope.phone
      }
      console.log($scope.custForApi)


      if(typeof id === 'undefined') {  //Will be undefined if there was not an existing customer to edit
        customerSrvc.addNewCustomer($scope.customersDetails.name).then (function(response) {
          $scope.newCustomer = response;
          console.log(response)
          console.log(response.data.data.id)
          $scope.getCustomersDetails(response.data.data.id)
        })



        } else {
          console.log("Update Existing Customer")
          console.log($scope.custForApi)
          // customerSrvc.updateCustomer(id, $scope.customersDetails.lock_version, $scope.customersDetails.name, $scope.address).then (function(response) {
          customerSrvc.updateCustomer($scope.custForApi).then (function(response) {
          $scope.customerUpdated = response;
          console.log(response)
          $scope.getCustomersDetails(response.id)
      
          })
        }

        

     }

     
      
  })


  
      //  $scope.updateCustomer = function(id, lock_version, name) {
      //   customerSrvc.updateCustomer(id, lock_version, name).then (function(response) {
      //     $scope.customerUpdated = response;
      //     console.log(response)
      //     $scope.getCustomersDetails(response.id)
    
      //   })
      // }






      // $scope.addNewCustomer = function(name) {
      //   customerSrvc.addNewCustomer(name).then (function(response) {
      //     $scope.newCustomer = response;
      //     console.log(response)
      //     console.log(response.data.data.id)
      //     $scope.getCustomersDetails(response.data.data.id)
      //   })
      // }
       