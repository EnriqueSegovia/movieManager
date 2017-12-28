(function () {
    'use strict';

    angular
        .module('filmsApp')
        .factory('pelisFactory', pelisFactory);

    pelisFactory.$inject = ['$http'];

    function pelisFactory($http) {
        var service = {
            damePelis: damePelis,
            searchPelis: searchPelis,
            searchGens: searchGens,
            giveGens: giveGens,
            moviesDetails: moviesDetails,
            getFilteredGens: getFilteredGens
        };

        return service;

        ////////////////
        function damePelis(change) {
            return $http.get('https://api.themoviedb.org/3/movie/' + change + '?api_key=dd9cd52d4841f57b58ef02e6850e2e02&language=en-US&page=1')
                .then(function (response) {
                    var pelis = response.data;
                   // console.log(pelis);
                    return pelis
                }, function (error) {
                    console.log("Hubo algun error");
                });
        }

        function searchPelis(busca) {
            return $http.get('https://api.themoviedb.org/3/search/movie?api_key=dd9cd52d4841f57b58ef02e6850e2e02&query=' + busca + '&language=en-US&page=1&include_adult=false')
                .then(function (response) {
                    var pelis = response.data;
                   // console.log(pelis);
                    return pelis
                }, function (error) {
                    console.log("Hubo algun error");
                });
        }

        function searchGens() {
            return $http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=dd9cd52d4841f57b58ef02e6850e2e02&language=en-US')
                .then(function (response) {
                    var gens = response.data.genres;
                   // console.log(gens);
                    return gens
                }, function (error) {
                    console.log("Hubo algun error");
                });
        }

        function giveGens(genreId) {
            return $http.get('https://api.themoviedb.org/3/genre/'+ genreId +'/movies?api_key=dd9cd52d4841f57b58ef02e6850e2e02&language=en-US&include_adult=false&sort_by=created_at.asc')
                .then(function (response) {
                    var gen = response.data;
                    return gen
                }, function (error) {
                    console.log("Hubo algun error");
                });
        }


        function moviesDetails(movies_id){
            return $http.get('https://api.themoviedb.org/3/movie/'+ movies_id +'?api_key=dd9cd52d4841f57b58ef02e6850e2e02&language=en-US&append_to_response=videos')
            .then(function (response) {
                var movie = response.data;
                return movie;
            }, function (error) {
                console.log("Hubo algun error");
            });
        }



        function getFilteredGens(filter) {
            return $http.get('https://api.themoviedb.org/3/discover/movie?api_key=dd9cd52d4841f57b58ef02e6850e2e02&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + filter.join("%2C"))
            .then(function (response) {
                var filter_Genres = response.data;
                return filter_Genres;
                console.log(filter_Genres)
            }, function (error) {
                console.log("Hubo algun error");
            });
        }
       

        
        
    }
})();
