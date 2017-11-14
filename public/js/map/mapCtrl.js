angular.module('app').controller('mapCtrl', function($scope, $stateParams, customerSrvc, $http, $state){
       
    customerSrvc.getAllCustomers().then (function(response) {
      $scope.cityState = response.data;
    }).then (function() {

        // After the response is back with the API data, create the map"
        console.log($scope.cityState)
        var citySt = $scope.cityState;

        // var cityMap = []
        var cities = []
        
        for (i=0; i<citySt.length; i++) {          
          cities.push({
            id: citySt[i].id,
            city: citySt[i]["main_location[town]"] + ", " + citySt[i]["main_location[county_province_state]"]
          })
        
        }

        var map = new google.maps.Map(document.getElementById('map_div'), {center: {lat: 32.8, lng: -96.8},  zoom: 9});  
        
        var i = 0;  //used a a counter for the url below

        for (var x = 0; x < cities.length; x++) {

          $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+cities[x].city+'&sensor=false', null, function (data) {

              var p = data.results[0].geometry.location
              var latlng = new google.maps.LatLng(p.lat, p.lng);
              
              marker = new google.maps.Marker({
                  position: latlng,
                  map: map,
                  url: '#/customer/detail/' + cities[i].id
                });

                i++;


                
              google.maps.event.addListener(marker, 'click', function() {
                window.location.href = this.url;
              });



              });
            }


      })


})
    