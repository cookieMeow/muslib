'use strict';

var musicCatApp = angular.module('musicCatApp', []).config(function($interpolateProvider){           
 $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

musicCatApp.controller('MusicListController', function MusicListController($scope, $http) {
    angular.element(document).ready(function () {
        $(".domain_search_button").click();
    });

    $scope.input = [];
    $scope.filter = [];

    $scope.myFunc = function() {
        console.log('1')
        if ($(".domain_search_input").val() !== "") {
            $scope.input = $(".domain_search_input").val().split(' ');
        }
        
        var data = {"keywords":$scope.input, "filters":$scope.filter};
        console.log(data)
        $http({
            url: '../SearchResult/',
            method: "POST",
            data: data
        }).then(function successCallback(response) {
            $scope.filter = [];
            console.log(response.data)
            $scope.rawdata = response.data.rawdata
            $scope.artist = response.data.artist
            $scope.album = response.data.album
            $scope.genre = response.data.genre
        }, function errorCallback(response) {
            $scope.error = "error";
        });

    };

    $scope.change = function(name) {
        console.log(name)
        var idx = $scope.filter.indexOf(name);
        console.log(idx)

        if (idx > -1) {
           $scope.filter.splice(idx, 1);
        }

        // Is newly selected
        else {

                 $scope.filter.push(name); 
        }

        var flatted = [];
        for (var n of $scope.filter) {
            var list = n.split(' ');
            for (var m of list) {
                flatted.push(m)
            }
            
        }
        console.log($scope.filter)
        console.log(flatted)

        var data = {"keywords":$scope.input, "filters":flatted};
        console.log(data)
        $http({
            url: '../SearchResult/',
            method: "POST",
            data: data
        }).then(function successCallback(response) {
            console.log(response.data)
            $scope.rawdata = response.data.rawdata

        }, function errorCallback(response) {

            $scope.error = "error";
        });
    };
});
