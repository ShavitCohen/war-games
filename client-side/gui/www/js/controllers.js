angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope,$stateParams) {
  $scope.playlists = [
    { title: 'Shavit Cohen', part:"", id: 0 },
    { title: 'Ran Mochary', id: 1 },
    { title: 'Ram-on Agmon', id: 2 },
    { title: 'Roy Reshef', id: 3 },
      { title: 'Shaul Naim', id: 4 },
  ];




})

.controller('PlaylistCtrl', function($scope, $stateParams,$http) {

        var jobs = [
            "UI Engineer",
            "Attack Engineer",
            "Defence Engineer",
            "Elastic Search Engineer",
            "UI Engineer"
        ];

        $scope.job = jobs[$stateParams.playlistId]

        $scope.checkingNum = 500;
        var map = new OpenLayers.Map("mapdiv");
        map.addLayer(new OpenLayers.Layer.OSM());
        var markers = new OpenLayers.Layer.Markers( "Markers" );
        var arr = [];
        var zoom = 3;


        /*var lonLat = new OpenLayers.LonLat( -0.1279688 ,51.5077286 )
            .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
        );

        markers.addMarker(new OpenLayers.Marker(lonLat));
        map.setCenter(lonLat, zoom);*/
        $scope.showCheckins = function(){

            $http({
                url: 'http://localhost:3000/getCheckins?aaa=' + document.getElementById("aaa").innerHTML,
                method: "POST"
            }).success(function(data, status, headers, config) {
                    setMarkers(data);
                }).
                error(function(data, status, headers, config) {
                    alert("error to elastic search");
                });

            /*$http.get('http://localhost:3000/getCheckins',{data:$scope.checkingNum}).
                success(function(data, status, headers, config) {
                    setMarkers(data);
                }).
                error(function(data, status, headers, config) {
                    alert("error to elastic search");
                });*/


            map.addLayer(markers);

            $scope.clearMarkers = function(){
                for(var i=0; i<arr.length; i++){
                    markers.removeMarker(arr[i])
                }
            }
            function setMarkers(data){
                for(var i=0;i<data.data.length; i++){
                    var checkin = data.data[i];
                    var lonLat = new OpenLayers.LonLat( checkin._source.longitude ,checkin._source.latitude )
                        .transform(
                        new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                        map.getProjectionObject() // to Spherical Mercator Projection
                    );

                    var marker = new OpenLayers.Marker(lonLat);
                    markers.addMarker(marker);
                    arr.push(marker);
                    map.setCenter(lonLat, zoom);
                }
            }
        }


});
